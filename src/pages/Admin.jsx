import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "../lib/supabase";

const Admin = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin_auth") === "true";
  });
  const [manualInput, setManualInput] = useState("");
  const [error, setError] = useState(null);
  const [scanerror, setScanError] = useState(null);
  const [scannedOrder, setScannedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ticketStatus, setTicketStatus] = useState(null); // 'valid' or 'used'
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDay, setFilterDay] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const isScanning = useRef(false);

  const stats = useMemo(() => {
    const paidOrders = orders.filter((o) => o.payment_status === "paid");
    const totalRevenue = paidOrders.reduce((acc, o) => acc + (o.packages?.price || 0), 0);
    const scannedCount = orders.filter(o => o.scanned).length; // This assumes a 'scanned' flag, we might need to fetch this from ticket_scans

    return {
      total: orders.length,
      paid: paidOrders.length,
      revenue: totalRevenue / 100,
      pending: orders.length - paidOrders.length
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus = filterStatus === "all" || order.payment_status === filterStatus;
      const matchDay = filterDay === "all" || order.pickup_day === parseInt(filterDay);
      const matchSearch = 
        order.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.ticket_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.matric_number.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchStatus && matchDay && matchSearch;
    });
  }, [orders, filterStatus, filterDay, searchQuery]);

  const exportCSV = () => {
    const headers = [
      "Name",
      "Matric Number",
      "Package",
      "Pickup Day",
      "Ticket Code",
      "Status",
      "Phone",
    ];
    const rows = orders.map((order) => [
      `"${order.student_name}"`,
      `"${order.matric_number}"`,
      `"${order.packages?.name || ""}"`,
      `"Day ${order.pickup_day}"`,
      `"${order.ticket_code}"`,
      `"${order.payment_status}"`,
      `"${order.phone_number}"`,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `maxies-kitchen-orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const lookupTicket = useCallback(async (ticketCode) => {
    setScanError(null);
    setScannedOrder(null);
    const { data, error } = await supabase
      .from("orders")
      .select("*, packages(name, description, price)")
      .eq("ticket_code", ticketCode.trim())
      .single();

    if (error) {
      setScanError("Ticket not found");
      playBeep(false);
      return;
    }

    const { data: scanData } = await supabase
      .from("ticket_scans")
      .select("*")
      .eq("order_id", data.id);

    if (scanData && scanData.length > 0) {
      setScanError("Ticket already scanned");
      setTicketStatus("used");
      playBeep(false);
      setScannedOrder(data);
      return;
    }

    if (data.payment_status !== 'paid') {
        setScanError("Payment not confirmed for this ticket");
        setTicketStatus("invalid");
        playBeep(false);
        setScannedOrder(data);
        return;
    }

    await supabase.from("ticket_scans").insert({
      order_id: data.id,
      scanned_by: "admin",
    });
    
    setTicketStatus("valid");
    playBeep(true);
    setScannedOrder(data);
    
    // Refresh orders to show updated status if we had a scanned flag
    fetchData();
  }, []);

  const playBeep = (success) => {
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.frequency.value = success ? 1000 : 400; 
        gain.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(context.currentTime + 0.2);
    } catch (e) {
        console.error("Audio error", e);
    }
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, packages(name, description, price)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setOrders(data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
      rememberLastUsedCamera: true,
      supportedScanTypes: [0],
    });

    scanner.render(
      (decodedText) => {
        if (isScanning.current) return;
        isScanning.current = true;
        lookupTicket(decodedText);
        setTimeout(() => {
          isScanning.current = false;
        }, 3000); 
      },
      (error) => {}
    );
    return () => {
      scanner.clear().catch(e => console.error(e));
    };
  }, [isAuthenticated, lookupTicket]);

  const handlLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(null);
    try {
      const response = await fetch("/api/admin-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: inputValue }),
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_auth", "true");
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
        <form
          onSubmit={handlLogin}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4 shadow-2xl"
        >
          <div className="text-center mb-2">
            <h1 className="text-white text-2xl font-bold">Admin Login</h1>
            <p className="text-gray-500 text-sm">Maxie's Kitchen Dashboard</p>
          </div>
          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="password"
            placeholder="Password"
            disabled={isLoggingIn}
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoggingIn}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {isLoggingIn ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-[#0f0f0f]/80 backdrop-blur-md z-30">
        <div>
          <h1 className="text-orange-500 font-bold text-xl">
            Maxie's Kitchen Admin
          </h1>
          <p className="text-gray-400 text-sm">Real-time Order Management</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
          >
            Export CSV
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-900/20 hover:bg-red-900/40 border border-red-800 text-red-400 text-sm font-medium px-4 py-2.5 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1600px] mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total, color: "text-white" },
            { label: "Paid Orders", value: stats.paid, color: "text-green-400" },
            { label: "Pending", value: stats.pending, color: "text-yellow-400" },
            { label: "Total Revenue", value: `₦${stats.revenue.toLocaleString()}`, color: "text-orange-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-sm">
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column — Scanner & Active Lookup */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-orange-500 text-xs font-bold tracking-widest uppercase">QR SCANNER</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Active</span>
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden aspect-square relative">
                <div id="reader" className="w-full h-full"></div>
                {/* Visual scanner guide */}
                <div className="absolute inset-0 border-2 border-orange-500/20 pointer-events-none m-12 rounded-xl"></div>
              </div>
            </div>

            {/* Scanned result card */}
            {scannedOrder ? (
              <div className={`border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${
                ticketStatus === "valid" ? "bg-green-900/10 border-green-500/50" : "bg-red-900/10 border-red-500/50"
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                    ticketStatus === "valid" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {ticketStatus === "valid" ? "Approved" : "Rejected"}
                  </span>
                  <button onClick={() => setScannedOrder(null)} className="text-gray-500 hover:text-white text-xs">Clear</button>
                </div>
                
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Ticket Holder</p>
                  <p className="text-xl font-bold text-white leading-tight">{scannedOrder.student_name}</p>
                  <p className="text-orange-500 font-mono font-bold mt-1">{scannedOrder.ticket_code}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-800">
                  <div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase mb-0.5">Package</p>
                    <p className="text-sm font-medium">{scannedOrder.packages?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase mb-0.5">Pickup</p>
                    <p className="text-sm font-medium">Day {scannedOrder.pickup_day}</p>
                  </div>
                </div>

                {scanerror && (
                  <div className="bg-red-500/20 text-red-400 text-xs p-3 rounded-xl border border-red-500/30 font-medium">
                    ⚠️ {scanerror}
                  </div>
                )}
              </div>
            ) : scanerror ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
                    <p className="text-red-400 font-bold mb-2">Error Scanning</p>
                    <p className="text-gray-400 text-sm">{scanerror}</p>
                    <button onClick={() => setScanError(null)} className="mt-4 text-xs text-white bg-gray-800 px-4 py-2 rounded-lg">Try Again</button>
                </div>
            ) : (
                <div className="bg-gray-900/50 border border-dashed border-gray-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
                    <div className="text-3xl">🎫</div>
                    <p className="text-gray-500 text-sm font-medium">Scan a QR code or enter code below to verify ticket</p>
                </div>
            )}

            <div className="flex gap-2">
              <input
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value.toUpperCase())}
                placeholder="TICKET-CODE"
                className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white font-mono placeholder-gray-700 focus:outline-none focus:border-orange-500 transition"
                type="text"
              />
              <button
                onClick={() => {
                  if (manualInput) {
                    lookupTicket(manualInput);
                    setManualInput("");
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 rounded-xl transition"
              >
                Verify
              </button>
            </div>
          </div>

          {/* Right Column — Orders List & Filtering */}
          <div className="lg:w-2/3 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
              <p className="text-orange-500 text-xs font-bold tracking-widest uppercase">ORDER DATABASE</p>
              
              <div className="flex flex-wrap gap-2">
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-xs rounded-lg px-3 py-2 outline-none focus:border-orange-500"
                >
                  <option value="all">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
                <select 
                  value={filterDay} 
                  onChange={(e) => setFilterDay(e.target.value)}
                  className="bg-gray-900 border border-gray-800 text-xs rounded-lg px-3 py-2 outline-none focus:border-orange-500"
                >
                  <option value="all">All Days</option>
                  <option value="1">Day 1</option>
                  <option value="2">Day 2</option>
                  <option value="3">Day 3</option>
                </select>
                <div className="relative">
                    <input 
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-900 border border-gray-800 text-xs rounded-lg px-3 py-2 pl-8 outline-none focus:border-orange-500 w-48"
                    />
                    <span className="absolute left-3 top-2.5 opacity-30">🔍</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-900/50">
                      <th className="text-left px-6 py-4 text-gray-500 font-bold uppercase text-[10px] tracking-widest">Student</th>
                      <th className="text-left px-6 py-4 text-gray-500 font-bold uppercase text-[10px] tracking-widest">Package</th>
                      <th className="text-left px-6 py-4 text-gray-500 font-bold uppercase text-[10px] tracking-widest text-center">Day</th>
                      <th className="text-right px-6 py-4 text-gray-500 font-bold uppercase text-[10px] tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-800/50 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-200">{order.student_name}</p>
                          <p className="text-xs text-gray-500 group-hover:text-orange-500 transition-colors">{order.ticket_code}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-300">{order.packages?.name}</p>
                          <p className="text-[10px] text-gray-600 uppercase font-bold">₦{(order.packages?.price / 100).toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-gray-800 px-2 py-1 rounded text-xs font-bold text-gray-400">D{order.pickup_day}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                            order.payment_status === "paid" ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"
                          }`}>
                            {order.payment_status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-20 text-center">
                                <p className="text-gray-600 font-medium">No orders match your filters</p>
                                <button onClick={() => {setFilterStatus('all'); setFilterDay('all'); setSearchQuery('');}} className="text-orange-500 text-xs mt-2 font-bold hover:underline">Clear all filters</button>
                            </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
