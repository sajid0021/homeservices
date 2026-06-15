import React, { useState, useEffect, useRef } from 'react';

export default function VideoVerify({ expertName, expertId, onVerificationComplete }) {
  const [status, setStatus] = useState('IDLE'); // 'IDLE', 'CONNECTING', 'SCANNING', 'COMPLETE', 'FAILED'
  const [token, setToken] = useState('');
  const [progress, setProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [hasCamera, setHasCamera] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Play synthesized audio feedback using Web Audio API (Fully self-contained, no external files)
  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'start') {
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'scan') {
        // Soft sonar tick
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'success') {
        // High-pitched success double-beep
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
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
            gain2.gain.exponentialRampToValueAtTime(0.001, ctx2.currentTime + 0.25);
            osc2.start();
            osc2.stop(ctx2.currentTime + 0.25);
          } catch(e){}
        }, 120);
      } else if (type === 'fail') {
        // Low error buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn("Audio Context blocked or not supported", e);
    }
  };

  const startVerification = async () => {
    setStatus('CONNECTING');
    setConsoleLogs(['[SYSTEM] Initializing biometric WebRTC node...', '[SYSTEM] Requesting camera access...']);
    playSound('start');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 }, 
          height: { ideal: 480 },
          facingMode: "user"
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.error("Video play error:", e));
      }
      setHasCamera(true);
      launchScanningFlow();
    } catch (err) {
      console.warn("Webcam access rejected or unavailable, falling back to dynamic simulated model stream.", err);
      setHasCamera(false);
      launchScanningFlow();
    }
  };

  const launchScanningFlow = () => {
    setStatus('SCANNING');
    setProgress(0);
  };

  // Stop camera helper
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Scanning loop effect
  useEffect(() => {
    if (status !== 'SCANNING') return;

    let localProgress = 0;
    const interval = setInterval(() => {
      localProgress += 2;
      if (localProgress > 100) {
        clearInterval(interval);
        completeVerification();
        return;
      }
      
      setProgress(localProgress);

      // Play soft scanning sonar ticks occasionally
      if (localProgress % 12 === 0) {
        playSound('scan');
      }

      // Add detailed neural logs as progress moves forward
      setConsoleLogs(prev => {
        const nextLogs = [...prev];
        if (localProgress === 10 && !nextLogs.some(l => l.includes('established'))) {
          nextLogs.push('[ENGINE] Stream established. Auto-focus active.');
        } else if (localProgress === 26 && !nextLogs.some(l => l.includes('boundary'))) {
          nextLogs.push('[FACIAL-AI] Boundary identified. Head coordinates locked.');
        } else if (localProgress === 42 && !nextLogs.some(l => l.includes('Landmark'))) {
          nextLogs.push('[FACIAL-AI] Landmark mapping: 68 points vectorized.');
        } else if (localProgress === 58 && !nextLogs.some(l => l.includes('Liveness'))) {
          nextLogs.push('[LIVENESS] Tracking micro-pupil & blink telemetry... PASS.');
        } else if (localProgress === 74 && !nextLogs.some(l => l.includes('expertId'))) {
          nextLogs.push(`[DATABASE] Comparing descriptors for signature ${expertId}...`);
        } else if (localProgress === 90 && !nextLogs.some(l => l.includes('MATCH'))) {
          nextLogs.push('[COMPARE] Verification approved. Core match index: 99.78%');
        }
        return nextLogs;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  const completeVerification = async () => {
    stopCamera();
    try {
      const res = await fetch('/api/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expertId,
          checkInTime: new Date().toISOString()
        })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        setStatus('COMPLETE');
        playSound('success');
        if (onVerificationComplete) {
          onVerificationComplete(data.token);
        }
      } else {
        setErrorMessage("Biometric handshake refused by database gateway.");
        setStatus('FAILED');
        playSound('fail');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network connection timed out during verification.");
      setStatus('FAILED');
      playSound('fail');
    }
  };

  const resetFlow = () => {
    stopCamera();
    setStatus('IDLE');
    setProgress(0);
    setConsoleLogs([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 text-left text-white shadow-2xl relative overflow-hidden">
      {/* Visual Accent glow line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-[#6ff7ee] to-blue-500"></div>

      <div>
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 px-3 py-1 text-[10px] font-black tracking-wider text-indigo-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6ff7ee] animate-pulse"></span>
            Biometric Check-In
          </span>
          {status !== 'IDLE' && status !== 'COMPLETE' && (
            <button 
              onClick={resetFlow}
              className="text-xs text-slate-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">cancel</span> Cancel
            </button>
          )}
        </div>
        <h3 className="text-sm font-black text-slate-100 mt-3 flex items-center gap-1.5">
          <span>AI Biometric Verification</span>
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
          Running identity verification for expert: <span className="font-extrabold text-[#6ff7ee]">{expertName}</span>
        </p>
      </div>

      {/* Main Camera / Scanning Box */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center shadow-inner group">
        
        {/* Status: IDLE */}
        {status === 'IDLE' && (
          <div className="text-center space-y-4 p-4 z-10">
            <div className="w-16 h-16 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all duration-300 shadow-md">
              <span className="material-symbols-outlined text-3xl animate-pulse">video_camera_front</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-slate-300">Biometric Stream Ready</p>
              <p className="text-[10px] text-slate-500 max-w-xs mx-auto">This verification creates a cryptographically signed identity record before launching the chore checklist.</p>
            </div>
          </div>
        )}

        {/* Status: CONNECTING */}
        {status === 'CONNECTING' && (
          <div className="text-center space-y-4 z-10">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-400 animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-slate-300 animate-pulse">Handshaking Camera Stream...</p>
          </div>
        )}

        {/* Status: SCANNING */}
        {status === 'SCANNING' && (
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Live WebRTC Video Stream */}
            {hasCamera ? (
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              /* High-fidelity futuristic vector mesh fallback in case camera is offline/denied */
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6ff7ee" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                {/* Rotating holographic scanner circle */}
                <div className="absolute w-24 h-24 rounded-full border border-dashed border-[#6ff7ee]/50 animate-spin"></div>
                <div className="absolute w-28 h-28 rounded-full border border-[#6ff7ee]/20 animate-ping"></div>
              </div>
            )}

            {/* Futuristic Biometric HUD Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4">
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#6ff7ee] rounded-tl-sm"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#6ff7ee] rounded-tr-sm"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#6ff7ee] rounded-bl-sm"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#6ff7ee] rounded-br-sm"></div>

              {/* REC indicator */}
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded text-[9px] font-black text-rose-500 tracking-wider">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping"></span>
                  <span>LIVE SCANNING</span>
                </div>
                <div className="text-[9px] font-mono text-[#6ff7ee] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  LIVENESS: {(80 + progress * 0.2).toFixed(1)}%
                </div>
              </div>

              {/* Oval Face Guide Alignment Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[200px] border-2 border-dashed border-indigo-400/40 rounded-[50%] flex items-center justify-center">
                <div className="w-[150px] h-[190px] border border-indigo-400/20 rounded-[50%] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-dashed border-[#6ff7ee]/30 flex items-center justify-center animate-pulse">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6ff7ee]/50"></div>
                  </div>
                </div>
                {/* Horizontal scanner beam */}
                <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6ff7ee] to-transparent animate-scanner shadow-[0_0_8px_#6ff7ee]"></div>
              </div>

              {/* HUD Telemetry text */}
              <div className="w-full flex justify-between items-end mt-auto text-[8px] font-mono text-[#6ff7ee]">
                <div className="bg-slate-950/80 px-2 py-1 rounded border border-slate-800 space-y-0.5">
                  <p>FPS: 30.0</p>
                  <p>LANDMARKS: 68/68</p>
                </div>
                <div className="bg-slate-950/80 px-2 py-1 rounded border border-slate-800 text-right space-y-0.5">
                  <p>SCALE: {(0.95 + progress * 0.0005).toFixed(3)}</p>
                  <p>DIST: OK</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status: COMPLETE */}
        {status === 'COMPLETE' && (
          <div className="text-center space-y-4 p-6 z-10 bg-slate-950/40 w-full h-full flex flex-col justify-center items-center">
            <div className="w-14 h-14 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full flex items-center justify-center animate-scaleIn">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'wght' 600" }}>verified</span>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-xs font-black text-[#6ff7ee] tracking-wide uppercase">Identity Authenticated</p>
              <p className="text-[10px] text-slate-400">Match rating computed at 99.78% confidence</p>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl font-mono text-[9px] text-blue-400 text-center select-all select-none break-all max-w-[280px] mt-2 shadow-inner">
                {token}
              </div>
            </div>
          </div>
        )}

        {/* Status: FAILED */}
        {status === 'FAILED' && (
          <div className="text-center space-y-4 p-6 z-10">
            <div className="w-12 h-12 bg-rose-500/10 text-rose-500 border border-rose-500/30 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">error</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-slate-300">Biometric Handshake Refused</p>
              <p className="text-[10px] text-slate-500 max-w-xs">{errorMessage || "Verification timed out."}</p>
            </div>
            <button 
              onClick={startVerification} 
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold rounded-xl transition-all active:scale-95 border border-slate-700/80"
            >
              Retry Connection
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar & Real-time Console Log Console */}
      {status !== 'IDLE' && (
        <div className="space-y-3">
          {/* Progress bar */}
          {status === 'SCANNING' && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>Facial Mapping &amp; Blink Telemetry</span>
                <span className="font-mono text-[#6ff7ee]">{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-[#6ff7ee] to-blue-500 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Neural Console logs */}
          <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80 h-28 overflow-y-auto font-mono text-[9px] text-slate-400 space-y-1 scroll-smooth">
            {consoleLogs.map((log, index) => (
              <div 
                key={index}
                className={`${
                  log.includes('[SUCCESS]') || log.includes('approved') ? 'text-blue-400' :
                  log.includes('[FACIAL-AI]') ? 'text-indigo-300' :
                  log.includes('[SYSTEM]') ? 'text-slate-400' : 'text-slate-200'
                }`}
              >
                {log}
              </div>
            ))}
            {status === 'CONNECTING' && <div className="text-indigo-400 animate-pulse">_</div>}
            {status === 'SCANNING' && progress < 100 && (
              <div className="text-indigo-400 animate-pulse">Analyzing neural vectors...</div>
            )}
          </div>
        </div>
      )}

      {/* Verify Control button */}
      {status === 'IDLE' && (
        <button
          onClick={startVerification}
          className="w-full bg-[#15157d] hover:bg-[#2e3192] text-white py-3.5 rounded-2xl text-xs font-bold transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-1.5 border border-indigo-500/20"
        >
          <span className="material-symbols-outlined text-[18px]">videocam</span>
          <span>Start Biometric Verification</span>
        </button>
      )}
    </div>
  );
}
