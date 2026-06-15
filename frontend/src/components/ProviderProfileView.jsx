import React from 'react';

export default function ProviderProfileView({ onBack, providerInfo }) {
  // Default values matching Arjun Varma if no provider info is supplied
  const info = providerInfo || {
    name: 'Arjun Varma',
    service: 'Home Maintenance',
    rating: 4.9,
    reviews: 124,
    experience: '8+ Years Experience',
    bio: 'Specializing in premium home automation and meticulous maintenance systems for modern residences. Arjun brings corporate-grade efficiency to your domestic management.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCD33xun_v52Psf4wawdHGvQWZ16_eFdesbT6hXfdVmnq7pfFtEkXNme9Q-yjBG--I5TL9Lg-UPEnSf71MQGukw7oDyZxTaz5jNh0QzlTTPSOrD9cC3g7AOibKYa0olIuxQVgxNH5A4ElNfGLxiSGA0bmC85WMcq9tkh_8C0Z45BCrB-dPQtWBaJh-QpX2rGgOdHlZKrKGmxZnPCOTU8k4DCe7PeVnbgMJKttYCNsGl8nTuUAXt_Q5NLSdj65w4bJiRecYig59DNBm',
    rate: 1200
  };

  const handleAction = (type) => {
    alert(`Initiating secure, masked ${type} with ${info.name}. Connecting through NestMate Privacy Shield concierge system...`);
  };

  // Generate dynamic stars based on rating
  const renderStars = () => {
    const stars = [];
    const ratingVal = info.rating;
    for (let i = 1; i <= 5; i++) {
      if (ratingVal >= i) {
        stars.push(
          <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        );
      } else if (ratingVal > i - 1 && ratingVal < i) {
        stars.push(
          <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
        );
      } else {
        stars.push(
          <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-background text-on-surface min-h-screen pb-32 font-sans antialiased text-left selection:bg-secondary-container">
      {/* Top AppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile py-xs w-full max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-sm">
            <button 
              onClick={onBack}
              className="material-symbols-outlined text-primary p-xs hover:bg-surface-container-high/50 rounded-full transition-colors active:scale-95 flex items-center justify-center"
            >
              arrow_back
            </button>
            <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Provider Profile</h1>
          </div>
          <div className="flex items-center gap-xs">
            <button 
              onClick={() => alert('Profile link copied to clipboard.')}
              className="material-symbols-outlined text-primary p-xs hover:bg-surface-container-high/50 rounded-full transition-colors active:scale-95 flex items-center justify-center"
            >
              share
            </button>
            <button 
              onClick={() => alert(`${info.name} added to favorites.`)}
              className="material-symbols-outlined text-primary p-xs hover:bg-surface-container-high/50 rounded-full transition-colors active:scale-95 flex items-center justify-center"
            >
              favorite
            </button>
          </div>
        </div>
      </header>

      <main className="mt-20 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop space-y-lg">
        {/* Hero Section: Asymmetric Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start pt-md">
          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden shadow-lg aspect-[4/5] bg-surface-container-highest">
              <img 
                alt="Professional Provider" 
                className="w-full h-full object-cover" 
                src={info.avatar}
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 glass-card p-md rounded-xl shadow-xl border-l-4 border-secondary flex items-center gap-sm">
              <div className="bg-secondary-container text-on-secondary-container p-xs rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">NEST VERIFIED</p>
                <p className="font-title-lg text-title-lg text-primary font-bold">Top 1% Pro</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-md pt-sm">
            <div className="flex flex-wrap items-center gap-sm">
              <span className="px-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm">{info.service}</span>
              <span className="px-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm">{info.experience}</span>
            </div>
            <h2 className="font-display-lg text-display-lg text-primary leading-tight">{info.name}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {info.bio}
            </p>
            {/* Trust Badges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-md">
              <div className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                <div>
                  <h4 className="font-title-lg text-title-lg text-on-surface font-semibold">Background Verified</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Cleared by Federal ID check</p>
                </div>
              </div>
              <div className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant">
                <span className="material-symbols-outlined text-secondary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                <div>
                  <h4 className="font-title-lg text-title-lg text-on-surface font-semibold">Skill Tested</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Certified NestMate Expert</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-md">
          <div className="bg-surface-container p-md rounded-xl text-center">
            <p className="font-display-lg text-headline-lg text-primary">{info.rating}</p>
            <div className="flex justify-center text-tertiary-container gap-0.5">
              {renderStars()}
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">{info.reviews} Reviews</p>
          </div>
          <div className="bg-surface-container p-md rounded-xl text-center flex flex-col justify-center">
            <p className="font-headline-lg text-headline-lg text-primary">98%</p>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Completion Rate</p>
          </div>
          <div className="bg-surface-container p-md rounded-xl text-center flex flex-col justify-center">
            <p className="font-headline-lg text-headline-lg text-primary">15m</p>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Avg. Response</p>
          </div>
          <div className="bg-surface-container p-md rounded-xl text-center flex flex-col justify-center">
            <p className="font-headline-lg text-headline-lg text-primary">2.4k</p>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Hours Worked</p>
          </div>
        </section>

        {/* Portfolio Gallery: Horizontal Scroll/Grid */}
        <section className="space-y-md">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-headline-md text-headline-md text-primary">Past Projects</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Showcasing meticulous craftsmanship</p>
            </div>
            <button 
              onClick={() => alert('Opening full project portfolio...')}
              className="text-primary font-label-md text-label-md flex items-center gap-xs"
            >
              View All <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm group relative bg-surface-container-high border border-outline-variant/30">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Smart Hub Install"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDfBiIO_6-UQv6jbO2axQOAdZiHfSFbh3hWwgEmP5E6BDyksugHNOrYnUQ14g7RvTKhPnlRdONDMvxMGRQJY9Sn-7jU1LopJ94qyHrEps7QiewsU5zPy4JSZjRp0n9jdmAsh030D_uowDVWXou_Y7kPy-t8XuSMaDYw1N2_onNFeosg11LRs-tShhNegD7ZmYjKSS06Kgoi2IOBYu0nteqsl1ow3mE7kBStc51Mwv3CnrO9dXomcu6br63MxOTZOcVxxy4-I3-S2ox"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-sm">
                <p className="text-white font-label-sm text-label-sm">Smart Hub Install</p>
              </div>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm group relative bg-surface-container-high border border-outline-variant/30">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Precision Tuning"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMUd0PjC4ZXIvEaKdAX2dOkG1lVxSqcmGToIY2OM6hBj3GiSLWPME4hO4nhPDrkUnMBnlTvDAn8PAHR2aeFBuGii1pHiElMdY_3RXz-05QQW5srE_2Y1j4a9jF60D64DyPVfgvOaaEyUXJAdt4BKw5xOIAWdV8jk9cSIKbEi2Jwwgn2lcGYudSF_wSqPDSClq9PVqc5xirShQKVrRAUzFpL05xqQJwQW8ng7tq533B_pIG50nZ22QPeQTF0VYY8XXJn_Ctb7sO1Yjk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-sm">
                <p className="text-white font-label-sm text-label-sm">Precision Tuning</p>
              </div>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm group relative bg-surface-container-high border border-outline-variant/30">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Inventory Systems"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaxh3PM3DqyViDWjNjhDyixpwGysfX9B60siAVuAWJgfXdWdwQo4pxpi0pVgnlIHFpU5tI8qWS9WEfrr2QIO4WHJ440nD2evY6Ix_if5GOjYAlvDgdoFDlXMEjyp6OOvr3_OO4Jshivwi4lhARqPvLKCIwhKPRXmjZxbRPndkHtS5cNkS_Ko0VCZCYoqWGmfuPJ2CdgZNPXuDwSL-KDQBlmFvB5c4oTpADlL_3_r2UQBxsKRsEpETFvyJiUgGx2L4n6KwYeKFIysrv"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-sm">
                <p className="text-white font-label-sm text-label-sm">Inventory Systems</p>
              </div>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm group relative bg-surface-container-high border border-outline-variant/30">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Ambience Control"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0WSpLbRXbg5T4_P6wO2Bh5eN1nPlSFizYvJx63LnYG2ni6o-KYgepGdVnXd2l84UOToNEhNeWh2JHI_v6plZknNMrwsIZYZq8opth6qPiL7crij9v51PemWY441F8X8kU3iKnk2kcuRrtnrkqCy5rHYWLFMl3g-Gzh6cY4xcOciFB-GeTCws-1orkj9i7xI-pNy1xImv38bDp4e6sf2EcQL_gBy_KPuIB_heN3EVIyL1TbyrLS4svqw_nSvRGHFSQWFqIlz7Ou9RD"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-sm">
                <p className="text-white font-label-sm text-label-sm">Ambience Control</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="space-y-md">
          <h3 className="font-headline-md text-headline-md text-primary">Client Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Review Card 1 */}
            <div className="p-md bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant space-y-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">RK</div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Rajesh Khanna</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">2 days ago</p>
                  </div>
                </div>
                <div className="flex text-tertiary-container gap-0.5">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
                "Arjun's attention to detail is remarkable. He didn't just fix the automation issue, he optimized the whole system for efficiency. Truly professional service."
              </p>
            </div>
            {/* Review Card 2 */}
            <div className="p-md bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant space-y-sm">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm">SM</div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Sana Mehta</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">1 week ago</p>
                  </div>
                </div>
                <div className="flex text-tertiary-container gap-0.5">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
                "Rare to find someone so discerning about home aesthetics while being technically sound. Arjun is my go-to for all complex maintenance tasks now."
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Note */}
        <div className="p-sm bg-surface-container-high rounded-lg flex items-center gap-sm text-on-surface-variant border border-outline-variant/30">
          <span className="material-symbols-outlined text-primary">info</span>
          <p className="font-label-sm text-label-sm text-left">Privacy Shield Active: All calls and messages are masked through NestMate's secure concierge system.</p>
        </div>
      </main>

      {/* Bottom Action Bar (Contextual/Fixed) */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg shadow-[0_-4px_12px_rgba(21,21,125,0.1)] py-md px-margin-mobile z-50 border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto flex items-center gap-md">
          <div className="hidden md:block flex-grow text-left">
            <p className="font-label-sm text-label-sm text-on-surface-variant">SERVICE FEE</p>
            <p className="font-headline-md text-headline-md text-primary font-bold">
              ₹{info.rate.toLocaleString()} <span className="text-label-md font-normal text-on-surface-variant">/ hour</span>
            </p>
          </div>
          <div className="flex gap-sm w-full md:w-auto">
            <button 
              onClick={() => handleAction('Chat')}
              className="flex-1 md:w-48 py-3 rounded-xl border-2 border-primary text-primary font-title-lg flex items-center justify-center gap-xs hover:bg-primary/5 active:scale-95 transition-all font-semibold"
            >
              <span className="material-symbols-outlined">chat_bubble</span> Chat
            </button>
            <button 
              onClick={() => handleAction('Call')}
              className="flex-1 md:w-48 py-3 rounded-xl bg-primary text-on-primary font-title-lg flex items-center justify-center gap-xs shadow-md hover:opacity-90 active:scale-95 transition-all font-semibold"
            >
              <span className="material-symbols-outlined">call</span> Call
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
