import React, { useState } from 'react';

export default function LocationAccessView({ onLocationSelect }) {
  const [address, setAddress] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [btnState, setBtnState] = useState('normal'); // 'normal' | 'detecting' | 'found'

  const handleUseCurrentLocation = () => {
    setDetecting(true);
    setBtnState('detecting');

    // Simulate location detection
    setTimeout(() => {
      setBtnState('found');
      setTimeout(() => {
        const detectedAddress = "42, Residency Road, Shanthala Nagar, Bangalore";
        setAddress(detectedAddress);
        setDetecting(false);
        setBtnState('normal');
        onLocationSelect(detectedAddress);
      }, 1500);
    }, 2000);
  };

  const handleQuickZone = (zone) => {
    const selectedAddress = `🏠 ${zone}, Bangalore`;
    setAddress(selectedAddress);
    setTimeout(() => {
      onLocationSelect(selectedAddress);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && address.trim()) {
      onLocationSelect(address);
    }
  };

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-sans antialiased overflow-x-hidden min-h-screen pb-20 relative">
      {/* Top AppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#c7c5d4]/30 shadow-sm h-16 flex items-center">
        <div className="flex justify-between items-center px-6 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-[#15157d] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>nest_eco_leaf</span>
            </div>
            <span className="text-lg font-black text-[#15157d]">NestMate</span>
          </div>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined text-[#15157d]">search</span>
          </button>
        </div>
      </header>

      <main className="pt-16 pb-24 min-h-screen flex flex-col">
        {/* Top Half: Map Illustration Section */}
        <section className="relative w-full h-[360px] md:h-[400px] overflow-hidden bg-slate-200">
          <img 
            className="w-full h-full object-cover opacity-80" 
            alt="Stylized Bengaluru Map"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJdWp54oxB4Jj_zB-BiBwhZu4uRiIrIiPlHUqBDRAOBalgCBTUJEGyIsnRxyif_gnm39HJUZgg80faZ9e-qoYWtVNuX53MMh6RWJkvJ0pHJRPpFfaAnuHMVC88SfAEoW--3LoS5_GHELps_kvSmBBOVPUjlnda4-3Iwvyz7tvnidh6wMOBTTyeW2bJWO6iKjEjh4ThuWHozpGPgPKoetQpzrQSJYZTmQyKM2c6vhvqKpzlogyy3Hs0MhbO1Vgq4ougEfA5Ino8Vyin"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f8f9fa] pointer-events-none"></div>
          
          {/* Animated GPS Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 bg-[#15157d]/20 rounded-full animate-ping absolute -inset-4"></div>
              <div className="w-8 h-8 bg-[#15157d] rounded-full flex items-center justify-center shadow-lg border-2 border-white relative z-10">
                <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>my_location</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Half: Form and Selection */}
        <section className="px-6 -mt-12 relative z-10 max-w-lg mx-auto w-full">
          <div className="glass-card rounded-2xl p-6 shadow-lg border border-white/50 bg-white/80 backdrop-blur-md space-y-6">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-black text-[#15157d] mb-2">Where do you need us?</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                We’re currently optimizing home services in premium urban pockets. Let’s see if your nest is within our wingspan.
              </p>
            </div>

            <div className="space-y-4">
              {/* Current Location Button */}
              {btnState === 'normal' && (
                <button 
                  onClick={handleUseCurrentLocation}
                  className="w-full h-14 bg-[#15157d] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#2e3192] transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>gps_fixed</span>
                  <span>Use Current Location</span>
                </button>
              )}

              {btnState === 'detecting' && (
                <button 
                  disabled
                  className="w-full h-14 bg-slate-400 text-white rounded-xl font-bold flex items-center justify-center gap-2 opacity-80 cursor-wait"
                >
                  <span className="animate-spin material-symbols-outlined text-[24px]">progress_activity</span>
                  <span>Detecting...</span>
                </button>
              )}

              {btnState === 'found' && (
                <button 
                  disabled
                  className="w-full h-14 bg-[#006a65] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">check_circle</span>
                  <span>Location Found!</span>
                </button>
              )}

              {/* OR Divider */}
              <div className="flex items-center gap-2">
                <hr className="flex-grow border-slate-200"/>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OR</span>
                <hr className="flex-grow border-slate-200"/>
              </div>

              {/* Manual Entry Input */}
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 mb-2 ml-1" htmlFor="address">Enter Address Manually</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-[#15157d] transition-colors">location_on</span>
                  <input 
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g. Prestige Lavender Bay, Indiranagar"
                    className="w-full h-14 pl-12 pr-4 bg-[#f3f4f5] border border-[#c7c5d4]/40 rounded-xl text-slate-800 focus:outline-none focus:border-[#15157d] focus:ring-1 focus:ring-[#15157d] transition-all placeholder:text-slate-400/70 text-sm"
                  />
                </div>
              </div>

              {/* Quick Zones */}
              <div className="pt-2">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Service Zones</h3>
                <div className="flex flex-wrap gap-2">
                  {['Indiranagar', 'Koramangala', 'Whitefield'].map(zone => (
                    <button 
                      key={zone}
                      onClick={() => handleQuickZone(zone)}
                      className="px-4 py-2 bg-[#6ff7ee]/10 text-[#00716b] border border-[#6ff7ee]/40 rounded-full text-xs font-bold hover:bg-[#6ff7ee]/30 transition-colors"
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <p className="text-[10px] font-medium leading-none">NestMate prioritizes your privacy. We only use location to match services.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
