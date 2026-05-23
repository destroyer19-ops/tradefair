import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-black text-white selection:bg-orange-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
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

        <div className="flex-grow flex flex-col md:flex-row items-center relative z-10 px-6 md:px-24 pt-20 pb-12">
          {/* Left Side: Massive Typography */}
          <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full mb-8 backdrop-blur-md">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">Trade Fair 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic uppercase">
              SKIP THE QUEUE,<br/>
              <span className="text-orange-500">EAT LIKE A KING.</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 font-medium leading-relaxed">
              Order your legendary Maxie's Kitchen meal in advance. Fresh, hot, and ready for pickup at our stand.
            </p>

            <div className="relative group mb-12">
              {/* Floating VR Badge Overlapping CTA */}
              <div className="absolute -top-12 -right-12 md:-right-16 z-20 rotate-12 animate-pulse transition-transform duration-500 group-hover:rotate-0">
                <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-[0_0_50px_rgba(234,88,12,0.6)] border-2 border-white/20">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">🎮</span>
                    <span className="text-[10px] font-black uppercase leading-none">FREE VR</span>
                    <span className="text-[8px] font-bold opacity-80 mt-0.5 uppercase tracking-tighter">PKG B ONLY</span>
                  </div>
                </div>
              </div>

              <Link
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-black py-5 px-12 rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(234,88,12,0.3)] hover:shadow-[0_0_60px_rgba(234,88,12,0.5)] hover:scale-105 uppercase tracking-widest flex items-center gap-4"
                to="/order"
              >
                Place Order Now
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Aggressive Stats Bar (Integrated in flow) */}
            <div className="flex flex-row items-center justify-center md:justify-start gap-8 md:gap-16 pt-8 border-t border-white/10 w-full">
              <div className="group cursor-default text-center md:text-left">
                <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">1000</p>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Total Slots</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="group cursor-default text-center md:text-left">
                <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">3</p>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Event Days</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="group cursor-default text-center md:text-left">
                <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">2</p>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Pro Menus</p>
              </div>
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
                <div className="group/item cursor-default">
                  <p className="text-orange-500 text-[10px] font-black tracking-widest mb-2 opacity-60 group-hover/item:opacity-100 transition-opacity">PACKAGE A</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-white text-xl font-bold leading-tight">Rice + <br/>Pepper Soup</h4>
                    </div>
                    <p className="text-white font-black text-2xl">₦5,200</p>
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full"></div>

                <div className="group/item cursor-default">
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
          <div className="group cursor-default text-center md:text-left">
            <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">1000</p>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Total Slots</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block"></div>
          <div className="group cursor-default text-center md:text-left">
            <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">3</p>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Event Days</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block"></div>
          <div className="group cursor-default text-center md:text-left">
            <p className="text-3xl md:text-4xl text-orange-500 font-black tracking-tighter group-hover:scale-110 transition-transform">2</p>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Pro Menus</p>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="bg-black px-6 md:px-24 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 mb-20 text-center md:text-left">
          <p className="text-orange-500 text-xs font-black tracking-[0.4em] mb-4 uppercase">The Mission</p>
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">HOW IT <span className="text-orange-500">WORKS.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {[
            { step: "01", icon: "🛒", title: "CHOOSE YOUR FUEL", desc: "Select your preferred meal package and pickup day from our exclusive menu." },
            { step: "02", icon: "💳", title: "SECURE ACCESS", desc: "Complete payment via Flutterwave. Bank transfer is recommended for instant confirmation." },
            { step: "03", icon: "🎫", title: "DEPLOY & EAT", desc: "Receive your QR ticket via email. Flash it at our stand to claim your meal instantly." }
          ].map((item, index) => (
            <div key={index} className="group relative">
              <span className="absolute -top-12 -left-4 text-8xl font-black text-white/5 group-hover:text-orange-500/10 transition-colors duration-500 select-none">{item.step}</span>
              <div className="bg-gray-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm group-hover:border-orange-500/30 transition-all duration-300 group-hover:-translate-y-2">
                <div className="text-4xl mb-6 filter drop-shadow-[0_0_10px_rgba(234,88,12,0.4)]">{item.icon}</div>
                <h3 className="text-white text-xl font-black mb-4 tracking-tight uppercase italic">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="bg-black px-6 md:px-24 py-32">
        <div className="text-center mb-20">
          <p className="text-orange-500 text-xs font-black tracking-[0.4em] mb-4 uppercase">The Artillery</p>
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">SELECT YOUR <span className="text-orange-500">PACKAGE.</span></h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-6xl mx-auto px-6">
          {[
            { 
              id: 'a', 
              name: "Rice + Pepper Soup", 
              desc: "Traditional seasoned rice served with spicy, authentic pepper soup.", 
              price: "5,200", 
              img: "/package-a.jpg",
              tag: "Classic Choice"
            },
            { 
              id: 'b', 
              name: "Beef Rice + Chicken", 
              desc: "Premium beef-infused rice paired with succulent grilled chicken.", 
              price: "7,680", 
              img: "/package-b.jpg",
              tag: "Elite Choice",
              popular: true
            }
          ].map((pkg) => (
            <div key={pkg.id} className="w-full md:w-1/2 group relative">
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                <img src={pkg.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                
                {/* Glassmorphism Card Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 transition-transform duration-500">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-orange-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                          {pkg.tag}
                        </span>
                        {pkg.popular && (
                          <span className="animate-pulse text-orange-500 text-[9px] font-black uppercase tracking-widest">
                            🔥 MOST WANTED
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl md:text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">{pkg.name}</h3>
                      <p className="text-gray-400 text-xs md:text-sm mb-6 font-medium line-clamp-2">{pkg.desc}</p>
                      
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest leading-none">Price</span>
                          <span className="text-white text-2xl md:text-3xl font-black italic tracking-tighter">₦{pkg.price}</span>
                        </div>
                        <Link
                          to="/order"
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-black px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 uppercase tracking-widest"
                        >
                          Order
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Alert Promotions */}
      <section className="bg-black py-16 px-6 md:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* VR Promotion */}
          <div className="flex-1 bg-gray-900 border-2 border-orange-500/50 rounded-[2.5rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 group-hover:scale-125 transition-transform duration-500 select-none">🎮</div>
            <div className="relative z-10">
              <span className="text-orange-500 text-xs font-black tracking-[0.3em] uppercase mb-4 block">Limited Deployment</span>
              <h3 className="text-3xl font-black text-white italic mb-4 uppercase tracking-tighter leading-none">FREE VR<br/>SESSION.</h3>
              <p className="text-gray-400 text-sm font-medium mb-8 max-w-xs leading-relaxed">The first 50 orders of **Package B** receive a high-octane VR experience at our stand.</p>
              <Link to="/order" className="bg-white text-black font-black px-8 py-4 rounded-2xl uppercase text-xs tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-colors">Claim Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-black px-6 md:px-24 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-orange-500 text-xs font-black tracking-[0.4em] mb-4 uppercase">Intel</p>
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">FREQUENTLY ASKED <span className="text-orange-500">QUESTIONS.</span></h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "HOW DO I PLACE AN ORDER?", a: "Hit the 'ORDER' button, fill your details, select your package and pickup day, then pay via Flutterwave. Bank transfer is fastest." },
              { q: "HOW WILL I RECEIVE MY TICKET?", a: "Instant deployment. Your unique QR code ticket is sent to your email immediately after payment confirmation." },
              { q: "HOW DO I COLLECT MY FUEL?", a: "Advance to the Maxie's Kitchen stand on your chosen day. Flash your QR code to our team to receive your meal." }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900/30 border-b border-white/5 p-8 hover:bg-white/5 transition-colors">
                <p className="text-white font-black text-lg mb-4 italic uppercase tracking-tight">{item.q}</p>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 px-6 md:px-24 py-20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 text-[20vw] font-black text-white/5 select-none leading-none -mb-10 -mr-10">MAXIE</div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div>
              <img src="/logo.jpg" alt="Maxie's Kitchen Logo" className="h-10 w-auto mb-4" />
              <h3 className="text-3xl font-black text-primary-orange italic uppercase tracking-tighter mb-6">Maxie's Kitchen</h3>
              <p className="text-text-secondary font-medium leading-relaxed uppercase text-xs tracking-widest">Trade Fair 2026 — The elite pre-order experience. High-quality fuel for the bold.</p>
            </div>

            <div className="flex flex-col gap-6 items-start md:items-end">              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Communication Lines</p>
              <a href="https://wa.me/2349033101546" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-orange-500 transition-colors group">
                <span className="text-sm font-black uppercase tracking-widest">Connect on WhatsApp</span>
                <span className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">💬</span>
              </a>
              <Link to="/order" className="bg-orange-500 text-white font-black px-10 py-5 rounded-2xl uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform shadow-xl shadow-orange-500/20">Place Order Now</Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">© 2026 MAXIE'S KITCHEN. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest cursor-default hover:text-orange-500 transition-colors">Security</span>
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest cursor-default hover:text-orange-500 transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
