import React from 'react';

export default function ChoreVerificationView({ booking, onClose }) {
  // Determine completed work photo based on the service title
  const getWorkPhoto = (title = '') => {
    const t = title.toLowerCase();
    if (t.includes('kitchen')) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuBN62tP7Vt149n-TlzjI1kgjGGc1rbuMEoqnN6SSmVJ_QKv0z7d-hE8wv3mBO-30jCL1upfXzDnDR-bKwVn0vLBX6VQ3Nfmp70Hb-wfckf-r6pmSMavzj7t3oxD9MMxR9V-MmXFL_8TcCgS3jRr96HdH8w0wb4_n8AmrnSNtLHTR-0Y9UQ_zsp9IsSoCO9yIK0N5rEJNZuw4cfdf-gLPdVrNyFzWnfB27EE_8YxDuXHNiNc45hM_KRKU5mrmadEGC6_FAOZ6tHbzzAP";
    } else if (t.includes('bathroom') || t.includes('sanitization')) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuCQYG-ca7gGKkj-h0Y8rvbdXsmPeWr_TBpnvT7Met-UOo79_mvpeMtlxDX4kYcUQi2CE1mdYn8bZ0Qv6T4tJCXSJHVG1J0Q86BNCx0KdHLGrat1y09tet5IToqMjcT7AUv4uqbibfZQ5_Ikd2-oJoJC1iVuURBem5JPtQWQ2pMbJd66K7nqhJRGdOtUj54edL1o-rOSAn-oZKdhnSyIMN0P5OpkFwxW2txDMgFCPBjRU83OzCreNo7YCm3_RJCPzzX7QnGSQC1zmBn7";
    } else if (t.includes('ac') || t.includes('filter')) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXu-CXgHxBIsJkZL-vI3bznDkByIHU_lAk1mBXz7LcjfZ9JxlcGNqPokJ6GqnZ_pvBjjYY5FcCiBXAp0w1fJWVia00FHTlpaLCnqVb7eboYHPQY2TrPERXZqY8tr1uqQFO9MilJ_bveDt0UwyiBWGYbM2OyEJSGw_4GJ8nSvzGAgDFcvJGcI0tZQOMy_VVGwhux4N2OL8yhYBOxn0xil1uzjOlA0aZJc6388WZA38j7u_8mvrREdZCG2pt0WsmK9nVbbb7KBXFHLOGsw";
    } else {
      // General premium room/interior photo
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuCQYG-ca7gGKkj-h0Y8rvbdXsmPeWr_TBpnvT7Met-UOo79_mvpeMtlxDX4kYcUQi2CE1mdYn8bZ0Qv6T4tJCXSJHVG1J0Q86BNCx0KdHLGrat1y09tet5IToqMjcT7AUv4uqbibfZQ5_Ikd2-oJoJC1iVuURBem5JPtQWQ2pMbJd66K7nqhJRGdOtUj54edL1o-rOSAn-oZKdhnSyIMN0P5OpkFwxW2txDMgFCPBjRU83OzCreNo7YCm3_RJCPzzX7QnGSQC1zmBn7";
    }
  };

  const getProviderAvatar = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('arjun')) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ejFjtNj4XjvOXct58K2oIvkSElAwCg-nkCyw1tSes0VzMLtHMEV6AEXf_nzRiuD9l_PgR-HKGPNhq73OiyAUTVh8nzYaxUxdf62qR45Y2ChnhxXCIzl2jWMIzGt-YnDd7Wgq4XDVcYjAL8T-cEbzZIue0FRgAD1QsG3J0GQ8ZO7YiR-0PCBSubtcp0ikW3Y2CHhGh-QNFV0JNgoMXDqB9mwbr9I64UP75gAlDbBWVu76YSeSFX33wGkg3JZJ14WAvu5KScLCf6zV";
    } else if (n.includes('anita') || n.includes('seema') || n.includes('meera')) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuACBgyRTWFTz1anff53QNAyqxebFnT_MPHReXYVelfpRI5x9e8aTvPcg2uxjS4FF-dE0uzel43aVXKyMicO0huAVz3KTr_sMEu4GjDPVJekEozRnuAMf7ShiUHJp9bGyqXaPaHITlrGg2xUQUS1hQarrJ6rnYogiQd6fR7m3D5Enp02DPVBw0XWzXUctV0zHxEh17nKmHOIk0IoHqG8EQ8AWdml3f116I-ga4nobL9f5JesHdHTJeoUg5A9HQwCfna4uGtRMYHyPesW";
    } else if (n.includes('rohan') || n.includes('ramesh')) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuDcEC4j7Eq7gB_UqK48Q2Zf2npW2u6SUmGXbrOKPJwCW5w9WN4XTJQqkIeeCOKbehQfn3GljB9Gs5K6bA7Bb25PmSuvREMjp0vfO4xaX14leBxkKi5axpUjhi1sQ0cXdgjdzhfFM22feS6RKChe-bYZ1P5cb49dSCho4FHfqHtB191wxv4lXXyriejjMMcz8wlvl_SIhoCQqCS-7IzmdkGhmGftZRuvZt0-WwlJcOpJnZCw4xJgfGpXei_xhDGKKCBP2RjRG2nHdMa-";
    } else {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuC3heQv8bX48eDNCHU2gPl3A8i69XlHXeRo-jVmK-ndi_-Nhq08VCFMISWsIRzUmoVXkud5_vMaPm1d_25BFgjdgKuR_cJFmkq68Et78Wpthm5eZOXUU9SpmSxSfAMYwminNh-DH1e8rMDiPbnSJTN-5tAXChz1k4NwMNZBSqHQOyyveVG0og-GVkmkePVxhinMKU729U92Lfj8YjyESnh6dBSqrmtNe18NAFal66KwoWGNpTaoZeE4UDakLHUkSRVxQXfQGjoeTyVm";
    }
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col font-sans text-left selection:bg-indigo-500/30">
      {/* Top Header */}
      <header className="bg-slate-950/80 border-b border-slate-800 backdrop-blur-md sticky top-0 w-full z-40 h-16 flex items-center px-6">
        <div className="flex justify-between items-center w-full max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#15157d] flex items-center justify-center text-white border border-indigo-500/20">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>nest_eco_leaf</span>
            </div>
            <span className="text-base font-black tracking-tight text-slate-100">NestMate Audit</span>
          </div>
          <button 
            onClick={onClose}
            className="rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all active:scale-95"
          >
            Close Portal
          </button>
        </div>
      </header>

      {/* Main Panel */}
      <main className="flex-grow w-full max-w-xl mx-auto px-6 py-8 space-y-6">
        
        {/* Verification Status Header */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-950 rounded-3xl p-6 border border-blue-800/40 shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'wght' 600" }}>verified</span>
          </div>
          <div>
            <span className="text-[9px] font-black text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">Verified Secure</span>
            <h2 className="text-sm font-black text-slate-100 mt-1.5 leading-snug">Chore Receipt &amp; Proof of Work</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">Authenticity verified under blockchain transaction record {booking.id}</p>
          </div>
        </div>

        {/* Work Details Bento Card */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 space-y-4">
          <div className="border-b border-slate-800/60 pb-3">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Service Completed</span>
            <h3 className="text-base font-black text-slate-100 mt-1">{booking.title}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-400">
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Completed Date</span>
              <span className="text-slate-200 font-extrabold">{booking.date} @ {booking.time}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Secure Payment</span>
              <span className="text-slate-200 font-extrabold">₹{booking.price.toFixed(2)}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Service Location</span>
              <span className="text-slate-200 font-extrabold">🏠 Indiranagar, Bangalore</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider block">GST Tax Status</span>
              <span className="text-blue-400 font-extrabold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span> Paid (18%)
              </span>
            </div>
          </div>
        </div>

        {/* Assigned Professional Profile */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 flex gap-4 items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-800 shrink-0">
            <img 
              alt="Assigned domestic specialist" 
              className="w-full h-full object-cover" 
              src={getProviderAvatar(booking.providerName)}
            />
          </div>
          <div className="flex-grow min-w-0">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Verified Professional</span>
            <h4 className="text-sm font-black text-slate-200 mt-0.5">{booking.providerName}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center text-amber-500 text-[10px] font-bold">
                <span className="material-symbols-outlined text-[12px] fill-current">star</span>
                <span>{booking.providerRating} Rating</span>
              </div>
              <span className="text-slate-600 text-[10px]">&bull;</span>
              <span className="text-[10px] text-slate-400 font-semibold">Premium Partner</span>
            </div>
          </div>
        </div>

        {/* Proof of Work Photo Gallery */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 space-y-4">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Proof of Completed Work</h4>
            <p className="text-[9px] text-slate-500 mt-0.5">Photographed by professional upon task completion &amp; verified by AI-Identity</p>
          </div>

          <div className="w-full h-[280px] rounded-2xl overflow-hidden border border-slate-800 shadow-inner relative group">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="Completed domestic service" 
              src={getWorkPhoto(booking.title)}
            />
            {/* Visual overlay tag */}
            <div className="absolute bottom-4 left-4 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-bold backdrop-blur-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#6ff7ee] text-sm">photo_camera</span>
              <span>Chore Completion Image</span>
            </div>
          </div>
        </div>

        {/* Secure audit seals */}
        <div className="text-center py-4 flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span className="text-[8px] font-black uppercase tracking-wider">Verified Secure Audit Record</span>
          </div>
          <button 
            onClick={onClose}
            className="w-full bg-[#15157d] hover:bg-[#2e3192] text-white py-3.5 rounded-2xl text-xs font-bold transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Return to Dashboard</span>
          </button>
        </div>
      </main>
    </div>
  );
}
