import React, { useState } from 'react';

export default function SearchView({ onBack, onOpenDetailedService }) {
  const [query, setQuery] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Weekly Deep Cleaning',
    'Luxe Hamper Curation',
    'HVAC Maintenance'
  ]);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.toLowerCase() === 'empty' || query.toLowerCase() === 'nothing') {
      setShowEmptyState(true);
    } else if (query.toLowerCase().includes('ac') || query.toLowerCase().includes('hvac') || query.toLowerCase().includes('maintenance')) {
      onOpenDetailedService('ac_cleaning');
    } else {
      setShowEmptyState(false);
    }
  };

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleDeleteRecent = (indexToDelete) => {
    setRecentSearches(prev => prev.filter((_, idx) => idx !== indexToDelete));
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
    if (tag === 'HVAC Maintenance' || tag === 'Art Curation') {
      onOpenDetailedService('ac_cleaning');
    } else {
      setShowEmptyState(false);
    }
  };

  const handleResetSearch = () => {
    setQuery('');
    setShowEmptyState(false);
  };

  const triggerVoiceSim = () => {
    setVoiceActive(true);
    // Simulate hearing voice input after 2.5 seconds
    setTimeout(() => {
      setQuery('HVAC Maintenance');
      setVoiceActive(false);
      onOpenDetailedService('ac_cleaning');
    }, 2500);
  };

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-sans antialiased overflow-x-hidden min-h-screen pb-32">
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#c7c5d4]/30 shadow-sm h-16 flex items-center">
        <div className="flex justify-between items-center px-6 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 active:scale-95 duration-200 transition-colors hover:bg-slate-100 rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[#15157d]">arrow_back</span>
            </button>
            <span className="text-lg font-black text-[#15157d]">Search</span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#c7c5d4]/40">
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5EMtNj6tiPR3wa2c8wK6YL35Gutd81jUyYk4cQ9h5OjnTQBrKt8Iry4dAlO-fOowZK9XiqB-yowmCFtfuRV_jhYgx_M9TLavunFfMQ59ZLU6BfQmYOS8KxBa00tnnZYDXohZs265GjW9mMfK4ZVZUq8Qmswl2FP7ubvmpyuC5n2yvkLY53aDKnC8ios6scXYJlzgJ-vIwZm618sRnp0ulnebVa04ksosqrE51HvsqlidDENdE8mgGbHENvrDkyMFLVBv39TN_EZiR"
            />
          </div>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-7xl mx-auto space-y-10 text-left">
        {/* Search Input Box */}
        <section className="relative">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find premium home services..."
              className="w-full pl-12 pr-14 py-4 bg-white border border-[#c7c5d4]/40 focus:border-[#15157d] focus:ring-1 focus:ring-[#15157d] rounded-xl shadow-sm transition-all text-sm focus:outline-none"
            />
            <button 
              type="button"
              onClick={triggerVoiceSim}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-[#15157d] hover:bg-slate-100 transition-all active:scale-90"
            >
              <span className="material-symbols-outlined">mic</span>
            </button>
          </form>
        </section>

        {!showEmptyState ? (
          <>
            {/* Trending Tags */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#15157d]">Trending Now</h2>
                <span className="material-symbols-outlined text-orange-500">trending_up</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Elite Cleaning', color: 'bg-[#6ff7ee]/10 text-[#00716b] border-[#6ff7ee]/40' },
                  { label: 'Art Curation', color: 'bg-orange-50 text-orange-700 border-orange-200' },
                  { label: 'Gift Concierge', color: 'bg-[#e1e0ff]/30 text-[#04006d] border-[#c0c1ff]/50' },
                  { label: 'Home Salon', color: 'bg-slate-100 text-slate-600 border-slate-200' },
                  { label: 'Deep Pest Control', color: 'bg-slate-100 text-slate-600 border-slate-200' }
                ].map(tag => (
                  <span 
                    key={tag.label}
                    onClick={() => handleTagClick(tag.label)}
                    className={`px-4 py-2 rounded-full border text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </section>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#15157d]">Recent Searches</h2>
                  <button 
                    onClick={handleClearAll}
                    className="text-xs font-bold text-slate-400 hover:text-[#15157d] transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-[#c7c5d4]/30 divide-y divide-slate-100 overflow-hidden shadow-sm">
                  {recentSearches.map((search, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <div 
                        onClick={() => handleTagClick(search)}
                        className="flex items-center gap-3 flex-grow"
                      >
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-[#15157d] transition-colors">history</span>
                        <p className="text-xs font-bold text-slate-600">{search}</p>
                      </div>
                      <span 
                        onClick={(e) => { e.stopPropagation(); handleDeleteRecent(idx); }}
                        className="material-symbols-outlined text-slate-400 hover:text-red-500 cursor-pointer text-base"
                      >
                        close
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Recommended For You Bento */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#15157d]">Recommended for You</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Based on your luxury service history</p>
                </div>
                <button 
                  onClick={() => onOpenDetailedService('ac_cleaning')}
                  className="flex items-center text-xs font-bold text-[#15157d] gap-1 hover:underline"
                >
                  <span>See All</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px]">
                {/* Large Feature Card */}
                <div className="md:col-span-8 md:row-span-2 relative rounded-2xl overflow-hidden group shadow-md border border-slate-200/50">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt="Luxury interior"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQNXViLmKh9V7Yb8DTTFspW50oNvBq0lKClP4iubNH1vpbhFj7HScRSb3TqOP3gBPG4QGMDURbJ5HAQlPKV1fiQQVlsE0uGmtZg2a0BCibcpB0dJmuOwkSaZrYjplEOAdzS9DZRu1iAZhm5UwPJZuclLAbI6KUMkoHgf7EP52AkWNmARfOj4X6dSVxpSGk5Nu6q9Af7-AmSE90Dcm3sgSx6wtOnnQdd3wfemcsnlHgxYIycwEpQTEySsp-5Gkby7csM20QJKWJmn17"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15157d]/90 via-[#15157d]/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 space-y-2 text-left">
                    <span className="px-3 py-1 bg-[#6ff7ee] text-[#00201e] rounded-full text-[9px] font-black uppercase tracking-wider">PREMIUM</span>
                    <h3 className="text-white font-bold text-lg md:text-xl leading-tight">Master Nest Maintenance</h3>
                    <p className="text-white/80 text-xs max-w-md leading-relaxed opacity-95">Our signature comprehensive care package for sprawling urban residences.</p>
                    <button 
                      onClick={() => onOpenDetailedService('ac_cleaning')}
                      className="mt-3 px-5 py-2 bg-white text-[#15157d] rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors active:scale-95 shadow-md"
                    >
                      Book Assessment
                    </button>
                  </div>
                </div>

                {/* Secondary Small Card */}
                <div 
                  onClick={() => onOpenDetailedService('ac_cleaning')}
                  className="md:col-span-4 md:row-span-1 bg-white border border-[#c7c5d4]/40 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <span className="material-symbols-outlined">featured_seasonal_and_gifts</span>
                    </div>
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider">New Arrival</span>
                  </div>
                  <div className="text-left mt-2">
                    <h4 className="text-sm font-bold text-[#15157d]">Gifting Concierge</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Expertly curated hampers for corporate elite.</p>
                  </div>
                </div>

                {/* Secondary Small Card 2 */}
                <div 
                  onClick={() => onOpenDetailedService('ac_cleaning')}
                  className="md:col-span-4 md:row-span-1 bg-[#15157d] text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <span className="material-symbols-outlined">cleaning_services</span>
                    </div>
                    <span className="text-[#6ff7ee] text-[10px] font-black uppercase tracking-wider">Popular</span>
                  </div>
                  <div className="text-left mt-2">
                    <h4 className="text-sm font-bold text-white">Express Sanitize</h4>
                    <p className="text-[10px] text-[#c0c1ff] mt-0.5">Rapid 2-hour medical-grade sterilization.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Empty State */
          <section className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#15157d]">No services found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                We couldn't find matches for "{query}". Try adjusting your query or browsing our trending categories.
              </p>
            </div>
            <button 
              onClick={handleResetSearch}
              className="px-6 py-2.5 bg-[#15157d] hover:bg-[#2e3192] text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-transform"
            >
              Explore Catalog
            </button>
          </section>
        )}
      </main>

      {/* Voice Search Overlay */}
      {voiceActive && (
        <div className="fixed inset-0 bg-[#15157d]/80 backdrop-blur-xl z-[60] flex flex-col items-center justify-center transition-all duration-300">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center relative shadow-2xl">
            {/* Pulsing voice wave rings */}
            <div className="absolute inset-0 bg-[#15157d]/20 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 bg-[#15157d]/10 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
            <span className="material-symbols-outlined text-[#15157d] text-5xl">mic</span>
          </div>
          <div className="mt-12 text-center text-white space-y-4 px-6">
            <h2 className="text-xl font-bold tracking-wide">Listening...</h2>
            <p className="text-sm text-[#e1e0ff] italic">"I need someone for art curation next Tuesday"</p>
          </div>
          <button 
            onClick={() => setVoiceActive(false)}
            className="mt-16 text-white/50 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full"
          >
            <span className="material-symbols-outlined text-4xl">cancel</span>
          </button>
        </div>
      )}
    </div>
  );
}
