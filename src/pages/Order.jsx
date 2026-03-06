import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-800 rounded-xl ${className}`}></div>
);

const Order = () => {
  const [formDetails, setFormDetails] = useState({
    student_name: "",
    matric_number: "",
    email: "",
    phone_number: "",
    hostel: "",
    room_number: "",
    package_id: "",
    pickup_day: ""
  });
  const [slots, setSlots] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [slotsRes, pkgsRes] = await Promise.all([
          fetch("/api/get-availability"),
          supabase.from("packages").select("*")
        ]);

        if (!slotsRes.ok) throw new Error("Failed to fetch availability");
        const slotsData = await slotsRes.json();
        setSlots(slotsData.data);

        if (pkgsRes.error) throw pkgsRes.error;
        setPackages(pkgsRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const errors = useMemo(() => {
    const e = {};
    if (!formDetails.student_name) e.student_name = "Required";
    if (!formDetails.matric_number) e.matric_number = "Required";
    if (!formDetails.email || !/^\S+@\S+\.\S+$/.test(formDetails.email)) e.email = "Invalid email";
    if (!formDetails.phone_number || formDetails.phone_number.length < 10) e.phone_number = "Invalid phone";
    if (!formDetails.hostel) e.hostel = "Required";
    if (!formDetails.package_id) e.package_id = "Select a package";
    if (!formDetails.pickup_day) e.pickup_day = "Select a day";
    return e;
  }, [formDetails]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      student_name: true,
      matric_number: true,
      email: true,
      phone_number: true,
      hostel: true,
      room_number: true,
      package_id: true,
      pickup_day: true
    });

    if (!isValid) return;

    try {
      setSubmitting(true);
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create order");
      window.location.href = data.authorization_url;
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPackage = useMemo(() => 
    packages.find(p => p.id === formDetails.package_id), 
    [packages, formDetails.package_id]
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-32 lg:pb-12">
      {/* Header */}
      <div className="px-6 md:px-24 py-6 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-[#0f0f0f]/80 backdrop-blur-md z-30">
        <Link to="/" className="text-orange-500 font-bold text-xl hover:opacity-80 transition">Maxie's Kitchen</Link>
        <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Trade Fair 2026</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Side */}
          <div className="flex-1">
            <header className="mb-10">
              <h1 className="text-4xl font-bold mb-3">Complete Your Order</h1>
              <p className="text-gray-400">Fill in your details and select your preferred meal package.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Section 1: Personal */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center text-sm font-bold">1</span>
                  <h3 className="text-white font-bold tracking-tight uppercase text-sm">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name: "student_name", placeholder: "Full Name", type: "text" },
                    { name: "matric_number", placeholder: "Matric Number", type: "text" },
                    { name: "email", placeholder: "Email Address", type: "email" },
                    { name: "phone_number", placeholder: "WhatsApp Number", type: "tel" },
                  ].map((field) => (
                    <div key={field.name}>
                      <input
                        value={formDetails[field.name]}
                        onChange={(e) => setFormDetails({ ...formDetails, [field.name]: e.target.value })}
                        onBlur={() => setTouched({ ...touched, [field.name]: true })}
                        type={field.type}
                        placeholder={field.placeholder}
                        className={`w-full bg-gray-900 border ${touched[field.name] && errors[field.name] ? 'border-red-500' : 'border-gray-800'} rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition shadow-sm`}
                      />
                      {touched[field.name] && errors[field.name] && (
                        <p className="text-red-500 text-[10px] font-bold mt-2 ml-2 uppercase tracking-wider">{errors[field.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 2: Hostel */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center text-sm font-bold">2</span>
                  <h3 className="text-white font-bold tracking-tight uppercase text-sm">Delivery Location</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    value={formDetails.hostel}
                    onChange={(e) => setFormDetails({ ...formDetails, hostel: e.target.value })}
                    placeholder="Hostel Name"
                    className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                  />
                  <input
                    value={formDetails.room_number}
                    onChange={(e) => setFormDetails({ ...formDetails, room_number: e.target.value })}
                    placeholder="Room Number"
                    className="bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition"
                  />
                </div>
              </section>

              {/* Section 3: Package Selection */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center text-sm font-bold">3</span>
                  <h3 className="text-white font-bold tracking-tight uppercase text-sm">Select Your Package</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {loading ? (
                    <>
                      <Skeleton className="h-64" />
                      <Skeleton className="h-64" />
                    </>
                  ) : (
                    packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setFormDetails({ ...formDetails, package_id: pkg.id })}
                        className={`relative text-left rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                          formDetails.package_id === pkg.id 
                            ? "border-orange-500 bg-orange-500/5 shadow-lg shadow-orange-500/10" 
                            : "border-gray-800 hover:border-gray-700 bg-gray-900/40"
                        }`}
                      >
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={pkg.id === 1 || pkg.name.includes("A") ? "/package-a.jpg" : "/package-b.jpg"} 
                            alt={pkg.name}
                            className={`w-full h-full object-cover transition-transform duration-500 ${formDetails.package_id === pkg.id ? 'scale-110' : ''}`}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-xl">{pkg.name}</h4>
                            <p className="text-orange-500 font-bold">₦{(pkg.price / 100).toLocaleString()}</p>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed">{pkg.description}</p>
                        </div>
                        {formDetails.package_id === pkg.id && (
                          <div className="absolute top-4 right-4 bg-orange-500 text-white rounded-full p-1.5 shadow-xl">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
                {touched.package_id && errors.package_id && (
                    <p className="text-red-500 text-[10px] font-bold mt-4 uppercase tracking-wider">Please select a meal package</p>
                )}
              </section>

              {/* Section 4: Pickup Day */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center text-sm font-bold">4</span>
                  <h3 className="text-white font-bold tracking-tight uppercase text-sm">Choose Pickup Day</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {loading ? (
                    <>
                      <Skeleton className="h-20" />
                      <Skeleton className="h-20" />
                      <Skeleton className="h-20" />
                    </>
                  ) : (
                    slots.map((slot) => {
                      const isFull = slot.booked >= slot.capacity;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={isFull}
                          onClick={() => setFormDetails({ ...formDetails, pickup_day: slot.day })}
                          className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                            isFull ? 'opacity-40 cursor-not-allowed bg-gray-900 border-gray-900' :
                            formDetails.pickup_day === slot.day 
                              ? "border-orange-500 bg-orange-500/10 text-white" 
                              : "border-gray-800 bg-gray-900/40 hover:border-gray-700"
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{slot.label}</span>
                          <span className="font-bold">{isFull ? 'Fully Booked' : `${slot.capacity - slot.booked} Slots Left`}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </section>

              {error && (
                <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6 text-red-400 text-sm">
                  <p className="font-bold mb-1 uppercase tracking-widest text-[10px]">Error Processing Order</p>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !isValid}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-800 disabled:text-gray-600 text-white font-extrabold py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/10 uppercase tracking-widest text-sm flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Proceed to Payment 
                    <span className="bg-white/20 px-3 py-1 rounded-lg text-xs">₦{( (selectedPackage?.price || 0) / 100).toLocaleString()}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Desktop Sidebar Summary */}
          <aside className="hidden lg:block w-80">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 sticky top-32 shadow-2xl">
              <h5 className="text-orange-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Order Summary</h5>
              
              {selectedPackage ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-white font-bold text-lg leading-tight mb-2">{selectedPackage.name}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{selectedPackage.description}</p>
                  </div>
                  
                  <div className="space-y-3 pt-6 border-t border-gray-800">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-500 font-medium">Subtotal</p>
                      <p className="text-white font-bold">₦{(selectedPackage.price / 100).toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-500 font-medium">Delivery</p>
                      <p className="text-green-500 font-bold uppercase text-[10px]">Free</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-800">
                    <div className="flex justify-between items-end">
                      <p className="text-gray-500 text-xs font-bold uppercase">Total amount</p>
                      <p className="text-orange-500 text-2xl font-black">₦{(selectedPackage.price / 100).toLocaleString()}</p>
                    </div>
                  </div>

                  {formDetails.pickup_day && (
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mt-4">
                      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Pickup Scheduled</p>
                      <p className="text-white font-bold text-sm">Day {formDetails.pickup_day} at Stand</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">🛒</div>
                  <p className="text-gray-600 text-xs font-medium">Your cart is empty.<br/>Select a package to start.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Floating Bar */}
      {selectedPackage && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 z-40">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-2xl flex items-center justify-between backdrop-blur-xl bg-gray-900/90">
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Amount</p>
              <p className="text-white text-xl font-black">₦{(selectedPackage.price / 100).toLocaleString()}</p>
            </div>
            <button 
                onClick={handleSubmit}
                disabled={submitting || !isValid}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all text-sm"
            >
              {submitting ? '...' : 'Pay Now'}
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {submitting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center gap-6 p-6 text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-500/20 rounded-full"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h3 className="text-white text-2xl font-bold mb-2">Secure Checkout</h3>
            <p className="text-gray-400 max-w-xs mx-auto text-sm">We're redirecting you to Paystack to complete your payment securely.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
