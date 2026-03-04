import { QRCodeSVG } from "qrcode.react"; // in your JSX
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const OrderSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [reference]);
  console.log(order);
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

          {/* Ticket card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
            {/* Ticket header */}
            <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-lg">Maxie's Kitchen</h2>
              <p className="text-sm opacity-80">Trade Fair 2026</p>
            </div>

            {/* Ticket body */}
            <div className="px-6 py-6 flex flex-col items-center gap-6">
              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl">
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
                  <p className="font-medium">{order.student_name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs tracking-widest mb-1">
                    PACKAGE
                  </p>
                  <p className="font-medium">{order.packages?.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs tracking-widest mb-1">
                    PICKUP DAY
                  </p>
                  <p className="font-medium">Day {order.pickup_day}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs tracking-widest mb-1">
                    STATUS
                  </p>
                  <p className="text-green-400 font-medium">✓ Confirmed</p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-dashed border-gray-700"></div>

              {/* Raffle note */}
              <div className="w-full bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-300">
                  🎰 This ticket enters you into the{" "}
                  <span className="text-orange-500 font-medium">
                    raffle draw
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  A copy has been sent to your email
                </p>
              </div>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-gray-500 text-sm hover:text-orange-500 transition"
            >
              ← Back to Maxie's Kitchen
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
