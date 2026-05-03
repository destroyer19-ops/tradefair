import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="overflow-hidden relative h-screen bg-black">
        {/* Aggressive Visual Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/package-b.jpg" 
            className="w-full h-full object-cover opacity-30 blur-[4px] scale-105" 
            alt="background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          {/* Subtle Orange Glow Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="flex h-screen flex-col md:flex-row items-center relative z-10 px-6 md:px-24">
          {/* Left Side: Massive Typography */}
          <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left pt-12 md:pt-0">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full mb-8 backdrop-blur-md">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">Trade Fair 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic">
              SKIP THE QUEUE,<br/>
              <span className="text-orange-500">EAT LIKE A KING.</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 font-medium leading-relaxed">
              Order your legendary Maxie's Kitchen meal in advance. Fresh, hot, and ready for pickup at our stand.
            </p>

            <div className="relative group">
              {/* Floating VR Badge Overlapping CTA */}
              <div className="absolute -top-12 -right-12 md:-right-16 z-20 rotate-12 animate-pulse transition-transform duration-500 group-hover:rotate-0">
                <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-[0_0_50px_rgba(234,88,12,0.6)] border-2 border-white/20">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">🎮</span>
                    <span className="text-[10px] font-black uppercase leading-none">FREE VR</span>
                    <span className="text-[8px] font-bold opacity-80 mt-0.5">PKG B ONLY</span>
                  </div>
                </div>
              </div>

              <Link
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-black py-5 px-12 rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(234,88,12,0.3)] hover:shadow-[0_0_60px_rgba(234,88,12,0.5)] hover:scale-105 uppercase tracking-widest flex items-center gap-4"
                to="/order"
              >
                Place Your Order Now
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side: Immersive Packages Showcase */}
          <div className="w-full md:w-2/5 hidden md:flex items-center justify-end">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 w-full max-w-sm shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <h5 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-orange-500"></span>
                The Menu
              </h5>
              
              <div className="space-y-8 relative z-10">
                <div className="group/item">
                  <p className="text-orange-500 text-[10px] font-black tracking-widest mb-2 opacity-60 group-hover/item:opacity-100 transition-opacity">PACKAGE A</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-white text-xl font-bold leading-tight">Rice + <br/>Pepper Soup</h4>
                    </div>
                    <p className="text-white font-black text-2xl">₦5,200</p>
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full"></div>

                <div className="group/item">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-orange-500 text-[10px] font-black tracking-widest">PACKAGE B</p>
                    <span className="bg-orange-500 text-[8px] text-white font-black px-2 py-0.5 rounded-full uppercase">Popular</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-white text-xl font-bold leading-tight">Beef Rice + <br/>Chicken</h4>
                    </div>
                    <p className="text-white font-black text-2xl">₦7,680</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-gray-500 text-[10px] font-medium leading-relaxed italic text-center">
                  *All orders include rapid stand pickup. <br/>Limited slots available daily.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Aggressive Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-row items-center justify-center md:justify-start gap-8 md:gap-16 px-6 md:px-24 py-10 bg-black/80 backdrop-blur-md text-white border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="group cursor-default">
            <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">1000</p>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Total Slots</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block"></div>
          <div className="group cursor-default">
            <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">3</p>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Event Days</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block"></div>
          <div className="group cursor-default">
            <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">2</p>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Pro Menus</p>
          </div>
        </div>
      </div>
      {/* How it works */}
      <div className="bg-[#0f0f0f] px-6 md:px-24 py-20">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-xs font-bold tracking-widest mb-3">
            THE PROCESS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-4">
            <span className="text-4xl">🛒</span>
            <p className="text-orange-500 text-xs font-bold tracking-widest">
              STEP 01
            </p>
            <h3 className="text-white text-xl font-bold">
              Choose your package
            </h3>
            <p className="text-gray-400 text-sm">
              Pick from our available meal packages and select your preferred
              pickup day.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-4">
            <span className="text-4xl">💳</span>
            <p className="text-orange-500 text-xs font-bold tracking-widest">
              STEP 02
            </p>
            <h3 className="text-white text-xl font-bold">Pay securely</h3>
            <p className="text-gray-400 text-sm">
              Complete your payment securely via bank transfer or card through
              Flutterwave. We recommend bank transfer for a faster experience.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-4">
            <span className="text-4xl">🎫</span>
            <p className="text-orange-500 text-xs font-bold tracking-widest">
              STEP 03
            </p>
            <h3 className="text-white text-xl font-bold">Get your ticket</h3>
            <p className="text-gray-400 text-sm">
              Receive your digital ticket via email with a QR code. Show it at
              the stand to collect your meal.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0f0f0f] px-6 md:px-24 py-20">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-xs font-bold tracking-widest mb-3">
            MENU
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Packages
          </h2>
        </div>
        <div className="flex mb-6 flex-col md:flex-row gap-8 items-center justify-center">
          <div className="relative rounded-2xl overflow-hidden h-80">
            <img
              src="/package-a.jpg"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-orange-500 text-xs font-bold tracking-widest mb-1">
                PACKAGE A
              </p>
              <p className="text-xl font-bold mb-1">Rice + Pepper Soup</p>
              <p className="text-gray-300 text-sm mb-4">
                Served hot with spicy pepper soup
              </p>
              <div className="flex items-center justify-between">
                <p className="text-orange-500 font-bold text-lg">₦5,200</p>
                <Link
                  to="/order"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full transition"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-80">
            <img
              src="/package-b.jpg"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-orange-500 text-xs font-bold tracking-widest mb-1">
                PACKAGE B
              </p>
              <p className="text-xl font-bold mb-1">Beef Rice + Chicken</p>
              <p className="text-gray-300 text-sm mb-4">
                Rich beef rice with grilled chicken
              </p>
              <div className="flex items-center justify-between">
                <p className="text-orange-500 font-bold text-lg">₦7,680</p>
                <Link
                  to="/order"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full transition"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* VR Promotion Banner */}
        <div className="mx-6 md:mx-24 rounded-2xl bg-gray-900 border border-orange-500/30 px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 shadow-2xl shadow-orange-500/10">
          <div>
            <p className="text-orange-500 text-xs font-bold tracking-widest mb-2">
              SPECIAL PROMOTION 🎮
            </p>
            <h2 className="text-white text-3xl font-bold mb-2">
              Free VR Game Session!
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              The first 50 orders of **Package B (Beef Rice)** qualify for a
              free session of VR games at our stand. Don't miss out!
            </p>
          </div>
          <Link
            to="/order"
            className="bg-orange-500 text-white font-bold px-8 py-4 rounded-full whitespace-nowrap hover:bg-orange-600 transition"
          >
            Claim My VR Spot
          </Link>
        </div>
        {/* Free Delivery Banner */}
        <div className="mx-6 md:mx-24 rounded-2xl bg-orange-500 px-8 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-xs font-bold tracking-widest mb-2">
              LIMITED OFFER
            </p>
            <h2 className="text-white text-3xl font-bold mb-2">
              Free Hostel Delivery 🚀
            </h2>
            <p className="text-orange-100 text-sm max-w-md">
              The first 50 orders qualify for free delivery to a designated
              point in your hostel. Order early to secure your spot.
            </p>
          </div>
          <Link
            to="/order"
            className="bg-white text-orange-500 font-bold px-8 py-4 rounded-full whitespace-nowrap hover:bg-orange-50 transition"
          >
            Order Now
          </Link>
        </div>
      </div>
      {/* FAQ */}
      <div className="bg-[#0f0f0f] px-6 md:px-24 py-20">
        <div className="text-center mb-12">
          <p className="text-orange-500 text-xs font-bold tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {[
            {
              q: "How do I place an order?",
              a: "Click the 'Place your order' button, fill in your details, select your package and pickup day, then complete payment securely via Flutterwave. We recommend bank transfer for a faster experience.",
            },
            {
              q: "How will I receive my ticket?",
              a: "After successful payment, your ticket with a unique QR code will be sent to your email address automatically.",
            },
            {
              q: "How do I pick up my order?",
              a: "Come to the Maxie's Kitchen stand on your chosen pickup day and show your QR code ticket. Our team will scan it and hand you your meal.",
            },
            {
              q: "Can I get free delivery?",
              a: "Yes! The first 50 orders qualify for free delivery to a designated point in your hostel. Order early to secure your spot.",
            },
            {
              q: "What if I have issues with my order?",
              a: "Reach out to us directly on WhatsApp and we'll sort it out as quickly as possible.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <p className="text-white font-bold mb-2">{item.q}</p>
              <p className="text-gray-400 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0a0a0a] border-t border-gray-800 px-6 md:px-24 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-orange-500 font-bold text-xl mb-1">
              Maxie's Kitchen
            </h3>
            <p className="text-gray-400 text-sm">
              Trade Fair 2026 — Pre-order your meal today
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <a
              href="https://wa.me/2349033101546"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition text-sm"
            >
              💬 Chat us on WhatsApp
            </a>
            <Link
              to="/order"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition text-sm"
            >
              Place Order
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-xs">
            © 2026 Maxie's Kitchen. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
