import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("tx_ref") || searchParams.get("reference");
  const status = searchParams.get("status");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef(null);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*, packages(name, description, price)")
          .eq("ticket_code", reference)
          .single();
        if (error) throw new Error(error.message);
        setOrder(data);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f97316", "#ffffff", "#000000"],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (reference && (status === "successful" || status === "completed")) {
      fetchOrder();
    } else {
      setLoading(false); // stop loading if status isn't successful
    }
  }, [reference, status]);
  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#0f0f0f",
        scale: 2, // Higher quality
      });
      const link = document.createElement("a");
      link.download = `maxie-ticket-${order.ticket_code}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-6 py-12">
      {!loading && status !== "completed" && status !== "successful" ? (
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-3xl font-bold mb-2">
            Payment {status === "cancelled" ? "Cancelled" : "Failed"}
          </h1>
          <p className="text-gray-400 mb-2">
            {status === "cancelled"
              ? "You cancelled the payment. No money was deducted."
              : "Your payment was not completed. No money was deducted."}
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Your slot reservation has been released.
          </p>

          <a
            href="/order"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition inline-block"
          >
            Try Again
          </a>
        </div>
      ) : loading ? (
        <div className="text-gray-400">Loading your ticket...</div>
      ) : !order ? (
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-400 mb-8">
            We couldn't find your ticket. Please contact us on WhatsApp.
          </p>
          <a href="/" className="text-orange-500 hover:underline">
            ← Back to home
          </a>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {/* Success message */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-text-secondary mt-2">
              Your meal has been reserved. See you at the fair!
            </p>
            {/* VR Game Eligibility Message */}
            {order.vr_eligible && (
              <div className="mt-4 p-3 bg-primary-orange/10 border border-primary-orange/20 rounded-xl flex items-center gap-3">
                <span className="text-xl animate-pulse">🎮</span>
                <div>
                  <p className="text-primary-orange text-[10px] font-bold uppercase tracking-widest">
                    Special Offer
                  </p>
                  <p className="text-white text-sm font-bold leading-tight">
                    You've qualified for a free VR session!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Ticket card wrapper for capture */}
          <div ref={ticketRef} className="p-4 bg-background-dark">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
              {/* Ticket header */}
              <div className="bg-primary-orange px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="Maxie's Kitchen Logo"
                    className="h-6 w-auto"
                  />
                  <h2 className="font-bold text-lg text-text-primary">
                    Maxie's Kitchen
                  </h2>
                </div>
                <p className="text-sm text-text-primary/80">Trade Fair 2026</p>
              </div>

              {/* Ticket body */}
              <div className="px-6 py-6 flex flex-col items-center gap-6 bg-background-dark">
                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <QRCodeSVG value={order.ticket_code} size={180} />
                </div>

                {/* Ticket code */}
                <div className="text-center">
                  <p className="text-gray-400 text-xs tracking-widest mb-1">
                    TICKET CODE
                  </p>
                  <p className="text-orange-500 text-2xl font-bold tracking-wider">
                    {order.ticket_code}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-dashed border-gray-700"></div>

                {/* Order details */}
                <div className="w-full grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs tracking-widest mb-1">
                      NAME
                    </p>
                    <p className="font-medium text-sm truncate">
                      {order.student_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs tracking-widest mb-1">
                      PACKAGE
                    </p>
                    <p className="font-medium text-sm">
                      {order.packages?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs tracking-widest mb-1">
                      PICKUP DAY
                    </p>
                    <p className="font-medium text-sm">
                      Day {order.pickup_day}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs tracking-widest mb-1">
                      STATUS
                    </p>
                    <p className="text-green-400 font-bold text-sm">
                      ✓ Confirmed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition shadow-lg"
            >
              {downloading ? (
                "Generating Image..."
              ) : (
                <>
                  <span>📥</span> Save Ticket to Gallery
                </>
              )}
            </button>
            <div className="text-center">
              <a
                href="/"
                className="text-gray-500 text-sm hover:text-orange-500 transition"
              >
                ← Back to Maxie's Kitchen
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
