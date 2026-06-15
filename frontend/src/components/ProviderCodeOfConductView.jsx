import React from 'react';

export default function ProviderCodeOfConductView({ onBack }) {
  return (
    <div className="bg-background text-on-surface min-h-screen pb-32 font-sans antialiased text-left selection:bg-secondary-container">
      {/* Top AppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile py-xs w-full max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-sm">
            <button 
              onClick={onBack}
              className="active:scale-95 duration-200 transition-transform p-base rounded-full hover:bg-surface-container-high/50 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">NestMate</h1>
          </div>
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary cursor-pointer">search</span>
            <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border border-outline-variant">
              <img 
                alt="User Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5cbwcx3PtzggRRYRhGpkFgCR6V6XRCtQpVtl57ZNBsHmTlMGKLWAJFCrgWXz8FlntwdSfTyTA1pU7wuKIbcUZ8gKRqFE_d3U6MwIX4x1OtF3-369VdDlP_i9q0g1jlEl9StFsaWyZMnVBlmlAeaEh-fZ6VHzJDSbjYgFhFAazMOwPff9eaQNYC4jiNnQZflYUBwtMC28e8wApJ_PxFxkL0825tHNZfwKiv81y2ba52fTFhh0RDTCe1ut6xG0q1kOpfnoyPUCKy9QL"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-4xl mx-auto text-left">
        {/* Document Header */}
        <section className="mb-lg">
          <span className="text-primary font-label-md bg-primary-fixed px-sm py-base rounded-full mb-xs inline-block">Transparency Report</span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm font-bold">Provider Code of Conduct</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            NestMate ensures a premium service experience by holding all domestic professionals to the highest standards of reliability, safety, and professionalism.
          </p>
        </section>

        {/* Bento-style Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
          {/* Punctuality (Large Highlight) */}
          <div className="md:col-span-8 glass-card rounded-xl p-md shadow-sm border-l-4 border-l-primary flex flex-col md:flex-row gap-md bg-white/70">
            <div className="bg-primary-fixed-dim/30 p-sm rounded-xl h-fit flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[40px]">schedule</span>
            </div>
            <div>
              <h3 className="font-title-lg text-title-lg text-primary mb-xs font-semibold">Punctuality &amp; Presence</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-sm">Providers must arrive 5 minutes before the scheduled time. Absence without 24-hour notice results in immediate platform review to maintain consistency for our urban professionals.</p>
              <ul className="space-y-base text-on-surface font-label-md">
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Real-time check-ins via NestMate Pro App</li>
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Mandatory departure confirmation</li>
              </ul>
            </div>
          </div>
          
          {/* Uniformity */}
          <div className="md:col-span-4 glass-card rounded-xl p-md shadow-sm border-t-4 border-t-secondary flex flex-col gap-sm bg-white/70">
            <span className="material-symbols-outlined text-secondary text-[32px]">checkroom</span>
            <h3 className="font-title-lg text-title-lg text-secondary font-semibold">Uniformity</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-left">Providers must wear clean, NestMate-branded identification and maintain a professional appearance at all times.</p>
          </div>

          {/* Professional Behavior (Full Width Feature) */}
          <div className="md:col-span-12 relative overflow-hidden rounded-xl bg-surface-container-high p-md md:p-lg border border-outline-variant text-left">
            <div className="relative z-10 grid md:grid-cols-2 gap-lg items-center">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm font-semibold">Professionalism &amp; Ethics</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                  Integrity is the core of our concierge service. Our providers are trained to handle high-value environments with discretion and respect for privacy.
                </p>
                <div className="flex flex-wrap gap-sm">
                  <div className="bg-surface-container-lowest px-sm py-xs rounded-lg flex items-center gap-xs border border-outline-variant shadow-sm">
                    <span className="material-symbols-outlined text-tertiary">lock</span>
                    <span className="font-label-md text-on-surface font-semibold">Privacy First</span>
                  </div>
                  <div className="bg-surface-container-lowest px-sm py-xs rounded-lg flex items-center gap-xs border border-outline-variant shadow-sm">
                    <span className="material-symbols-outlined text-tertiary">no_photography</span>
                    <span className="font-label-md text-on-surface font-semibold">No Media Capture</span>
                  </div>
                  <div className="bg-surface-container-lowest px-sm py-xs rounded-lg flex items-center gap-xs border border-outline-variant shadow-sm">
                    <span className="material-symbols-outlined text-tertiary">record_voice_over</span>
                    <span className="font-label-md text-on-surface font-semibold">Zero Solicitation</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block h-64 rounded-xl overflow-hidden relative shadow-lg">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Professional domestic manager speaking with client"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuASsZlqMGm1fiWsfTh6bA2DY8b6iDvQVN_2CNl6hs59FZJtUop04v9tPN4cu7weYU-xU948yi4JKVDKLA5OakuBaBH68u6-XUtl2DPFgLt9wJ4bfsLFGHwhqvF5Cjt65GAKu80DE592BO_GGuGAH7XvvIl9Fwtd6B7hL3jhpR5UTfIUC6iHUrU0C1yCf2sdJys0udj_ZZXXSn9jpV2FNMWBCdSM3ttHLzbjm14lIu0iy69u46sHmlDgulLS35vEEn5aXxniZZimnKRK"
                />
              </div>
            </div>
            {/* Subtle Gradient Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </div>

          {/* No Off-platform Payments */}
          <div className="md:col-span-6 glass-card rounded-xl p-md shadow-sm border-l-4 border-l-error bg-white/70">
            <div className="flex items-center gap-sm mb-sm">
              <div className="bg-error-container p-xs rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-error">payments</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-error font-semibold">Financial Integrity</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              All financial transactions must be handled through the NestMate app. Directly soliciting or accepting cash payments from users is a strict violation and leads to permanent suspension.
            </p>
          </div>

          {/* Safety Gear */}
          <div className="md:col-span-6 glass-card rounded-xl p-md shadow-sm border-l-4 border-l-tertiary bg-white/70">
            <div className="flex items-center gap-sm mb-sm">
              <div className="bg-tertiary-fixed p-xs rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">health_and_safety</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-tertiary font-semibold">Safety Protocols</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Providers must utilize task-specific safety gear (gloves, masks, or protective eyewear) provided by NestMate. No job is started without a safety-check confirmation in the provider app.
            </p>
          </div>
        </div>

        {/* Transparency Footer */}
        <div className="mt-xl p-lg bg-primary-container rounded-2xl text-on-primary-container flex flex-col md:flex-row items-center gap-lg">
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-headline-md text-headline-md mb-xs font-bold text-white">Commitment to Quality</h4>
            <p className="font-body-md text-[#e1e0ff]/95">Every service session is monitored for quality through AI-assisted feedback loops and regular on-site audits. If you feel a provider has breached these standards, report it immediately via the 'My Nest' dashboard.</p>
          </div>
          <button 
            onClick={() => alert('Connecting to Concierge Support...')}
            className="bg-primary-fixed text-primary hover:bg-[#e1e0ff]/90 px-lg py-md rounded-xl font-label-md transition-all active:scale-95 shadow-md shrink-0 font-bold"
          >
            Contact Concierge
          </button>
        </div>
      </main>
    </div>
  );
}
