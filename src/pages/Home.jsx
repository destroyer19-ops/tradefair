import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="overflow-hidden relative h-screen ">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover inset-0 absolute"
          src="/hero-bg.mp4"
        ></video>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="flex h-screen flex-col md:flex-row items-center">
          <div className="z-10 w-full md:w-1/2 relative gap-6 h-screen text-white flex flex-col text-center md:text-left items-center md:items-start pl-6 md:pl-24 justify-center pb-24">
            <h6 className="font-medium px-4 py-1 text-orange-500 bg-white rounded-full">
              Trade Fair 2026
            </h6>
            <h1 className="text-4xl md:text-6xl font-bold">Maxie's Kitchen</h1>
            <p className="text-gray-300 font-normal text-lg">
              Order your meal in advance, skip the queue
            </p>
            <Link
              className="bg-orange-500 text-white rounded-full py-4 px-8 w-fit"
              to="/order"
            >
              Place your order
            </Link>
          </div>
          <div className="w-full md:w-1/2 z-10 hidden h-screen relative md:flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white w-full max-w-sm">
              <h5 className="font-bold text-white">Our Packages</h5>
              <div className="border border-white/20 rounded-xl p-4 mb-4">
                <p className="text-orange-500 text-xs font-bold tracking-widest">
                  PACKAGE A
                </p>
                <p>Rice + Turkey</p>
                <p className="text-orange-500 font-bold">N 6,000</p>
              </div>
              <div className="border border-white/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-orange-500 text-xs font-bold tracking-widest">
                    PACKAGE B
                  </p>
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                </div>{" "}
                <p>Rice + Turkey + Salad</p>
                <p className="text-orange-500 font-bold">N 7,000</p>
              </div>
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-row items-center gap-4 md:gap-8 px-6 md:px-24 py-8 bg-black/60 backdrop-blur-sm text-white border-t border-gray-700">
          <div>
            <p className="text-2xl text-orange-500 font-bold">1000</p>
            <p className="text-gray-300 text-sm">slots</p>
          </div>
          <div className="w-px h-8 bg-gray-500"></div>
          <div>
            <p className="text-2xl text-orange-500 font-bold">3</p>
            <p className="text-gray-300 text-sm">days</p>
          </div>
          <div className="w-px h-8 bg-gray-500"></div>
          <div>
            <p className="text-2xl text-orange-500 font-bold">2</p>
            <p className="text-gray-300 text-sm">packages</p>
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
              Complete your payment securely via card or bank transfer through
              Paystack.
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
        <div className="flex flex-col md:flex-row gap-8">
          <div className="text-center mb-12">
            <p className="text-orange-500 text-xs font-bold tracking-widest mb-3">
              MENU
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our Packages
            </h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-80">
            <img src="/package-a.jpg" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-orange-500 text-xs font-bold tracking-widest mb-1">
                PACKAGE A
              </p>
              <p className="text-xl font-bold mb-1">Rice + Turkey</p>
              <p className="text-gray-300 text-sm mb-4">
                Served with your choice of sides
              </p>
              <div className="flex items-center justify-between">
                <p className="text-orange-500 font-bold text-lg">₦7,200</p>
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
            <img src="/package-b.jpg" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-orange-500 text-xs font-bold tracking-widest mb-1">
                PACKAGE A
              </p>
              <p className="text-xl font-bold mb-1">
                Rice + Spicy Chickent + Salad
              </p>
              <p className="text-gray-300 text-sm mb-4">
                Served with your choice of sides
              </p>
              <div className="flex items-center justify-between">
                <p className="text-orange-500 font-bold text-lg">₦8,00</p>
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
      </div>
    </>
  );
};

export default Home;
