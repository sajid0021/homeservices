import React, { useState } from 'react';

export default function AcDeepCleanView({ onBack, onSelectPackage }) {
  const [acType, setAcType] = useState('split'); // 'split' | 'window'

  // Adjust price slightly based on type
  const basePrice = acType === 'split' ? 599 : 499;
  const premiumPrice = acType === 'split' ? 949 : 799;

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-sans antialiased overflow-x-hidden min-h-screen pb-32">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#c7c5d4]/30 shadow-sm h-16 flex items-center">
        <div className="flex justify-between items-center px-6 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 active:scale-95 duration-200 transition-colors hover:bg-slate-100 rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[#15157d]">arrow_back</span>
            </button>
            <span className="text-lg font-black text-[#15157d]">NestMate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined p-2 text-[#15157d] cursor-pointer">search</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c7c5d4]/40">
              <img 
                alt="User Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCOLVqVkKR-7vEu_58BgkXHcyvdNrhMS1WLBE9akGUSmJVOyT1JhOAs3Sl8XOUXn2yf5uL5QZLvmOq8Qk8NHiQjfzhAWLGZxkJCDYw5OEiobX3NB7BFDzBlOjPMzUtI_lJWnrxQQnGaPMXZdk4I5lMnL2deLcWtmJWclTyKNE38NIX22Df8ReRyapp2qp1xfYCDnK_Ads9TAwbWKiauRBFxRPgbEcfyWzS3tJKVYiPA6SSavCps2ff5LDydhJdA2u5y9D1QgNmPn8R"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="mt-16 w-full max-w-7xl mx-auto px-6 md:px-20 text-left">
        {/* Hero Section */}
        <section className="pt-8 pb-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 relative group overflow-hidden rounded-2xl h-[300px] md:h-[400px] shadow-md">
            <img 
              alt="AC Technician" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXu-CXgHxBIsJkZL-vI3bznDkByIHU_lAk1mBXz7LcjfZ9JxlcGNqPokJ6GqnZ_pvBjjYY5FcCiBXAp0w1fJWVia00FHTlpaLCnqVb7eboYHPQY2TrPERXZqY8tr1uqQFO9MilJ_bveDt0UwyiBWGYbM2OyEJSGw_4GJ8nSvzGAgDFcvJGcI0tZQOMy_VVGwhux4N2OL8yhYBOxn0xil1uzjOlA0aZJc6388WZA38j7u_8mvrREdZCG2pt0WsmK9nVbbb7KBXFHLOGsw"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#6ff7ee] text-[#00201e] text-[10px] font-bold px-3 py-1 rounded-full border border-[#006a65]/20 shadow-sm">Top Rated Service</span>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col justify-center space-y-4">
            <nav className="flex text-slate-500 text-xs font-bold mb-2">
              <span onClick={onBack} className="hover:text-[#15157d] cursor-pointer">Home Care</span>
              <span className="mx-2">/</span>
              <span className="text-[#15157d]">AC Deep Cleaning</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-black text-[#15157d] tracking-tight leading-tight">Jet-Pump Deep Cleaning</h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Intensive internal cleaning using high-pressure jet pumps to remove 99% of dust, bacteria, and allergens from your AC units.
            </p>
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center text-amber-600 font-bold text-sm">
                <span className="material-symbols-outlined mr-1 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span>4.9</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-bold text-slate-500">2.4k Bookings last month</span>
            </div>
          </div>
        </section>

        {/* Service Inclusion Checklist */}
        <section className="py-12">
          <h2 className="text-xl font-bold text-[#15157d] mb-8 border-l-4 border-[#006a65] pl-4">Service Inclusions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Checkpoint 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 hover:border-[#15157d]/20 transition-all space-y-4">
              <div className="w-12 h-12 bg-[#e1e0ff] rounded-xl flex items-center justify-center text-[#15157d]">
                <span className="material-symbols-outlined text-xl">cleaning_services</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Internal Coil Jet-Wash</h3>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006a65] text-base">check_circle</span>
                    <span>Removal of stubborn dust from cooling coils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006a65] text-base">check_circle</span>
                    <span>Deep fins alignment check</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Checkpoint 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 hover:border-[#15157d]/20 transition-all space-y-4">
              <div className="w-12 h-12 bg-[#6ff7ee]/20 rounded-xl flex items-center justify-center text-[#006a65]">
                <span className="material-symbols-outlined text-xl">health_and_safety</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Sanitization &amp; Health</h3>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006a65] text-base">check_circle</span>
                    <span>Antimicrobial spray treatment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006a65] text-base">check_circle</span>
                    <span>Drain pipe &amp; tray blockage clearance</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Checkpoint 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 hover:border-[#15157d]/20 transition-all space-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <span className="material-symbols-outlined text-xl">energy_savings_leaf</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Performance Check</h3>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006a65] text-base">check_circle</span>
                    <span>Pre &amp; Post cleaning temperature check</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#006a65] text-base">check_circle</span>
                    <span>Gas pressure &amp; electrical health report</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Price Breakdown */}
        <section className="py-12 bg-slate-100 rounded-3xl px-8 my-8 border border-slate-200/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#15157d]">Transparent Pricing</h2>
              <p className="text-xs text-slate-500">Choose the plan that suits your home best</p>
            </div>
            <div className="flex bg-white p-1 rounded-full border border-slate-200/60 w-fit">
              <button 
                onClick={() => setAcType('split')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${acType === 'split' ? 'bg-[#15157d] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Split AC
              </button>
              <button 
                onClick={() => setAcType('window')}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${acType === 'window' ? 'bg-[#15157d] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Window AC
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Base Plan */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">The Standard</span>
                  <h3 className="text-lg font-bold text-[#15157d] mt-1">Base Cleaning</h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-[#15157d]">₹{basePrice}</div>
                  <div className="text-[10px] font-bold text-slate-400">Per unit</div>
                </div>
              </div>
              <ul className="space-y-4 flex-grow mb-8 text-xs text-slate-600 font-semibold">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#15157d] text-base">done</span> Standard jet-pump cleaning</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#15157d] text-base">done</span> Filter wash</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#15157d] text-base">done</span> Drain tray cleaning</li>
                <li className="flex items-center gap-3 text-slate-300"><span className="material-symbols-outlined text-base">close</span> No antimicrobial spray</li>
                <li className="flex items-center gap-3 text-slate-300"><span className="material-symbols-outlined text-base">close</span> No gas check report</li>
              </ul>
              <button 
                onClick={() => onSelectPackage(`AC Base Cleaning (${acType.toUpperCase()})`, basePrice)}
                className="w-full py-3.5 rounded-xl border-2 border-[#15157d] text-[#15157d] font-bold hover:bg-[#15157d]/5 active:scale-95 transition-all text-xs"
              >
                Select Base
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#15157d] text-white rounded-2xl p-8 flex flex-col h-full relative overflow-hidden shadow-xl ring-4 ring-[#15157d]/20">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#006a65] rotate-45 flex items-end justify-center pb-2 shadow-sm">
                <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <div className="flex justify-between items-start mb-6 z-10">
                <div>
                  <span className="text-[#c0c1ff] text-[10px] font-bold uppercase tracking-wider">The Signature</span>
                  <h3 className="text-lg font-bold mt-1">Deep Premium</h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-[#6ff7ee]">₹{premiumPrice}</div>
                  <div className="text-[#c0c1ff] text-[10px] font-bold">Per unit</div>
                </div>
              </div>
              <ul className="space-y-4 flex-grow mb-8 text-xs font-semibold">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#6ff7ee] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> High-pressure power wash</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#6ff7ee] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Nano-tech antimicrobial coat</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#6ff7ee] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Full diagnostics &amp; Gas report</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#6ff7ee] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Indoor + Outdoor unit service</li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[#6ff7ee] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> 30-day service warranty</li>
              </ul>
              <button 
                onClick={() => onSelectPackage(`AC Deep Premium (${acType.toUpperCase()})`, premiumPrice)}
                className="w-full py-3.5 rounded-xl bg-[#6ff7ee] text-[#00201e] font-black hover:opacity-95 transition-all active:scale-95 z-10 shadow-lg text-xs"
              >
                Select Premium
              </button>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-12 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-[#15157d]">Resident Voices</h2>
            <button className="text-xs font-bold text-[#15157d] underline">View all 1,240 reviews</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
            {/* Review Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 flex flex-col justify-between">
              <div>
                <div className="flex gap-0.5 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-xs italic text-slate-500 mb-6 leading-relaxed">
                  "Remarkably professional. The technician, Ajay, explained every step. The cooling difference is immediate. No mess left behind!"
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <img 
                    alt="Review 1" 
                    className="rounded-xl h-24 w-full object-cover bg-slate-50" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWn03H-G6zeNL-jZZU7RItGn3LMqaiCarKki_mwQPlKEA6FUKLaYdQrxA1nFs3VNPZNlQ4qbSp4wNIzjbgri26d7hzX52bleKRZyYVMr2-MdYuGmHxDoGneDKXJP1H8tceBc_ZOTpj3ciZgwPM02v_DeH1Fd3lETQhw3rNFYSuL9R6_87xgq3n7tunEdgfXP8-zTYDk7jnrrVZUNbE46p6MnizLw4SpIYs5mPZLJYUFq1UppiJaBpc8WR0D_fA9RDFrnti7h0t_ppv"
                  />
                  <img 
                    alt="Review 2" 
                    className="rounded-xl h-24 w-full object-cover bg-slate-50" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB34G4hESOq8crIetIlF5j59v1qZMgmxnoM1kPTeiT56EgFXV0k80M3Hzd3DaO4swVw4ZXh7-ZkwpN-vvRU68DxNus9XHw_KhzK0SqqDgrA44bp69idUs_45zeGgPT2LXwV8HgBLzjSUYMSU6aGh6EOuuuhYT738uxW1rju5K2O55-4rekPYi1utb49nc8m-DTWmwJDshcXkiz7S3Y_On9w4zxLWj9HHIngdFnrSmukjkcs4-NSqNmZpbxv9ZvE5j7bjX8WykNbB_MC"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#15157d] font-bold text-sm">VK</div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Vikram Khanna</div>
                  <div className="text-[10px] text-slate-400">Gurugram Resident</div>
                </div>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/50 flex flex-col justify-between">
              <div>
                <div className="flex gap-0.5 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-xs italic text-slate-500 mb-6 leading-relaxed">
                  "Best AC cleaning I've had. Professional high-pressure washing makes a huge difference. Siddharth was very polite and efficient."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#15157d] font-bold text-sm">SP</div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Siddharth Patel</div>
                  <div className="text-[10px] text-slate-400">Indiranagar Resident</div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-4 bg-slate-100 border border-slate-200/40 rounded-xl flex items-center gap-3 text-slate-500 mt-6">
            <span className="material-symbols-outlined text-[#15157d]">info</span>
            <p className="text-[10px] font-bold leading-none">Privacy Shield Active: All calls and messages are masked through NestMate's secure concierge system.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
