import React, { useState, useEffect, useCallback, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "../lib/supabase";

const Admin = () => {
  const ADMIN_PASSWORD = "Admin123";
  const [inputValue, setInputValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [error, setError] = useState(null);
  const [scanerror, setScanError] = useState(null);
  const [scannedOrder, setScannedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ticketStatus, setTicketStatus] = useState(null); // 'valid' or 'used'
  const isScanning = useRef(false);

  const lookupTicket = useCallback(async (ticketCode) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, packages(name, description)")
      .eq("ticket_code", ticketCode)
      .single();
    if (error) {
      setScanError("Ticket not found");
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
    await supabase.from("ticket_scans").insert({
      order_id: data.id,
      scanned_by: "admin",
    });
    setTicketStatus("valid");
    playBeep(true);

    setScannedOrder(data);
  }, []);
  const playBeep = (success) => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.frequency.value = success ? 1000 : 400; // high = valid, low = invalid
    gain.gain.value = 0.3;
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  };
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*, packages(name, description)");
        if (error) {
          throw new Error("failed to fetch orders");
        }
        setOrders(data);
      } catch (error) {
        setScanError("Failed to load orders");
      }
    };

    fetchData();
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
        // decodedText is the ticket code
        if (isScanning.current) return;
        isScanning.current = true;
        lookupTicket(decodedText);
        setTimeout(() => {
          isScanning.current = false;
        }, 5000); // call your lookup function here
      },
      (error) => console.log(error),
    );
    return () => scanner.clear();
  }, [isAuthenticated, lookupTicket]);
  const handlLogin = (e) => {
    e.preventDefault();
    if (inputValue === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError("Wrong Password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <form
          onSubmit={handlLogin}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
        >
          <h1 className="text-white text-2xl font-bold">Admin Login</h1>

          {error && <p className="text-red-400">{error}</p>}
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-orange-500 font-bold text-xl">ChopHub Admin</h1>
        <p className="text-gray-400 text-sm">{orders.length} total orders</p>
      </div>

      <div className="p-8 flex flex-col lg:flex-row gap-8">
        {/* Left — Scanner */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <p className="text-orange-500 text-xs font-bold tracking-widest">
            QR SCANNER
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div id="reader" className="w-full"></div>
          </div>

          {/* Scanned result */}
          {scannedOrder && (
            <div
              className={`border rounded-2xl p-6 flex flex-col gap-3 ${
                ticketStatus === "valid"
                  ? "bg-green-900/20 border-green-700"
                  : "bg-red-900/20 border-red-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-widest text-gray-400">
                  SCANNED TICKET
                </p>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    ticketStatus === "valid"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {ticketStatus === "valid" ? "✓ Valid" : "✗ Already Used"}
                </span>
              </div>
              <p className="text-orange-500 text-xl font-bold">
                {scannedOrder.ticket_code}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-400 text-xs">Name</p>
                  <p className="font-medium">{scannedOrder.student_name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Package</p>
                  <p className="font-medium">{scannedOrder.packages?.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Pickup Day</p>
                  <p className="font-medium">Day {scannedOrder.pickup_day}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Payment</p>
                  <p
                    className={`font-medium ${scannedOrder.payment_status === "paid" ? "text-green-400" : "text-red-400"}`}
                  >
                    {scannedOrder.payment_status}
                  </p>
                </div>
              </div>
            </div>
          )}

          {scanerror && !scannedOrder && (
            <div className="bg-red-900/20 border border-red-700 rounded-2xl p-4">
              <p className="text-red-400">{scanerror}</p>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <input
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value.toUpperCase())}
            placeholder="Enter ticket code manually"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            type="text"
          />
          <button
            onClick={() => {
              if (manualInput) {
                lookupTicket(manualInput);
                setManualInput("");
              }
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 rounded-xl"
          >
            Check
          </button>
        </div>
        {/* Right — Orders list */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <p className="text-orange-500 text-xs font-bold tracking-widest">
            ALL ORDERS
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">
                    Package
                  </th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">
                    Day
                  </th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3">{order.student_name}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {order.packages?.name}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      Day {order.pickup_day}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          order.payment_status === "paid"
                            ? "bg-green-900/40 text-green-400"
                            : "bg-yellow-900/40 text-yellow-400"
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
