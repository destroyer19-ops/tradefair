import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import html2canvas from "html2canvas";
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("tx_ref") || searchParams.get("reference");
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
        
        // Trigger confetti on successful load
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#ffffff', '#000000']
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (reference) fetchOrder();
  }, [reference]);

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
      {loading ? (
        <div className="text-gray-400">Loading your ticket...</div>
      ) : !order ? (
        <div className="text-gray-400">Ticket not found.</div>
      ) : (
        <div className="w-full max-w-md">
          {/* Success message */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-gray-400 mt-2">
              Your meal has been reserved. See you at the fair!
            </p>
          </div>

          {/* Ticket card wrapper for capture */}
          <div ref={ticketRef} className="p-4 bg-[#0f0f0f]">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
              {/* Ticket header */}
              <div className="bg-primary-orange px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Maxie's Kitchen Logo" className="h-6 w-auto" />
                  <h2 className="font-bold text-lg text-text-primary">Maxie's Kitchen</h2>
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
                    <p className="font-medium text-sm truncate">{order.student_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs tracking-widest mb-1">
                      PACKAGE
                    </p>
                    <p className="font-medium text-sm">{order.packages?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs tracking-widest mb-1">
                      PICKUP DAY
                    </p>
                    <p className="font-medium text-sm">Day {order.pickup_day}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs tracking-widest mb-1">
                      STATUS
                    </p>
                    <p className="text-green-400 font-bold text-sm">✓ Confirmed</p>
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
