import React, { useState } from 'react';

export default function AdminLoginView({ onBack, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'click') {
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
        setTimeout(() => {
          try {
            const ctx2 = new (window.AudioContext || window.webkitAudioContext)();
            const osc2 = ctx2.createOscillator();
            const gain2 = ctx2.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx2.destination);
            osc2.frequency.setValueAtTime(659.25, ctx2.currentTime); // E5
            gain2.gain.setValueAtTime(0.08, ctx2.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.0001, ctx2.currentTime + 0.25);
            osc2.start();
            osc2.stop(ctx2.currentTime + 0.25);
          } catch(e){}
        }, 100);
      } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {}
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    playSound('click');
    setError('');
    
    if (!username || !passcode) {
      setError('Please fill in all security fields.');
      playSound('fail');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (username.trim().toLowerCase() === 'admin' && passcode === 'admin@123') {
        playSound('success');
        onLoginSuccess();
      } else {
        setError('Invalid administrative credentials.');
        playSound('fail');
      }
    }, 800);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col justify-center items-center font-sans px-6 relative text-left">
      {/* Visual Accent glow grid */}
      <div className="absolute inset-0 pattern-bg opacity-5 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-scaleIn">
        {/* Accent gold top bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-[#6ff7ee] to-indigo-500"></div>

        {/* Back navigation button */}
        <button 
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header Title */}
        <div className="text-center mb-8 space-y-2">
          <div className="w-14 h-14 bg-indigo-950 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto text-[#6ff7ee] shadow-inner mb-4">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
          </div>
          <h2 className="text-xl font-black text-slate-100 tracking-tight">NestMate Admin Console</h2>
          <p className="text-[11px] text-slate-400">Authenticate session to launch systems management node.</p>
        </div>

        {/* Login form console */}
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          
          {error && (
            <div className="bg-rose-950/50 border border-rose-800/80 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-300 animate-pulse">
              <span className="material-symbols-outlined shrink-0 text-rose-400">error</span>
              <p className="leading-snug font-bold">{error}</p>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Admin Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-lg">person</span>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (e.g. admin)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl py-3.5 pl-11 pr-4 text-xs font-bold text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Passcode Authorization</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-lg">lock</span>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode (e.g. admin@123)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl py-3.5 pl-11 pr-4 text-xs font-bold text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#15157d] hover:bg-[#2e3192] text-white py-3.5 rounded-2xl text-xs font-bold tracking-wide transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5 border border-indigo-500/20 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full"></div>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Authorize Admin Session</span>
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center mt-8 pt-6 border-t border-slate-800/60">
          <p className="text-[9px] font-bold text-slate-500 tracking-wide uppercase">Secured by AES-256 Bit Encryption</p>
        </div>
      </div>
    </div>
  );
}
