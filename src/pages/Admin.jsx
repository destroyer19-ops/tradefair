import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "../lib/supabase";

const Admin = () => {
  const ADMIN_PASSWORD = "Admin123";
  const [inputValue, setInputValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [scanerror, setScanError] = useState(null);
  const [scannedOrder, setScannedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const lookupTicket = async (ticketCode) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, packages(name, description)")
      .eq("ticket_code", ticketCode)
      .single();
    if (error) {
      setScanError("Ticket not found");
    }
    setScannedOrder(data);
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
        lookupTicket(decodedText);
        // call your lookup function here
      },
      (error) => console.log(error),
    );
    return () => scanner.clear();
  }, [isAuthenticated]);
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
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">
      <h1>Admin Dashboard</h1>
      <div className="left">
        QR Scanner
        <div id="reader"></div>
      </div>
      {scannedOrder && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-4">
          <p className="text-orange-500 font-bold">
            {scannedOrder.ticket_code}
          </p>
          <p>{scannedOrder.student_name}</p>
          <p>{scannedOrder.packages?.name}</p>
          <p>Pickup Day: {scannedOrder.pickup_day}</p>
          <p>Status: {scannedOrder.payment_status}</p>
        </div>
      )}

      {scanerror && <p className="text-red-400">{scanerror}</p>}
      <div className="right">
        ORder lists
        {orders.map((order) => (
          <div key={order.id}>
            <p>{order.student_name}</p>
            <p>{order.packages?.name}</p>
            <p>{order.ticket_code}</p>
            <p>{order.payment_status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
