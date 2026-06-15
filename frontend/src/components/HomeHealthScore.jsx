import React from 'react';

export default function HomeHealthScore({ chores, onToggleChore }) {
  const total = chores.length;
  const completed = chores.filter((c) => c.completed).length;
  const score = total > 0 ? Math.round((completed / total) * 100) : 100;

  // SVG parameters for the circular progress ring
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Color mapping based on score levels
  let ringColor = 'stroke-[#15157d]';
  let bgColor = 'bg-[#e1e0ff]/80 text-[#04006d] border-[#c0c1ff]';
  let label = 'Pristine';

  if (score < 50) {
    ringColor = 'stroke-[#ba1a1a]';
    bgColor = 'bg-[#ffdad6]/80 text-[#93000a] border-[#ffdad6]';
    label = 'Critical Maintenance';
  } else if (score < 80) {
    ringColor = 'stroke-[#f5921c]';
    bgColor = 'bg-[#ffdcc0]/80 text-[#2d1600] border-[#ffb875]';
    label = 'Attention Required';
  }

  return (
    <div className="bg-white p-lg rounded-3xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-center gap-lg">
      {/* Circle ring visual */}
      <div className="relative flex-shrink-0 w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle 
            cx="72" 
            cy="72" 
            r={radius} 
            className="stroke-slate-100 fill-none" 
            strokeWidth="10" 
          />
          <circle 
            cx="72" 
            cy="72" 
            r={radius} 
            className={`fill-none transition-all duration-700 ease-out ${ringColor}`} 
            strokeWidth="10" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-slate-800">{score}%</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Health</span>
        </div>
      </div>

      {/* Chores Details */}
      <div className="flex-grow space-y-sm w-full text-left">
        <div>
          <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold border ${bgColor}`}>
            {label}
          </span>
          <h3 className="text-md font-extrabold text-[#15157d] mt-xs">Home Health Dashboard</h3>
          <p className="text-xs text-slate-600">Toggle household safety chores to recalibrate system status.</p>
        </div>

        {/* Task listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
          {chores.map((chore) => (
            <button
              key={chore.id}
              onClick={() => onToggleChore(chore.id)}
              className={`flex items-center gap-xs rounded-xl p-3 border text-left text-xs transition-all ${
                chore.completed 
                  ? 'bg-slate-50 border-slate-200/50 opacity-60' 
                  : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md text-slate-800'
              }`}
            >
              <span className={`material-symbols-outlined text-sm font-bold ${
                chore.completed ? 'text-[#15157d]' : 'text-slate-300'
              }`}>
                {chore.completed ? 'check_box' : 'check_box_outline_blank'}
              </span>
              <div className="flex-grow min-w-0">
                <p className={`font-bold truncate ${chore.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                  {chore.title}
                </p>
                <p className="text-[9px] text-[#006a65] font-bold uppercase">{chore.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
