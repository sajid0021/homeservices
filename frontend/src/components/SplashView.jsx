import React, { useState, useEffect } from 'react';

export default function SplashView({ onGetStarted }) {
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showCitiesMenu, setShowCitiesMenu] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [showMobileServices, setShowMobileServices] = useState(false);
  const [showMobileCities, setShowMobileCities] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Phone Mockup Typing & Active Service Highlight Simulations
  const [screen1Search, setScreen1Search] = useState('');
  const [screen1ActiveSvc, setScreen1ActiveSvc] = useState(0);
  const [screen2Qty, setScreen2Qty] = useState(1);
  const [screen3Tab, setScreen3Tab] = useState(1); // 0: Instant, 1: Schedule, 2: Recurring
  const [screen3Step, setScreen3Step] = useState(0); // 0: Ready, 1: Processing, 2: Success

  useEffect(() => {
    // 1. Search Typing Simulation
    const searchTerms = ['utensil cleaning', 'bathroom clean', 'cook help', 'kitchen prep'];
    let termIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let searchInterval;

    const runSearchSimulation = () => {
      const currentTerm = searchTerms[termIndex];
      if (!isDeleting) {
        setScreen1Search(currentTerm.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentTerm.length) {
          isDeleting = true;
          clearInterval(searchInterval);
          setTimeout(() => {
            searchInterval = setInterval(runSearchSimulation, 60);
          }, 1500);
        }
      } else {
        setScreen1Search(currentTerm.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          termIndex = (termIndex + 1) % searchTerms.length;
        }
      }
    };
    searchInterval = setInterval(runSearchSimulation, 90);

    // 2. Active Service Highlight Simulation
    const svcInterval = setInterval(() => {
      setScreen1ActiveSvc(prev => (prev + 1) % services.length);
    }, 2000);

    // 3. Cart Quantity & Total price Simulation
    const qtyInterval = setInterval(() => {
      setScreen2Qty(prev => (prev === 1 ? 2 : 1));
    }, 2800);

    // 4. Payment checkout step simulation
    const payFlowInterval = setInterval(() => {
      setScreen3Step(prev => (prev + 1) % 3);
    }, 3500);

    // 5. Tab selection simulation (loops every 4 seconds)
    const tabInterval = setInterval(() => {
      setScreen3Tab(prev => (prev + 1) % 3);
    }, 4000);

    return () => {
      clearInterval(searchInterval);
      clearInterval(svcInterval);
      clearInterval(qtyInterval);
      clearInterval(payFlowInterval);
      clearInterval(tabInterval);
    };
  }, []);
 
  useEffect(() => {
    const activeEl = document.getElementById(`screen1-svc-${screen1ActiveSvc}`);
    const container = document.getElementById('screen1-services-container');
    if (activeEl && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      const relativeTop = elRect.top - containerRect.top + container.scrollTop;
      
      container.scrollTo({
        top: relativeTop - container.clientHeight / 2 + activeEl.clientHeight / 2,
        behavior: 'smooth'
      });
    }
  }, [screen1ActiveSvc]);


  const playSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  };

  const handleAction = () => {
    playSound();
    setShowServicesMenu(false);
    setShowCitiesMenu(false);
    onGetStarted();
  };

  const scrollToSection = (id) => {
    playSound();
    setShowServicesMenu(false);
    setShowCitiesMenu(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    { title: 'Hourly bookings', icon: '⏰' },
    { title: 'Bathroom Cleaning', icon: '🚽' },
    { title: 'Fridge Cleaning', icon: '🧊' },
    { title: 'Packing or Unpacking', icon: '📦' },
    { title: 'Utensils', icon: '🍽️' },
    { title: 'Kitchen Prep', icon: '🔪' },
    { title: 'Dusting & Wiping', icon: '🧽' },
    { title: 'Sweeping & Mopping', icon: '🧹' },
    { title: 'Pre-Party Express Clean', icon: '🥂' },
    { title: 'Complete Wardrobe Cleaning', icon: '👔' },
    { title: 'After-Party Express Clean', icon: '🥤' },
    { title: 'Ironing & Folding', icon: '💨' },
    { title: 'Window Cleaning', icon: '🪟' },
    { title: 'Laundry', icon: '🧺' },
    { title: 'Kitchen Cleaning', icon: '🍳' },
    { title: 'Balcony Cleaning', icon: '🪴' },
    { title: 'Fan Cleaning', icon: '🌀' },
    { title: 'Kitchen Cabinet Cleaning', icon: '🗄️' },
    { title: 'Plant Care', icon: '🌸' },
    { title: 'Car Surface Cleaning', icon: '🚗' },
  ];

  const citiesList = [
    { name: 'Bengaluru', stats: '4,200+ Pros Live', icon: '🏰' },
    { name: 'Delhi', stats: '3,800+ Pros Live', icon: '🏛️' },
    { name: 'Noida', stats: '1,900+ Pros Live', icon: '🏢' },
    { name: 'Gurgaon', stats: '2,500+ Pros Live', icon: '🏙️' },
    { name: 'Mumbai', stats: '3,100+ Pros Live', icon: '🌉' },
    { name: 'Pune', stats: '1,800+ Pros Live', icon: '⛰️' },
    { name: 'Hyderabad', stats: '2,200+ Pros Live', icon: '🕌' }
  ];

  const faqs = [
    {
      q: 'How do you verify the domestic professionals?',
      a: 'All partners undergo physical background checks, government ID validation, and local police verification. In addition, providers perform a real-time face-matching check-in at your doorstep using our AI system before starting any task.'
    },
    {
      q: 'Can I request the same professional every time?',
      a: 'Yes! Our "My Regulars" Preferred Team engine allows you to save your favorite professionals to your team list, ensuring you can book the same trusted provider directly in one click.'
    },
    {
      q: 'What if I am not satisfied with the clean?',
      a: 'Every chore booked is backed by our 100% Satisfaction Insurance. If you are not satisfied with the quality of service, we will immediately send another provider to re-clean for free or issue a full refund.'
    },
    {
      q: 'How does the wallet refund system work?',
      a: 'If you cancel or modify a scheduled booking, the full booking balance is instantly credited back to your secure NestMate Wallet. You can use this balance for any future services or top it up at any time.'
    }
  ];

  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans w-full flex flex-col justify-between selection:bg-blue-500/20 relative overflow-x-hidden">
      
      {/* Click overlay to close dropdowns */}
      {(showServicesMenu || showCitiesMenu) && (
        <div className="fixed inset-0 z-40 bg-black/5" onClick={() => { setShowServicesMenu(false); setShowCitiesMenu(false); }}></div>
      )}

      {/* Header Navigation */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-[#2563eb] tracking-tight">NestMate</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#why" onClick={(e) => { e.preventDefault(); handleAction(); }} className="hover:text-slate-900 transition-colors">Why us</a>
            
            {/* Services Dropdown Trigger */}
            <div className="relative">
              <button 
                onClick={() => { playSound(); setShowCitiesMenu(false); setShowServicesMenu(!showServicesMenu); }}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors focus:outline-none"
              >
                <span>Services</span>
                <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${showServicesMenu ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
              </button>

              {/* Services Dropdown Card */}
              {showServicesMenu && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] bg-white border border-slate-200/60 rounded-3xl shadow-2xl z-50 overflow-hidden animate-scaleIn">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-6 text-left">
                    {services.map((svc) => (
                      <button
                        key={svc.title}
                        onClick={handleAction}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors w-full text-left group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shadow-inner group-hover:scale-110 transition-transform">
                          {svc.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#2563eb] transition-colors">{svc.title}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Dropdown Footer */}
                  <div className="border-t border-slate-100 bg-slate-50/50 p-4 px-6 flex justify-start">
                    <button 
                      onClick={handleAction}
                      className="text-[#2563eb] hover:text-[#1d4ed8] font-black text-xs uppercase tracking-wider flex items-center gap-1"
                    >
                      <span>View all services</span>
                      <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cities Dropdown Trigger */}
            <div className="relative">
              <button 
                onClick={() => { playSound(); setShowServicesMenu(false); setShowCitiesMenu(!showCitiesMenu); }}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors focus:outline-none"
              >
                <span>Cities</span>
                <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${showCitiesMenu ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
              </button>

              {/* Cities Dropdown Card */}
              {showCitiesMenu && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[280px] bg-white border border-slate-200/60 rounded-3xl shadow-2xl z-50 overflow-hidden animate-scaleIn">
                  <div className="flex flex-col gap-1 p-4 text-left">
                    {citiesList.map((city) => (
                      <button
                        key={city.name}
                        onClick={handleAction}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors w-full text-left group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-base shadow-inner group-hover:scale-110 transition-transform">
                          {city.icon}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-slate-800 group-hover:text-[#2563eb] transition-colors">{city.name}</span>
                          <span className="text-[9px] font-bold text-slate-400">{city.stats}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#faqs" onClick={(e) => { e.preventDefault(); scrollToSection('faqs'); }} className="hover:text-slate-900 transition-colors">FAQs</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleAction}
              className="hidden sm:inline-block text-sm font-bold text-slate-700 hover:text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-lg transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={handleAction}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all transform active:scale-95"
            >
              Book Now
            </button>
            
            {/* Hamburger Button */}
            <button
              onClick={() => { playSound(); setShowMobileDrawer(!showMobileDrawer); }}
              className="md:hidden flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {showMobileDrawer ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {showMobileDrawer && (
        <div className="fixed inset-x-0 top-20 bottom-0 bg-white z-40 md:hidden flex flex-col justify-between border-t border-slate-100 animate-scaleIn overflow-y-auto">
          <div className="p-6 space-y-6">
            <nav className="flex flex-col gap-6 text-sm font-semibold text-slate-600">
              <a 
                href="#why" 
                onClick={(e) => { e.preventDefault(); setShowMobileDrawer(false); handleAction(); }} 
                className="hover:text-slate-900 transition-colors"
              >
                Why us
              </a>
              
              {/* Mobile Services Accordion */}
              <div className="space-y-2">
                <button
                  onClick={() => { playSound(); setShowMobileServices(!showMobileServices); }}
                  className="flex items-center justify-between w-full hover:text-slate-900 transition-colors text-left font-semibold text-sm"
                >
                  <span>Services</span>
                  <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${showMobileServices ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
                </button>
                {showMobileServices && (
                  <div className="pl-4 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pt-2">
                    {services.map((svc) => (
                      <button
                        key={svc.title}
                        onClick={() => { setShowMobileDrawer(false); handleAction(); }}
                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors w-full text-left"
                      >
                        <span className="text-sm">{svc.icon}</span>
                        <span className="text-[10px] font-bold text-slate-800">{svc.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Cities Accordion */}
              <div className="space-y-2">
                <button
                  onClick={() => { playSound(); setShowMobileCities(!showMobileCities); }}
                  className="flex items-center justify-between w-full hover:text-slate-900 transition-colors text-left font-semibold text-sm"
                >
                  <span>Cities</span>
                  <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${showMobileCities ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
                </button>
                {showMobileCities && (
                  <div className="pl-4 flex flex-col gap-2 pt-2">
                    {citiesList.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => { setShowMobileDrawer(false); handleAction(); }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors w-full text-left"
                      >
                        <span className="text-sm">{city.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-800">{city.name}</span>
                          <span className="text-[8px] font-bold text-slate-400">{city.stats}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a 
                href="#how-it-works" 
                onClick={(e) => { e.preventDefault(); setShowMobileDrawer(false); scrollToSection('how-it-works'); }} 
                className="hover:text-slate-900 transition-colors"
              >
                How it works
              </a>
              
              <a 
                href="#faqs" 
                onClick={(e) => { e.preventDefault(); setShowMobileDrawer(false); scrollToSection('faqs'); }} 
                className="hover:text-slate-900 transition-colors"
              >
                FAQs
              </a>
            </nav>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
            <button 
              onClick={() => { setShowMobileDrawer(false); handleAction(); }}
              className="w-full text-center font-bold text-sm text-slate-700 hover:text-slate-900 py-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setShowMobileDrawer(false); handleAction(); }}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 w-full py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12 text-left relative z-10">
        
        {/* Left Column - Copy & CTA */}
        <div className="flex-1 space-y-6 max-w-xl">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/50 text-[10px] font-bold text-[#107043] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full animate-pulse"></span>
            Trusted by 500,000+ homes · 11 cities live
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Trusted house help <br className="hidden sm:inline" /> in minutes!
          </h1>

          {/* Subheading */}
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-md">
            Your home, professionally cleaned - exactly when you need it.
          </p>

          {/* Request CTA Button */}
          <div className="pt-2">
            <button 
              onClick={handleAction}
              className="group inline-flex items-center gap-2 text-[#107043] hover:text-[#0c5030] font-black text-xs uppercase tracking-wider transition-colors"
            >
              <span>Request NestMate in your locality</span>
              <span className="material-symbols-outlined text-sm font-black transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>

          {/* App Badges */}
          <div className="flex items-center gap-4 pt-4">
            <a 
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 hover:opacity-90 active:scale-95 transition-all inline-block"
              title="Get it on Google Play"
            >
              <svg className="h-full" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="135" height="40" rx="6" fill="black"/>
                <path d="M20.5 13.5L25.3 20L20.5 26.5V13.5Z" fill="white"/>
                <path d="M28.5 20L20.5 13.5V26.5L28.5 20Z" fill="white" fillOpacity="0.3"/>
                <path d="M20.5 13.5L14.5 10.5V29.5L20.5 26.5V13.5Z" fill="white" fillOpacity="0.5"/>
                <path d="M25.3 20L20.5 13.5V26.5L25.3 20Z" fill="white" fillOpacity="0.7"/>
                <text x="36" y="18" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.05em">GET IT ON</text>
                <text x="36" y="30" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Google Play</text>
              </svg>
            </a>

            <a 
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 hover:opacity-90 active:scale-95 transition-all inline-block"
              title="Download on the App Store"
            >
              <svg className="h-full" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="135" height="40" rx="6" fill="black"/>
                <path d="M21 16.5C21 14.5 22.5 13.5 22.6 13.4C21.7 12 20.2 11.8 19.7 11.8C18.4 11.6 17.1 12.5 16.4 12.5C15.7 12.5 14.7 11.8 13.6 11.8C12.2 11.8 10.9 12.6 10.2 13.8C8.7 16.3 9.9 20 11.3 22.1C12 23.1 12.8 24.2 13.9 24.1C14.9 24.1 15.3 23.4 16.5 23.4C17.7 23.4 18.1 24.1 19.1 24.1C20.2 24.1 20.9 23.1 21.6 22.1C22.4 20.9 22.7 19.8 22.7 19.7C22.7 19.7 21 19 21 16.5ZM18.5 9.8C19 9.1 19.4 8.2 19.3 7.3C18.5 7.3 17.5 7.8 17 8.5C16.5 9.1 16.1 10.1 16.3 10.9C17.1 11 18 10.5 18.5 9.8Z" fill="white"/>
                <text x="36" y="18" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.05em">Download on the</text>
                <text x="36" y="30" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">App Store</text>
              </svg>
            </a>
          </div>

          {/* Ratings Row */}
          <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-0.5 text-amber-500">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
            </div>
            <span><strong className="text-slate-800 font-bold">4.5</strong> from 42,700+ ratings</span>
          </div>

          {/* Live In Cities list */}
          <div className="pt-4 space-y-2.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Live In</span>
            <div className="flex flex-wrap gap-2 max-w-md">
              {['Bengaluru', 'Delhi', 'Noida', 'Gurgaon', 'Mumbai', 'Pune', 'Hyderabad'].map(city => (
                <button 
                  key={city}
                  onClick={handleAction}
                  className="px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors"
                >
                  {city}
                </button>
              ))}
              <button 
                onClick={handleAction}
                className="px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#107043] font-bold text-xs flex items-center gap-0.5 transition-colors"
              >
                <span>+ 4 more cities</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Housekeeper Portrait */}
        <div className="flex-1 w-full max-w-md md:max-w-xl relative flex justify-center">
          <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/5] rounded-[40px] overflow-hidden bg-gradient-to-br from-blue-50/50 via-blue-100/30 to-transparent flex items-end">
            {/* Visual glow backdrop */}
            <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-[#2563eb]/10 rounded-full blur-[80px]"></div>
            
            <img 
              alt="NestMate Certified Professional" 
              src="/nestmate_housekeeper.png"
              className="w-full h-full object-cover object-bottom relative z-10 select-none animate-fadeIn"
              loading="eager"
            />
          </div>
        </div>

      </main>

      {/* Featured In Publications Bar */}
      <div className="border-t border-b border-slate-100 bg-slate-50/50 py-8 w-full overflow-hidden relative">
        {/* Fading overlay gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

        <div className="w-full space-y-4">
          <div className="mx-auto max-w-7xl px-5 md:px-8 mb-2 text-center">
            <span className="inline-block text-[15px] font-semibold text-[#2563eb] uppercase tracking-wider mb-1" style={{ letterSpacing: '0.14em' }}>
              Featured in
            </span>
          </div>
          <div className="w-full overflow-hidden flex marquee">
            <div className="marquee-track flex gap-16 items-center transition-all duration-300" style={{ animation: 'marquee-left 25s linear infinite' }}>
              <a href="https://techcrunch.com" target="_blank" rel="noopener noreferrer" aria-label="TechCrunch" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/techcrunch.svg" alt="TechCrunch" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://www.bloomberg.com" target="_blank" rel="noopener noreferrer" aria-label="Bloomberg" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/bloomberg.svg" alt="Bloomberg" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://www.reuters.com" target="_blank" rel="noopener noreferrer" aria-label="Reuters" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/reuters.svg" alt="Reuters" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://www.business-standard.com" target="_blank" rel="noopener noreferrer" aria-label="Business Standard" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/business-standard.svg" alt="Business Standard" className="max-h-12 w-auto object-contain" />
              </a>
              <a href="https://economictimes.indiatimes.com" target="_blank" rel="noopener noreferrer" aria-label="Economic Times" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/economic-times.svg" alt="Economic Times" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://www.indiatoday.in" target="_blank" rel="noopener noreferrer" aria-label="India Today" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/india-today.svg" alt="India Today" className="max-h-7 w-auto object-contain" />
              </a>
              <a href="https://yourstory.com" target="_blank" rel="noopener noreferrer" aria-label="YourStory" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/yourstory.svg" alt="YourStory" className="max-h-7 w-auto object-contain" />
              </a>
              <a href="https://inc42.com" target="_blank" rel="noopener noreferrer" aria-label="Inc42" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/inc42.svg" alt="Inc42" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://entrackr.com" target="_blank" rel="noopener noreferrer" aria-label="Entrackr" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/entrackr.svg" alt="Entrackr" className="max-h-9 w-auto object-contain" />
              </a>

              {/* Duplicate track to make it infinite loop scroll */}
              <a href="https://techcrunch.com" target="_blank" rel="noopener noreferrer" aria-label="TechCrunch" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/techcrunch.svg" alt="TechCrunch" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://www.bloomberg.com" target="_blank" rel="noopener noreferrer" aria-label="Bloomberg" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/bloomberg.svg" alt="Bloomberg" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://www.reuters.com" target="_blank" rel="noopener noreferrer" aria-label="Reuters" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/reuters.svg" alt="Reuters" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://www.business-standard.com" target="_blank" rel="noopener noreferrer" aria-label="Business Standard" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/business-standard.svg" alt="Business Standard" className="max-h-12 w-auto object-contain" />
              </a>
              <a href="https://economictimes.indiatimes.com" target="_blank" rel="noopener noreferrer" aria-label="Economic Times" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/economic-times.svg" alt="Economic Times" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://www.indiatoday.in" target="_blank" rel="noopener noreferrer" aria-label="India Today" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/india-today.svg" alt="India Today" className="max-h-7 w-auto object-contain" />
              </a>
              <a href="https://yourstory.com" target="_blank" rel="noopener noreferrer" aria-label="YourStory" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/yourstory.svg" alt="YourStory" className="max-h-7 w-auto object-contain" />
              </a>
              <a href="https://inc42.com" target="_blank" rel="noopener noreferrer" aria-label="Inc42" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/inc42.svg" alt="Inc42" className="max-h-9 w-auto object-contain" />
              </a>
              <a href="https://entrackr.com" target="_blank" rel="noopener noreferrer" aria-label="Entrackr" aria-hidden="true" className="shrink-0 h-14 px-6 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img src="/press/entrackr.svg" alt="Entrackr" className="max-h-9 w-auto object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <section id="why" className="py-20 md:py-24 bg-white w-full border-b border-slate-100 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="inline-block text-[15px] font-semibold text-[#2563eb] uppercase tracking-widest" style={{ letterSpacing: '0.14em' }}>
                Why us?
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                No more planning around your house help.
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                Our team of verified NestMate Professionals are always on time. We handle all the scheduling details so you can focus on what matters.
              </p>
              <div className="pt-2">
                <button 
                  onClick={handleAction}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all flex items-center gap-2"
                >
                  <span>Experience NestMate</span>
                  <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Right side stats grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { value: '500,000+', label: 'Homes that trust us', icon: 'home', bg: 'bg-blue-50 text-[#2563eb]' },
                { value: '1,000,000+', label: 'Hours saved', icon: 'hourglass_empty', bg: 'bg-sky-50 text-sky-600' },
                { value: '10,000+', label: 'NestMate Professionals', icon: 'badge', bg: 'bg-blue-50 text-blue-600' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50/70 border border-slate-100 p-8 rounded-3xl text-left space-y-4 hover:bg-slate-50 transition-colors shadow-sm group">
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-20 md:py-24 bg-slate-50/50 w-full border-b border-slate-100 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl mb-14 text-left">
            <span className="inline-block text-[15px] font-semibold text-[#2563eb] uppercase mb-2 tracking-widest" style={{ letterSpacing: '0.14em' }}>
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Book trusted house help.
            </h2>
            <p className="mt-4 text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
              From hourly bookings to express cleans to daily upkeep, NestMate's got you covered. 20 services, transparent flat pricing.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {services.map((svc, idx) => (
              <button
                key={idx}
                onClick={handleAction}
                className="bg-white border border-slate-200/60 p-5 rounded-2xl flex flex-col justify-between text-left h-[150px] shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-slate-300 transition-all group relative overflow-hidden"
              >
                {/* 3D-like container for emoji illustration */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-all select-none">
                  {svc.icon}
                </div>

                <div className="w-full flex justify-between items-end mt-4">
                  <span className="text-[11px] font-bold text-slate-800 leading-tight pr-4 group-hover:text-[#2563eb] transition-colors">
                    {svc.title}
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-slate-400 font-bold group-hover:text-[#2563eb] group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 bg-[#0b0f19] w-full scroll-mt-20 border-b border-slate-900">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl mb-14 text-left">
            <span className="inline-block text-[15px] font-semibold text-[#2563eb] uppercase mb-3 tracking-widest" style={{ letterSpacing: '0.14em' }}>
              How it works
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Simple steps to a cleaner home.</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-xl">Follow these simple steps to get house help in 15 minutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* STEP 1 */}
            <div className="relative">
              {/* Blue card wrapping container with dots */}
              <div 
                className="relative overflow-hidden rounded-3xl mb-5 flex justify-center items-end shadow-2xl shadow-blue-950/40" 
                style={{ 
                  aspectRatio: '3 / 4',
                  backgroundColor: '#2563eb',
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.20) 1.25px, transparent 1.5px)',
                  backgroundSize: '18px 18px',
                  backgroundPosition: '0 0'
                }}
              >
                {/* 3D-like Phone Frame Container */}
                <div className="absolute left-1/2 -translate-x-1/2 top-7 w-[76%] max-w-[280px] aspect-[1486/3033]">
                  {/* Left Side Buttons */}
                  <div className="absolute -left-[11px] top-20 w-[3px] h-9 bg-slate-800 rounded-l-md border border-slate-950 z-40"></div>
                  <div className="absolute -left-[11px] top-32 w-[3px] h-9 bg-slate-800 rounded-l-md border border-slate-950 z-40"></div>
                  
                  {/* Right Side Buttons */}
                  <div className="absolute -right-[11px] top-24 w-[3px] h-14 bg-slate-800 rounded-r-md border border-slate-950 z-40"></div>

                  {/* Main Smartphone Shell */}
                  <div className="relative w-full h-full rounded-[42px] border-[7px] border-slate-800 shadow-[inset_0_0_12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between z-10" style={{ backgroundColor: '#ffffff' }}>
                    
                    {/* Glass Glare Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.6] to-white/[0.2] pointer-events-none z-35 rounded-[36px]"></div>
                    {/* Screen Inner Bezel Line */}
                    <div className="absolute inset-0 border border-slate-200/60 rounded-[37px] pointer-events-none z-30"></div>

                    {/* Camera notch / Dynamic Island */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center gap-1.5 px-3">
                      <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                      <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                    </div>

                    {/* Status Bar */}
                    <div className="pt-6 px-4 flex justify-between items-center text-[9px] text-slate-800 z-25 font-semibold select-none">
                      <span>9:41</span>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>wifi</span>
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>signal_cellular_alt</span>
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>battery_5_bar</span>
                      </div>
                    </div>

                    {/* Screen Body */}
                    <div id="screen1-services-container" className="flex-1 px-3 pt-1.5 pb-2 overflow-y-auto hide-scrollbar flex flex-col justify-start">
                      {/* Location Header */}
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-0.5 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full text-[8px] font-bold text-slate-700">
                          <span className="material-symbols-outlined text-[9px] text-[#2563eb]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                          <span className="truncate max-w-[60px]">Indiranagar</span>
                          <span className="material-symbols-outlined text-[9px] text-slate-500">keyboard_arrow_down</span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[11px] text-slate-600">notifications</span>
                        </div>
                      </div>

                      {/* Welcome Greeting */}
                      <div className="mb-1.5 text-left">
                        <h4 className="text-[11px] font-extrabold text-slate-900">Hey there! 👋</h4>
                        <p className="text-[8px] text-slate-500">Book trusted household help in 15 mins</p>
                      </div>

                      {/* Search Bar with Typewriter Simulation */}
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1.5 rounded-xl mb-2 shadow-sm">
                        <span className="material-symbols-outlined text-[11px] text-slate-400">search</span>
                        <span className="text-[8px] text-slate-500 font-medium truncate flex-1 text-left">
                          {screen1Search || 'Search services...'}
                          <span className="animate-pulse text-[#2563eb] font-bold ml-0.5">|</span>
                        </span>
                      </div>

                      {/* Categories Badges */}
                      <div className="flex gap-1 mb-2 overflow-x-auto hide-scrollbar select-none">
                        <span className="shrink-0 bg-blue-50 text-[#2563eb] border border-blue-200 px-1.5 py-0.5 rounded-full text-[7px] font-bold">✨ Express Clean</span>
                        <span className="shrink-0 bg-slate-50 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded-full text-[7px] font-medium">⏰ Hourly Help</span>
                        <span className="shrink-0 bg-slate-50 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded-full text-[7px] font-medium">🧹 Deep Clean</span>
                      </div>

                      {/* Grid of NestMate services with Tap animations */}
                      <div className="grid grid-cols-2 gap-1.5 mb-1 flex-1">
                        {services.map((svc, i) => {
                          const isActive = screen1ActiveSvc === i;
                          // Short descriptions for each service
                          let desc = "Professional help";
                          if (svc.title.includes("Hourly")) desc = "From ₹199/hr";
                          else if (svc.title.includes("Bathroom")) desc = "Deep sanitation";
                          else if (svc.title.includes("Fridge")) desc = "Odor removal";
                          else if (svc.title.includes("Packing")) desc = "Secure packing";
                          else if (svc.title.includes("Utensils")) desc = "Sink cleared";
                          else if (svc.title.includes("Kitchen Prep")) desc = "Chopping help";
                          else if (svc.title.includes("Dusting")) desc = "Dust-free rooms";
                          else if (svc.title.includes("Sweeping")) desc = "Sparkling floors";
                          else if (svc.title.includes("Pre-Party")) desc = "Quick setup";
                          else if (svc.title.includes("Wardrobe")) desc = "Neat sorting";
                          else if (svc.title.includes("After-Party")) desc = "Cleanup help";
                          else if (svc.title.includes("Ironing")) desc = "Wrinkle-free";
                          else if (svc.title.includes("Window")) desc = "Crystal clear";
                          else if (svc.title.includes("Laundry")) desc = "Fresh wash";
                          else if (svc.title.includes("Kitchen Cleaning")) desc = "Degreased stove";
                          else if (svc.title.includes("Balcony")) desc = "Dirt removed";
                          else if (svc.title.includes("Fan")) desc = "Blades scrubbed";
                          else if (svc.title.includes("Cabinet")) desc = "Wiped clean";
                          else if (svc.title.includes("Plant")) desc = "Watering help";
                          else if (svc.title.includes("Car")) desc = "Shining finish";

                          return (
                            <div 
                              id={`screen1-svc-${i}`}
                              key={i} 
                              className={`p-1.5 rounded-xl border relative flex flex-col justify-between text-left h-[48px] select-none transition-all duration-500 ${
                                isActive 
                                  ? 'border-[#2563eb] bg-blue-50 scale-[1.04] shadow-[0_0_10px_rgba(37,99,235,0.2)]' 
                                  : 'border-slate-100 bg-white shadow-sm'
                              }`}
                            >
                              {/* Pulsing Tap Indicator Ripple */}
                              {isActive && (
                                <div className="absolute inset-0 bg-[#2563eb]/5 rounded-xl flex items-center justify-center pointer-events-none">
                                  <div className="w-5 h-5 bg-[#2563eb]/20 rounded-full animate-ping"></div>
                                </div>
                              )}
                              
                              <span className="text-[12px]">{svc.icon}</span>
                              <div>
                                <p className="text-[7.5px] font-extrabold text-slate-800 leading-none mb-0.5 truncate">{svc.title}</p>
                                <p className={`text-[5.5px] font-medium leading-none ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`}>{desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* App Bottom Bar */}
                    <div className="border-t border-slate-100 bg-white py-1.5 px-3 flex justify-between items-center select-none z-25 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
                      <div className="flex flex-col items-center text-[#2563eb]">
                        <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                        <span className="text-[5.5px] font-bold">Home</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-400">
                        <span className="material-symbols-outlined text-[13px]">history</span>
                        <span className="text-[5.5px] font-medium">Bookings</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-400">
                        <span className="material-symbols-outlined text-[13px]">account_balance_wallet</span>
                        <span className="text-[5.5px] font-medium">Wallet</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-400">
                        <span className="material-symbols-outlined text-[13px]">person</span>
                        <span className="text-[5.5px] font-medium">Profile</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-semibold text-[#2563eb] tracking-widest uppercase" style={{ letterSpacing: '0.15em' }}>STEP 1</span>
                <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
              <h3 className="!text-white text-xl font-bold mb-3">Pick from 20 trusted services</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Browse 20 services in the NestMate app - from hourly bookings to per-task jobs to express cleans.</p>
            </div>

            {/* STEP 2 */}
            <div className="relative">
              {/* Blue card wrapping container with dots */}
              <div 
                className="relative overflow-hidden rounded-3xl mb-5 flex justify-center items-end shadow-2xl shadow-blue-950/40" 
                style={{ 
                  aspectRatio: '3 / 4',
                  backgroundColor: '#2563eb',
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.20) 1.25px, transparent 1.5px)',
                  backgroundSize: '18px 18px',
                  backgroundPosition: '0 0'
                }}
              >
                {/* 3D-like Phone Frame Container */}
                <div className="absolute left-1/2 -translate-x-1/2 top-7 w-[76%] max-w-[280px] aspect-[1486/3033]">
                  {/* Left Side Buttons */}
                  <div className="absolute -left-[11px] top-20 w-[3px] h-9 bg-slate-800 rounded-l-md border border-slate-950 z-40"></div>
                  <div className="absolute -left-[11px] top-32 w-[3px] h-9 bg-slate-800 rounded-l-md border border-slate-950 z-40"></div>
                  
                  {/* Right Side Buttons */}
                  <div className="absolute -right-[11px] top-24 w-[3px] h-14 bg-slate-800 rounded-r-md border border-slate-950 z-40"></div>

                  {/* Main Smartphone Shell */}
                  <div className="relative w-full h-full rounded-[42px] border-[7px] border-slate-800 shadow-[inset_0_0_12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between z-10" style={{ backgroundColor: '#f8fafc' }}>
                    
                    {/* Glass Glare Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.5] to-white/[0.2] pointer-events-none z-35 rounded-[36px]"></div>
                    {/* Screen Inner Bezel Line */}
                    <div className="absolute inset-0 border border-slate-200/60 rounded-[37px] pointer-events-none z-30"></div>

                    {/* Camera notch / Dynamic Island */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center gap-1.5 px-3">
                      <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                      <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                    </div>

                    {/* Status Bar */}
                    <div className="pt-6 px-4 flex justify-between items-center text-[9px] text-slate-800 z-25 font-semibold select-none">
                      <span>9:42</span>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>wifi</span>
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>signal_cellular_alt</span>
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>battery_5_bar</span>
                      </div>
                    </div>

                    {/* Screen Body */}
                    <div className="flex-1 px-3 pt-1.5 pb-2 overflow-y-auto hide-scrollbar flex flex-col justify-start">
                      {/* Header */}
                      <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-slate-100">
                        <span className="material-symbols-outlined text-[12px] text-slate-700">arrow_back</span>
                        <span className="text-[10px] font-extrabold text-slate-900">Basket Checkout (2 items)</span>
                      </div>

                      {/* Items list */}
                      <div className="space-y-1.5 mb-2.5">
                        {/* Item 1 with Dynamic Quantity changes */}
                        <div className="bg-white border border-slate-100 shadow-sm p-2 rounded-xl flex justify-between items-start gap-1.5 transition-all duration-300">
                          <span className="text-[12px] p-1 bg-blue-50 rounded-lg">⏰</span>
                          <div className="flex-1 min-w-0 text-left">
                            <h5 className="text-[8.5px] font-bold text-slate-900 leading-tight">Hourly Cooking Help</h5>
                            <p className="text-[6.5px] text-slate-400 mt-0.5">{screen2Qty} Hours duration</p>
                            <p className="text-[6.5px] text-[#2563eb] font-semibold mt-0.5">✓ Chopping & prep included</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] font-extrabold text-slate-900 transition-all">₹{499 * screen2Qty}</span>
                            <div className="flex items-center gap-1 mt-1 bg-slate-100 border border-slate-200 px-1 py-0.5 rounded-lg text-[7.5px] text-slate-700 font-bold justify-center relative select-none">
                              <span className="text-slate-400">-</span>
                              <span className="w-2.5 text-center text-[#2563eb] scale-110 font-black">{screen2Qty}</span>
                              <span className="relative text-[#2563eb]">
                                +
                                {/* Tap click simulation indicator on addition */}
                                <div className="absolute -inset-1 rounded-full border border-blue-400/40 animate-ping pointer-events-none"></div>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Item 2 */}
                        <div className="bg-white border border-slate-100 shadow-sm p-2 rounded-xl flex justify-between items-start gap-1.5">
                          <span className="text-[12px] p-1 bg-blue-50 rounded-lg">🚽</span>
                          <div className="flex-1 min-w-0 text-left">
                            <h5 className="text-[8.5px] font-bold text-slate-900 leading-tight">Bathroom Cleaning</h5>
                            <p className="text-[6.5px] text-slate-400 mt-0.5">1 Toilet deep scrub</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] font-extrabold text-slate-900">₹299</span>
                            <div className="flex items-center gap-1 mt-1 bg-slate-100 border border-slate-200 px-1 py-0.5 rounded-lg text-[7.5px] text-slate-700 font-bold justify-center">
                              <span className="text-slate-400">-</span>
                              <span>1</span>
                              <span className="text-slate-400">+</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Coupon discount applied */}
                      <div className="bg-green-50 border border-green-200 p-1.5 rounded-lg flex justify-between items-center mb-2.5 select-none">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px] text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>percent</span>
                          <span className="text-[7.5px] font-bold text-green-700">Bundle Discount Applied</span>
                        </div>
                        <span className="text-[7.5px] font-black text-green-600">-₹100</span>
                      </div>

                      {/* Bill details with responsive pricing changes */}
                      <div className="border-t border-slate-100 pt-1.5 space-y-0.5 text-left mb-1.5">
                        <div className="flex justify-between text-[7px] text-slate-500">
                          <span>Basket Subtotal</span>
                          <span className="font-semibold text-slate-700 transition-all">₹{499 * screen2Qty + 299}</span>
                        </div>
                        <div className="flex justify-between text-[7px] text-slate-500">
                          <span>Convenience Fee</span>
                          <span className="text-slate-700">₹0</span>
                        </div>
                        <div className="flex justify-between text-[8.5px] font-black text-slate-900 pt-1 border-t border-slate-100">
                          <span>Total Amount</span>
                          <span className="text-[#2563eb] scale-105 font-black transition-all">₹{499 * screen2Qty + 199}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Proceed Button */}
                    <div className="border-t border-slate-100 bg-white p-2.5 z-20 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
                      <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-[8.5px] py-1.5 rounded-xl flex items-center justify-center gap-0.5 shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
                        <span>Proceed to Schedule</span>
                        <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-semibold text-[#2563eb] tracking-widest uppercase" style={{ letterSpacing: '0.15em' }}>STEP 2</span>
                <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
              <h3 className="!text-white text-xl font-bold mb-3">Add it to your cart</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Stack multiple tasks into one booking. Your Pro handles them all in a single visit.</p>
            </div>

            {/* STEP 3 */}
            <div className="relative">
              {/* Blue card wrapping container with dots */}
              <div 
                className="relative overflow-hidden rounded-3xl mb-5 flex justify-center items-end shadow-2xl shadow-blue-950/40" 
                style={{ 
                  aspectRatio: '3 / 4',
                  backgroundColor: '#2563eb',
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.20) 1.25px, transparent 1.5px)',
                  backgroundSize: '18px 18px',
                  backgroundPosition: '0 0'
                }}
              >
                {/* 3D-like Phone Frame Container */}
                <div className="absolute left-1/2 -translate-x-1/2 top-7 w-[76%] max-w-[280px] aspect-[1486/3033]">
                  {/* Left Side Buttons */}
                  <div className="absolute -left-[11px] top-20 w-[3px] h-9 bg-slate-800 rounded-l-md border border-slate-950 z-40"></div>
                  <div className="absolute -left-[11px] top-32 w-[3px] h-9 bg-slate-800 rounded-l-md border border-slate-950 z-40"></div>
                  
                  {/* Right Side Buttons */}
                  <div className="absolute -right-[11px] top-24 w-[3px] h-14 bg-slate-800 rounded-r-md border border-slate-950 z-40"></div>

                  {/* Main Smartphone Shell */}
                  <div className="relative w-full h-full rounded-[42px] border-[7px] border-slate-800 shadow-[inset_0_0_12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between z-10" style={{ backgroundColor: '#f8fafc' }}>
                    
                    {/* Glass Glare Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.5] to-white/[0.2] pointer-events-none z-35 rounded-[36px]"></div>
                    {/* Screen Inner Bezel Line */}
                    <div className="absolute inset-0 border border-slate-200/60 rounded-[37px] pointer-events-none z-30"></div>

                    {/* Camera notch / Dynamic Island */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center gap-1.5 px-3">
                      <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                      <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                    </div>

                    {/* Status Bar */}
                    <div className="pt-6 px-4 flex justify-between items-center text-[9px] text-slate-800 z-25 font-semibold select-none">
                      <span>9:43</span>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>wifi</span>
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>signal_cellular_alt</span>
                        <span className="material-symbols-outlined text-[10px] text-slate-700" style={{ fontVariationSettings: "'FILL' 1" }}>battery_5_bar</span>
                      </div>
                    </div>

                    {/* Screen Body */}
                    <div className="flex-1 px-3 pt-1.5 pb-2 overflow-y-auto hide-scrollbar flex flex-col justify-start relative">
                      
                      {/* Simulation Overlay Modal for Payment Processing */}
                      {screen3Step === 1 && (
                        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-40 transition-opacity duration-300">
                          <span className="material-symbols-outlined text-4xl text-[#2563eb] animate-spin mb-2.5">
                            progress_activity
                          </span>
                          <p className="text-[10px] font-bold text-slate-900">Securing connection...</p>
                          <p className="text-[7px] text-slate-500 mt-1">Paying remaining ₹198</p>
                        </div>
                      )}

                      {/* Simulation Overlay Modal for Success Confirmation */}
                      {screen3Step === 2 && (
                        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-45 transition-all duration-500 p-4">
                          {/* Floating Success Confetti */}
                          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                            <div className="absolute w-1 h-1 bg-yellow-400 rounded-full top-10 left-8 animate-ping"></div>
                            <div className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full top-24 right-10 animate-bounce"></div>
                            <div className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full top-36 left-20 animate-pulse"></div>
                            <div className="absolute w-1.5 h-1.5 bg-[#2563eb] rounded-full top-8 right-16 animate-ping"></div>
                          </div>

                          <div className="w-11 h-11 bg-blue-50 border-2 border-[#2563eb] rounded-full flex items-center justify-center shadow-lg shadow-blue-200 animate-bounce mb-3">
                            <span className="material-symbols-outlined text-xl text-[#2563eb] font-black">
                              check
                            </span>
                          </div>
                          
                          <h4 className="text-[10.5px] font-extrabold text-slate-900 text-center leading-tight">Booking Confirmed! 🎉</h4>
                          <p className="text-[7.5px] text-slate-500 text-center mt-1 leading-normal">Your NestMate Professional is scheduled.</p>
                          
                          {/* Summary Voucher */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 mt-3 w-full text-left space-y-1">
                            <div className="flex justify-between text-[6.5px] text-slate-500">
                              <span>Transaction ID</span>
                              <span className="font-bold text-slate-900">#NMT-9018A</span>
                            </div>
                            <div className="flex justify-between text-[6.5px] text-slate-500">
                              <span>Assigned Slot</span>
                              <span className="font-bold text-[#2563eb]">Today, 4:00 PM</span>
                            </div>
                            <div className="flex justify-between text-[6.5px] text-slate-500">
                              <span>Total Paid</span>
                              <span className="font-bold text-slate-900">₹698 (Wallet + UPI)</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-slate-100">
                        <span className="material-symbols-outlined text-[12px] text-slate-700">arrow_back</span>
                        <span className="text-[10px] font-extrabold text-slate-900">Select Slot & Pay</span>
                      </div>

                      {/* Mode tab selector with active states */}
                      <div className="grid grid-cols-3 gap-0.5 bg-slate-100 p-0.5 rounded-xl mb-2.5 border border-slate-200 select-none text-center">
                        <div className={`text-[6px] font-bold py-1 rounded-lg transition-all duration-300 ${screen3Tab === 0 ? 'text-white bg-[#2563eb] shadow-sm' : 'text-slate-500'}`}>Instant</div>
                        <div className={`text-[6px] font-bold py-1 rounded-lg transition-all duration-300 ${screen3Tab === 1 ? 'text-white bg-[#2563eb] shadow-sm' : 'text-slate-500'}`}>Schedule</div>
                        <div className={`text-[6px] font-bold py-1 rounded-lg transition-all duration-300 ${screen3Tab === 2 ? 'text-white bg-[#2563eb] shadow-sm' : 'text-slate-500'}`}>Recurring</div>
                      </div>

                      {/* Selected slot according to simulated active tab */}
                      <div className="bg-white border border-slate-100 shadow-sm p-2 rounded-xl text-left mb-2.5 transition-all duration-500">
                        <span className="text-[6.5px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Chosen Time Window</span>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[11px] text-[#2563eb]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                            <div className="transition-all duration-300">
                              {screen3Tab === 0 && (
                                <>
                                  <p className="text-[8px] font-extrabold text-slate-900">Instant Booking</p>
                                  <p className="text-[6px] text-[#2563eb] font-bold">Arriving in 15 minutes</p>
                                </>
                              )}
                              {screen3Tab === 1 && (
                                <>
                                  <p className="text-[8px] font-extrabold text-slate-900">Today, 15 June</p>
                                  <p className="text-[6px] text-slate-500">4:00 PM - 6:00 PM slot</p>
                                </>
                              )}
                              {screen3Tab === 2 && (
                                <>
                                  <p className="text-[8px] font-extrabold text-slate-900">Recurring Setup</p>
                                  <p className="text-[6px] text-slate-500">Daily, Monday to Friday</p>
                                </>
                              )}
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-[9px] text-slate-400">edit</span>
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="text-left mb-1.5 flex-1">
                        <span className="text-[6.5px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Payment Options</span>
                        
                        {/* Option 1: Wallet */}
                        <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-xl flex justify-between items-center mb-1 select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[11px] text-[#2563eb]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                            <div>
                              <p className="text-[7.5px] font-bold text-slate-900">NestMate Wallet</p>
                              <p className="text-[5.5px] text-[#2563eb] font-bold">Balance: ₹500 (Applied)</p>
                            </div>
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full border-2 border-[#2563eb] flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-full"></div>
                          </div>
                        </div>

                        {/* Option 2: Card / UPI */}
                        <div className="bg-white border border-slate-100 shadow-sm p-1.5 rounded-xl flex justify-between items-center select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[11px] text-slate-400">credit_card</span>
                            <div>
                              <p className="text-[7.5px] font-bold text-slate-700">UPI / Debit Card</p>
                              <p className="text-[5.5px] text-slate-400">Pay remaining ₹198</p>
                            </div>
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-300"></div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Checkout Action (Default state 0) */}
                    <div className="border-t border-slate-100 bg-white p-2.5 z-20 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
                      <button className={`w-full text-white font-black text-[8.5px] py-1.5 rounded-xl flex items-center justify-center gap-0.5 shadow-lg active:scale-95 transition-all duration-300 ${screen3Step === 2 ? 'bg-green-500 shadow-green-200' : 'bg-[#2563eb] shadow-blue-200 hover:bg-[#1d4ed8]'}`}>
                        <span className="material-symbols-outlined text-[9px]">{screen3Step === 2 ? 'check' : 'lock'}</span>
                        <span>{screen3Step === 1 ? 'Securing Connection...' : screen3Step === 2 ? 'Booking Complete!' : 'Pay & Book (₹698)'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-semibold text-[#2563eb] tracking-widest uppercase" style={{ letterSpacing: '0.15em' }}>STEP 3</span>
                <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
              </div>
              <h3 className="!text-white text-xl font-bold mb-3">Choose instant, scheduled, or recurring. Pay &amp; done!</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Get a Pro in minutes, book for later, or set up a recurring slot.</p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs Accordion Section */}
      <section id="faqs" className="border-t border-slate-100 bg-slate-50/30 py-16 md:py-24 w-full scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12 text-left">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm md:text-base">Everything you need to know about our premium services.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50/50 via-blue-100/20 to-transparent flex items-center justify-center p-6 border border-slate-100">
                {/* Visual glow backdrop to match premium style */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/10 via-transparent to-blue-50/10"></div>
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-[#2563eb]/5 rounded-full blur-[60px]"></div>
                
                <img 
                  alt="Frequently Asked Questions Illustration" 
                  src="/faq_illustration.png"
                  className="w-full h-auto object-contain relative z-10 max-h-[320px] transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column - Accordion List */}
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <button
                      onClick={() => { playSound(); setActiveFaq(isOpen ? null : idx); }}
                      className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none group"
                    >
                      <span className="font-bold text-slate-800 text-sm md:text-base group-hover:text-[#2563eb] transition-colors">{faq.q}</span>
                      <span className={`material-symbols-outlined text-slate-400 group-hover:text-[#2563eb] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        keyboard_arrow_down
                      </span>
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 overflow-hidden ${
                        isOpen ? 'max-h-40 border-t border-slate-100' : 'max-h-0'
                      }`}
                    >
                      <div className="p-6 text-xs md:text-sm text-slate-500 leading-relaxed bg-slate-50/30">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-slate-100 bg-slate-50/30 py-8 w-full text-center">
        <p className="text-[10px] font-bold text-slate-400">
          © {new Date().getFullYear()} NestMate Technologies Private Limited. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
