import React, { useState, useRef } from 'react';

export default function SafetyCenterView({ onBack, onOpenCodeOfConduct }) {
  const [sosState, setSosState] = useState('idle'); // 'idle' | 'holding' | 'triggered'
  const [holdProgress, setHoldProgress] = useState(0);
  const [shareLocation, setShareLocation] = useState(true);
  const timerRef = useRef(null);

  const startHold = () => {
    if (sosState === 'triggered') return;
    setSosState('holding');
    let progress = 0;
    setHoldProgress(0);
    timerRef.current = setInterval(() => {
      progress += 10;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(timerRef.current);
        setSosState('triggered');
        alert('🚨 Emergency Alert Sent! NestMate Support and local safety dispatchers have been notified of your coordinates.');
      }
    }, 300); // 300ms * 10 steps = 3000ms (3 seconds)
  };

  const endHold = () => {
    if (sosState !== 'triggered') {
      setSosState('idle');
      setHoldProgress(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleReportIssue = () => {
    alert('Instant resolution desk contacted. Please select the concern category on the next screen.');
  };

  return (
    <div className="bg-background text-on-surface min-h-screen pb-32 font-sans antialiased text-left selection:bg-secondary-container">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-margin-mobile py-xs w-full max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-sm">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-surface-container-high/50 rounded-full transition-colors active:scale-95 duration-200 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">NestMate</h1>
          </div>
          <div className="flex items-center gap-xs">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
              <img 
                alt="User Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuj46IcTllFwboIdq6yoxd21bX9q3CHG3ImRGkeptCJCGRsM9_zYP-0njPP1AOfpc1C4l_jfBa4qcKf1F5YrqW51ikESzGWa9UhlLiIo95HqJRiRpUKouLgtinivG9AOW6qhV-xzYhoI6RxFOiS9ZwHxt05tbNfrfhT3YU_PWNyykRv1Vx_9k5X8R6OtsPsltS7x7qdywpHI1Xh5PtO2MeZmchcKDNjxMHwsXQ5Pf_Hevi9O3aQsEcTKExYBUz9yxJCc6_XKY1hVTS"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mt-24 px-margin-mobile max-w-2xl mx-auto space-y-md">
        {/* Welcome Hero Section */}
        <section className="text-center py-md">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-xs font-bold">Safety &amp; Protocols</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            Your security is our top priority. Access professional support and live tracking tools instantly.
          </p>
        </section>

        {/* SOS Trigger Card */}
        <div className="relative overflow-hidden bg-error-container rounded-xl p-md shadow-lg border border-error/10 flex flex-col items-center gap-md group">
          <div className="absolute inset-0 safety-shimmer opacity-20 pointer-events-none"></div>
          
          <button
            type="button"
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-150 border-4 border-on-error/20 active:scale-90 select-none relative overflow-hidden ${
              sosState === 'triggered' ? 'bg-[#93000a]' : 'bg-error'
            }`}
          >
            {/* Pulsing holding state */}
            {sosState === 'holding' && (
              <div 
                className="absolute inset-0 bg-black/40 transition-all duration-100" 
                style={{ clipPath: `ellipse(${holdProgress}% ${holdProgress}% at 50% 50%)` }}
              ></div>
            )}
            <span className="material-symbols-outlined text-white text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>emergency_home</span>
          </button>
          
          <div className="text-center">
            <h3 className="font-title-lg text-title-lg text-on-error-container font-bold">
              {sosState === 'idle' && 'SOS / Emergency Help'}
              {sosState === 'holding' && 'HOLDING SOS BUTTON...'}
              {sosState === 'triggered' && '🚨 Emergency Triggered!'}
            </h3>
            <p className="font-label-sm text-label-sm text-on-error-container/80 mt-1 uppercase tracking-widest">
              {sosState === 'triggered' ? 'Help Dispatchers Notified' : 'Hold for 3 seconds to alert 24/7 center'}
            </p>
          </div>
        </div>

        {/* Live Status Controls */}
        <div className="grid grid-cols-1 gap-gutter">
          <div className="glass-panel p-md rounded-xl shadow-sm flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-sm">
              <div className="w-12 h-12 rounded-lg bg-secondary-container/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              <div>
                <h4 className="font-title-lg text-[16px] text-on-surface font-semibold">Share Live Location</h4>
                <p className="font-label-sm text-on-surface-variant">Update family on service status</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={shareLocation} 
                onChange={() => setShareLocation(!shareLocation)} 
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
        </div>

        {/* Bento Grid: Safety Links */}
        <div className="grid grid-cols-2 gap-gutter">
          {/* Safety Center Link (Code of Conduct) */}
          <button 
            type="button"
            onClick={onOpenCodeOfConduct}
            className="glass-panel p-md rounded-xl shadow-sm hover:bg-surface-container-high transition-all text-left flex flex-col justify-between group h-40 bg-white/70"
          >
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center mb-xs group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary">verified_user</span>
            </div>
            <div>
              <h4 className="font-title-lg text-[16px] text-primary font-bold">Code of Conduct</h4>
              <p className="font-label-sm text-on-surface-variant leading-tight mt-1">View background checks &amp; protocols</p>
            </div>
          </button>
          
          {/* Report Issue */}
          <button 
            type="button"
            onClick={handleReportIssue}
            className="glass-panel p-md rounded-xl shadow-sm hover:bg-surface-container-high transition-all text-left flex flex-col justify-between group h-40 bg-white/70"
          >
            <div className="w-10 h-10 rounded-full bg-error-container/50 flex items-center justify-center mb-xs group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-error">report</span>
            </div>
            <div>
              <h4 className="font-title-lg text-[16px] text-error font-bold">Report Issue</h4>
              <p className="font-label-sm text-on-surface-variant leading-tight mt-1">Instant resolution for any concern</p>
            </div>
          </button>
        </div>

        {/* Trust Information Card */}
        <div className="bg-surface-container p-md rounded-xl space-y-sm">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
            <span className="font-label-md text-secondary font-bold uppercase tracking-wider">The NestMate Guard</span>
          </div>
          
          <div className="flex gap-sm overflow-x-auto pb-xs scrollbar-hide">
            <div className="flex-shrink-0 bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/30 w-48 text-left">
              <span className="material-symbols-outlined text-primary mb-1">fingerprint</span>
              <p className="font-label-md text-on-surface font-semibold">100% Verified</p>
              <p className="font-label-sm text-on-surface-variant mt-1">All staff undergo dual-layer police verification.</p>
            </div>
            
            <div className="flex-shrink-0 bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/30 w-48 text-left">
              <span className="material-symbols-outlined text-primary mb-1">ambulance</span>
              <p className="font-label-md text-on-surface font-semibold">Insured Care</p>
              <p className="font-label-sm text-on-surface-variant mt-1">Coverage up to ₹10 Lakhs for all in-home services.</p>
            </div>
            
            <div className="flex-shrink-0 bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/30 w-48 text-left">
              <span className="material-symbols-outlined text-primary mb-1">support_agent</span>
              <p className="font-label-md text-on-surface font-semibold">Priority Help</p>
              <p className="font-label-sm text-on-surface-variant mt-1">Response time under 5 minutes, guaranteed.</p>
            </div>
          </div>
        </div>

        {/* Interactive Map Placeholder for Live Location */}
        <div className="relative h-48 rounded-xl overflow-hidden shadow-inner border border-outline-variant">
          <img 
            alt="Live Location Map" 
            className="w-full h-full object-cover grayscale opacity-80 brightness-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbh_FfdT8UIXs-n-IEORnm_-c1sTwnwp5ZHf9N9_gKRHNWiUxBUoOWbW2gdn-7TlFpJn3X0nD0Ataljb10RaY38eeUrziprC_yfj6NX3UrC3Y-rBNyZgp-5DXcfJngR2r8p26RFQFXs_FJ_qBZDD0arxtWFY-N-5WyYECmA0LBMnKwsgO1ggodcscMC-l_6F_bWWlf2Vt5ZQS8JNfwYjiNoECvcsXTrS_F0vXmbyTJY9FvZ6lmAFlVUSOnLUNX9DeRe25oATsGPAeg"
          />
          {shareLocation && (
            <>
              <div className="absolute inset-0 flex items-center justify-center bg-primary/10 pointer-events-none">
                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 bg-secondary rounded-full animate-ping"></div>
                  <div className="absolute w-3 h-3 bg-secondary rounded-full"></div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                <p className="font-label-sm text-primary flex items-center gap-1">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Live Tracking Active
                </p>
              </div>
            </>
          )}
          {!shareLocation && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <span className="text-white font-bold text-xs bg-slate-800 px-4 py-2 rounded-full">Location Sharing Paused</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
