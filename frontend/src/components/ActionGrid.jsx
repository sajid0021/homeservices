import React from 'react';

export default function ActionGrid({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'daily', label: 'Daily Help' },
    { id: 'deep', label: 'Home Care' },
    { id: 'gifts', label: 'Gifting' }
  ];

  return (
    <div className="bg-[#2e3192]/40 p-1.5 rounded-full inline-flex gap-1 border border-white/10 backdrop-blur-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
              isActive 
                ? 'bg-[#6ff7ee] text-[#00201e] shadow-sm font-bold' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
