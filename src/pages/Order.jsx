import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Order = () => {
  const [formDetails, setFormDetails] = useState({});
  const [slots, setSlots] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // slots
        setLoading(true);
        const response = await fetch("/api/get-availability");
        if (!response.ok) {
          throw new Error("Failed to fetch  order availability");
        }
        const results = await response.json();
        setSlots(results.data);

        // packages
        // const { data } = await supabase.from("packages").select("*");
        // packages
        const { data, error: pkgError } = await supabase
          .from("packages")
          .select("*");
        // console.log("packages data:", data);
        // console.log("packages error:", pkgError);
        if (pkgError) {
          throw new Error("Failed to fetch packages");
        }
        setPackages(data);
        // setPackages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });

      const data = await response.json();
      console.log("API response:", data);
      console.log("authorization_url:", data.authorization_url);
      window.location.href = data.authorization_url;
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <div className="px-6 md:px-24 py-6 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-orange-500 font-bold text-xl">Maxie's Kitchen</h2>
        <p className="text-gray-400 text-sm">Trade Fair 2026</p>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12">
        {/* Form side */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Place Your Order</h1>
          <p className="text-gray-400 mb-8">
            Fill in your details to reserve your meal
          </p>

          {loading && (
            <div className="bg-gray-800 rounded-xl p-4 mb-6 text-gray-400 text-sm">
              Loading packages and availability...
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Personal Info */}
            <div>
              <p className="text-orange-500 text-xs font-bold tracking-widest mb-3">
                PERSONAL INFO
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={formDetails.student_name || ""}
                  onChange={(e) =>
                    setFormDetails({
                      ...formDetails,
                      student_name: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Full Name"
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                />
                <input
                  value={formDetails.matric_number || ""}
                  onChange={(e) =>
                    setFormDetails({
                      ...formDetails,
                      matric_number: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Matric Number"
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                />
                <input
                  value={formDetails.email || ""}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, email: e.target.value })
                  }
                  type="email"
                  placeholder="Email Address"
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                />
                <input
                  value={formDetails.phone_number || ""}
                  onChange={(e) =>
                    setFormDetails({
                      ...formDetails,
                      phone_number: e.target.value,
                    })
                  }
                  type="tel"
                  placeholder="WhatsApp Number"
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            {/* Hostel Info */}
            <div>
              <p className="text-orange-500 text-xs font-bold tracking-widest mb-3">
                HOSTEL INFO
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={formDetails.hostel || ""}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, hostel: e.target.value })
                  }
                  type="text"
                  placeholder="Hostel Name"
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                />
                <input
                  value={formDetails.room_number || ""}
                  onChange={(e) =>
                    setFormDetails({
                      ...formDetails,
                      room_number: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Room Number"
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                />
              </div>
            </div>

            {/* Order Info */}
            <div>
              <p className="text-orange-500 text-xs font-bold tracking-widest mb-3">
                ORDER DETAILS
              </p>
              <div className="flex flex-col gap-4">
                <select
                  value={formDetails.package_id || ""}
                  onChange={(e) =>
                    setFormDetails({
                      ...formDetails,
                      package_id: e.target.value,
                    })
                  }
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="">Select a package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} — ₦{(pkg.price / 100).toLocaleString()}
                    </option>
                  ))}
                </select>
                <select
                  value={formDetails.pickup_day || ""}
                  onChange={(e) =>
                    setFormDetails({
                      ...formDetails,
                      pickup_day: parseInt(e.target.value),
                    })
                  }
                  className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
                >
                  <option value="">Select pickup day</option>
                  {slots.map((slot) => (
                    <option
                      key={slot.id}
                      value={slot.day}
                      disabled={slot.booked >= slot.capacity}
                    >
                      {slot.label} — {slot.capacity - slot.booked} slots left
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition"
            >
              {submitting ? "Processing..." : "Place Order & Pay"}
            </button>
          </form>
        </div>

        {/* Order summary side */}
        <div className="lg:w-80">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-8">
            <p className="text-orange-500 text-xs font-bold tracking-widest mb-4">
              ORDER SUMMARY
            </p>

            {formDetails.package_id ? (
              <>
                {packages
                  .filter((p) => p.id === formDetails.package_id)
                  .map((pkg) => (
                    <div key={pkg.id}>
                      <p className="font-bold text-lg">{pkg.name}</p>
                      <p className="text-gray-400 text-sm mb-4">
                        {pkg.description}
                      </p>
                      <div className="border-t border-gray-700 pt-4 flex justify-between">
                        <p className="text-gray-400">Total</p>
                        <p className="text-orange-500 font-bold text-lg">
                          ₦{(pkg.price / 100).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <p className="text-gray-500 text-sm">
                Select a package to see summary
              </p>
            )}

            {formDetails.pickup_day && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">Pickup Day</p>
                <p className="font-medium">
                  {slots.find((s) => s.day === formDetails.pickup_day)?.label}
                </p>
              </div>
            )}

            <div className="mt-6 bg-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400">
                🎫 You'll receive a ticket via email after payment
              </p>
              <p className="text-xs text-gray-400 mt-1">
                🎰 Your ticket enters you into the raffle draw
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
