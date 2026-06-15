import React, { useState, useEffect } from 'react';

export default function AdminDashboardView({ bookings, onRefresh, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'providers' | 'biometrics'
  const [overrideLoading, setOverrideLoading] = useState({});
  const [localProviders, setLocalProviders] = useState([
    { id: 'p1', name: 'Seema Rao', service: 'Daily Housekeeping', rating: 4.9, active: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBgyRTWFTz1anff53QNAyqxebFnT_MPHReXYVelfpRI5x9e8aTvPcg2uxjS4FF-dE0uzel43aVXKyMicO0huAVz3KTr_sMEu4GjDPVJekEozRnuAMf7ShiUHJp9bGyqXaPaHITlrGg2xUQUS1hQarrJ6rnYogiQd6fR7m3D5Enp02DPVBw0XWzXUctV0zHxEh17nKmHOIk0IoHqG8EQ8AWdml3f116I-ga4nobL9f5JesHdHTJeoUg5A9HQwCfna4uGtRMYHyPesW' },
    { id: 'p2', name: 'Ramesh Kumar', service: 'Backup Housekeeping', rating: 4.7, active: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcEC4j7Eq7gB_UqK48Q2Zf2npW2u6SUmGXbrOKPJwCW5w9WN4XTJQqkIeeCOKbehQfn3GljB9Gs5K6bA7Bb25PmSuvREMjp0vfO4xaX14leBxkKi5axpUjhi1sQ0cXdgjdzhfFM22feS6RKChe-bYZ1P5cb49dSCho4FHfqHtB191wxv4lXXyriejjMMcz8wlvl_SIhoCQqCS-7IzmdkGhmGftZRuvZt0-WwlJcOpJnZCw4xJgfGpXei_xhDGKKCBP2RjRG2nHdMa-' },
    { id: 'p3', name: 'Anita K.', service: 'Bathroom Cleaning', rating: 4.9, active: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBgyRTWFTz1anff53QNAyqxebFnT_MPHReXYVelfpRI5x9e8aTvPcg2uxjS4FF-dE0uzel43aVXKyMicO0huAVz3KTr_sMEu4GjDPVJekEozRnuAMf7ShiUHJp9bGyqXaPaHITlrGg2xUQUS1hQarrJ6rnYogiQd6fR7m3D5Enp02DPVBw0XWzXUctV0zHxEh17nKmHOIk0IoHqG8EQ8AWdml3f116I-ga4nobL9f5JesHdHTJeoUg5A9HQwCfna4uGtRMYHyPesW' },
    { id: 'p4', name: 'Rohan S.', service: 'AC Maintenance', rating: 4.8, active: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcEC4j7Eq7gB_UqK48Q2Zf2npW2u6SUmGXbrOKPJwCW5w9WN4XTJQqkIeeCOKbehQfn3GljB9Gs5K6bA7Bb25PmSuvREMjp0vfO4xaX14leBxkKi5axpUjhi1sQ0cXdgjdzhfFM22feS6RKChe-bYZ1P5cb49dSCho4FHfqHtB191wxv4lXXyriejjMMcz8wlvl_SIhoCQqCS-7IzmdkGhmGftZRuvZt0-WwlJcOpJnZCw4xJgfGpXei_xhDGKKCBP2RjRG2nHdMa-' }
  ]);
  const [auditLogs, setAuditLogs] = useState([]);

  // Synthesize soft audio confirmation clicks
  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'click') {
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.012, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'tab') {
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {}
  };

  // Populate mock biometric ledger audit records
  useEffect(() => {
    const defaultAudits = bookings
      .filter(b => b.status === 'Completed')
      .map((b, idx) => ({
        id: `BIO-${b.id.split('-')[1] || '0000'}-${100 + idx}`,
        name: b.providerName,
        chore: b.title,
        timestamp: b.date + ' @ ' + b.time,
        confidence: (99.1 + Math.random() * 0.8).toFixed(2),
        signature: `V-TOK-SHA256-${Math.floor(100000 + Math.random() * 900000)}`
      }));
    setAuditLogs(defaultAudits);
  }, [bookings]);

  // Handle dropdown override status API request
  const handleStatusOverride = async (bookingId, newStatus) => {
    playSound('success');
    setOverrideLoading(prev => ({ ...prev, [bookingId]: true }));

    try {
      const res = await fetch('/api/bookings/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bookingId, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        onRefresh(); // Trigger parent poll/state update
      } else {
        alert("Status override failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Network exception modifying state machine.");
    } finally {
      setOverrideLoading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  // Toggle active status of preferred workforce
  const handleToggleProviderActive = (providerId) => {
    playSound('click');
    setLocalProviders(prev => 
      prev.map(p => p.id === providerId ? { ...p, active: !p.active } : p)
    );
  };

  const changeTab = (tabName) => {
    playSound('tab');
    setActiveTab(tabName);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'Partner Assigned': return 'bg-indigo-950/60 text-indigo-300 border-indigo-900/40 animate-pulse';
      case 'Arrived': return 'bg-amber-950/60 text-amber-300 border-amber-900/40';
      case 'In Progress': return 'bg-blue-950/60 text-blue-300 border-blue-900/40';
      case 'Completed': return 'bg-sky-950/60 text-sky-300 border-sky-900/40';
      default: return 'bg-slate-900 text-slate-400 border-slate-800';
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans text-left relative pb-24 selection:bg-indigo-500/20">
      {/* HUD background pattern */}
      <div className="absolute inset-0 pattern-bg opacity-5 pointer-events-none"></div>

      {/* Main Admin Header Panel */}
      <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 w-full z-40 h-16 flex items-center px-6">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950 flex items-center justify-center text-[#6ff7ee] border border-purple-500/20 shadow-inner">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-slate-100 block">NestMate HQ</span>
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block mt-0.5">Admin Console</span>
            </div>
          </div>
          
          <button 
            onClick={() => {
              playSound('click');
              onLogout();
            }}
            className="rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all active:scale-95 border border-slate-700/80 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Return to User Client</span>
          </button>
        </div>
      </header>

      {/* Admin dashboard layout */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 space-y-6 relative z-10">
        
        {/* Top Tab Switcher */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800/80 max-w-2xl">
          {[
            { id: 'overview', label: 'Systems Status', icon: 'monitoring' },
            { id: 'bookings', label: 'Chore Lifecycle', icon: 'orders' },
            { id: 'providers', label: 'Partner Roster', icon: 'groups' },
            { id: 'biometrics', label: 'Biometrics Ledgers', icon: 'badge' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => changeTab(tab.id)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab.id 
                  ? 'bg-[#15157d] text-white shadow-lg border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-scaleIn">
            {/* KPI grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Active Operations</span>
                <div className="text-3xl font-black text-slate-100">{bookings.filter(b => b.status !== 'Completed').length}</div>
                <p className="text-[10px] text-slate-400">Bookings in matching or progress</p>
                <div className="absolute right-4 bottom-4 text-slate-800"><span className="material-symbols-outlined text-4xl">sync</span></div>
              </div>
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Partner Roster</span>
                <div className="text-3xl font-black text-slate-100">{localProviders.filter(p => p.active).length} / {localProviders.length}</div>
                <p className="text-[10px] text-slate-400">Active verification-locked partners</p>
                <div className="absolute right-4 bottom-4 text-slate-800"><span className="material-symbols-outlined text-4xl">groups</span></div>
              </div>
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">System Uptime</span>
                <div className="text-3xl font-black text-blue-400">99.99%</div>
                <p className="text-[10px] text-slate-400">All gateway operations online</p>
                <div className="absolute right-4 bottom-4 text-slate-800"><span className="material-symbols-outlined text-4xl text-blue-900/20">check_circle</span></div>
              </div>
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Verification Audits</span>
                <div className="text-3xl font-black text-[#6ff7ee]">{auditLogs.length}</div>
                <p className="text-[10px] text-slate-400">Biometric handshakes registered</p>
                <div className="absolute right-4 bottom-4 text-slate-800"><span className="material-symbols-outlined text-4xl text-[#6ff7ee]/10">verified_user</span></div>
              </div>
            </div>

            {/* Simulated Server Event log ticker */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Real-time Gateway Logs</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Audits server-side lifecycle event triggers and overrides.</p>
              </div>
              
              <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 h-60 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-2 shadow-inner">
                <div>[SYSTEM] NestMate administration socket connected successfully.</div>
                <div>[SYSTEM] Pulling workforcePreferred roster... Node size: {localProviders.length}.</div>
                {bookings.map(b => (
                  <div key={b.id} className="text-slate-300">
                    [{new Date(b.lastUpdated).toLocaleTimeString()}] Booking {b.id} ({b.title}): State set to <span className="text-indigo-400 font-bold">{b.status}</span>. Partner: {b.providerName}.
                  </div>
                ))}
                <div className="text-blue-400 animate-pulse">[GATEWAY LOGS ACTIVE - WATCHING SOCKET TELEMETRY]</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: ACTIVE BOOKINGS MANAGER */}
        {activeTab === 'bookings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-scaleIn">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Chore Lifecycle Override Console</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Manually advance the status of active requests to test the user's Live Map Tracking or scan receipts.</p>
            </div>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold text-[9px] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Order Ref</th>
                    <th className="px-4 py-3 text-left">Chore Title</th>
                    <th className="px-4 py-3 text-left">Assigned Provider</th>
                    <th className="px-4 py-3 text-center">Current Status</th>
                    <th className="px-4 py-3 text-center">Override Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-slate-500">No bookings registered on database.</td>
                    </tr>
                  ) : (
                    bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-slate-850/40">
                        <td className="px-4 py-4 font-mono font-bold text-indigo-400">{booking.id}</td>
                        <td className="px-4 py-4 font-bold">{booking.title}</td>
                        <td className="px-4 py-4 text-slate-400">{booking.providerName}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold border ${getStatusClass(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {overrideLoading[booking.id] ? (
                            <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent animate-spin rounded-full mx-auto"></div>
                          ) : (
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusOverride(booking.id, e.target.value)}
                              className="bg-slate-950 border border-slate-850 focus:border-indigo-500 rounded-lg px-2.5 py-1 text-[10px] font-bold text-slate-200 outline-none cursor-pointer"
                            >
                              <option value="Scheduled">Scheduled</option>
                              <option value="Partner Assigned">Partner Assigned</option>
                              <option value="Arrived">Arrived</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: PROVIDER ROSTER */}
        {activeTab === 'providers' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-scaleIn">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Professional Roster Management</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Audit ratings, roles, and toggle provider availability statuses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localProviders.map(provider => (
                <div 
                  key={provider.id}
                  className="bg-slate-950 border border-slate-805 rounded-2xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-800 bg-slate-900 shrink-0">
                      <img alt="Provider" className="w-full h-full object-cover" src={provider.avatar} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-200">{provider.name}</h4>
                      <p className="text-[10px] text-slate-500">{provider.service} &bull; Rating: {provider.rating}⭐</p>
                      <span className="text-[8px] bg-indigo-950 border border-indigo-900 px-2 py-0.5 rounded text-indigo-300 font-mono mt-1 inline-block uppercase">
                        Biometric Locked
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${
                      provider.active ? 'text-blue-400' : 'text-slate-500'
                    }`}>
                      {provider.active ? 'Active' : 'Suspended'}
                    </span>
                    <button
                      onClick={() => handleToggleProviderActive(provider.id)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        provider.active ? 'bg-indigo-600' : 'bg-slate-800'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        provider.active ? 'translate-x-5' : 'translate-x-0'
                      }`}></span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: BIOMETRIC SESSIONS LEDGER */}
        {activeTab === 'biometrics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-scaleIn">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Biometric Check-in Audit Ledger</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Validates historical cryptographic signatures generated during video check-in streams.</p>
            </div>

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold text-[9px] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Audit Ref ID</th>
                    <th className="px-4 py-3 text-left">Specialist Name</th>
                    <th className="px-4 py-3 text-left">Target Chore</th>
                    <th className="px-4 py-3 text-center">Biometric Match</th>
                    <th className="px-4 py-3 text-center">Session Handshake Signature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-slate-500">No biometric records generated. Mark active orders as completed to populate.</td>
                    </tr>
                  ) : (
                    auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-850/40">
                        <td className="px-4 py-4 font-mono text-indigo-400 font-bold">{log.id}</td>
                        <td className="px-4 py-4 font-bold text-slate-200">{log.name}</td>
                        <td className="px-4 py-4 text-slate-400">{log.chore}</td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-xs font-black text-blue-400">{log.confidence}% MATCH</span>
                        </td>
                        <td className="px-4 py-4 text-center font-mono text-[9px] text-[#6ff7ee]">{log.signature}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
