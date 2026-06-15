import React, { useState, useEffect, useRef } from 'react';

export default function VerifyOtpView({ phoneNumber, devOtp, onBack, onVerify }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showResend, setShowResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showDevBanner, setShowDevBanner] = useState(true);
  const [currentDevOtp, setCurrentDevOtp] = useState(devOtp);
  const inputsRef = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    // Only accept numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMsg('');

    // Forward focus
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setErrorMsg('');
    fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('A new 6-digit OTP has been sent to your device.');
          setTimeLeft(45);
          setShowResend(false);
          setOtp(['', '', '', '', '', '']);
          inputsRef.current[0]?.focus();
          setCurrentDevOtp(data.devOtp);
          setShowDevBanner(true);
        } else {
          setErrorMsg(data.error || 'Failed to resend OTP.');
        }
      })
      .catch(err => {
        setErrorMsg('Unable to connect to the server.');
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const code = otp.join('');
    if (code.length < 6) {
      setErrorMsg('Please enter a valid 6-digit code.');
      return;
    }
    
    setIsSubmitting(true);
    console.log('Sending OTP verification request to: /api/otp/verify', { phoneNumber, otp: code });
    fetch('/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, otp: code })
    })
      .then(res => {
        console.log('Received response from /api/otp/verify:', res);
        return res.json();
      })
      .then(data => {
        console.log('Parsed data from /api/otp/verify:', data);
        setIsSubmitting(false);
        if (data.success) {
          onVerify(code);
        } else {
          setErrorMsg(data.error || 'Invalid OTP. Please try again.');
        }
      })
      .catch(err => {
        console.error('Fetch error in /api/otp/verify:', err);
        setIsSubmitting(false);
        setErrorMsg('Verification failed.');
      });
  };

  const handleAutoFill = () => {
    if (currentDevOtp) {
      setOtp(currentDevOtp.split(''));
      setTimeout(() => {
        inputsRef.current[5]?.focus();
      }, 50);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex flex-col font-sans overflow-x-hidden relative text-left">
      {/* Dev Mode Simulated SMS Banner */}
      {showDevBanner && currentDevOtp && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-50 animate-slideDown">
          <div className="bg-slate-900/90 text-white rounded-2xl border border-slate-700 shadow-2xl p-4 flex gap-3 backdrop-blur-md">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[20px]">sms</span>
            </div>
            <div className="flex-grow min-w-0 text-xs text-left">
              <div className="flex justify-between items-center mb-1">
                <span className="font-black text-slate-400 uppercase tracking-widest text-[9px]">Messages &bull; Just now</span>
                <button onClick={() => setShowDevBanner(false)} className="text-slate-400 hover:text-white">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <p className="text-slate-200 font-medium">
                [NestMate] Your verification code is <span className="font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">{currentDevOtp}</span>
              </p>
              <button 
                type="button"
                onClick={handleAutoFill}
                className="mt-2 text-[10px] font-black text-[#6ff7ee] bg-[#6ff7ee]/10 hover:bg-[#6ff7ee]/25 px-3 py-1.5 rounded-lg border border-[#6ff7ee]/20 flex items-center gap-1 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-xs">flash_on</span>
                <span>Auto-fill OTP</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Transactional Back Button */}
      <div className="absolute top-8 left-6 md:left-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-[#15157d] transition-colors group"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          <span className="text-sm font-semibold">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 relative">
        <div className="w-full max-w-md">
          {/* Brand Anchor */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-[#15157d] text-white rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-3">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>nest_eco_leaf</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#191c1d] text-center mb-2">Verifying your number...</h1>
            <p className="text-xs md:text-sm text-slate-500 text-center px-4 leading-relaxed">
              We've sent a 6-digit code to +91 {phoneNumber} for secure access to NestMate.
            </p>
          </div>

          {/* Verification Card */}
          <div className="glass-card border border-white/40 shadow-xl rounded-2xl p-6 md:p-8 space-y-8 bg-white/70 backdrop-blur-md">
            {/* OTP Inputs */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-between gap-2 max-w-xs mx-auto">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    ref={(el) => (inputsRef.current[idx] = el)}
                    autoFocus={idx === 0}
                    className="w-10 h-14 md:w-12 md:h-16 text-center text-2xl font-black bg-[#f3f4f5] border border-[#c7c5d4]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15157d] focus:border-transparent transition-all"
                  />
                ))}
              </div>

              {/* Timer & Resend */}
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  Didn't receive the code?{' '}
                  {!showResend ? (
                    <span className="text-[#15157d] font-bold">
                      Resend OTP in <span>{formatTime(timeLeft)}</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-[#006a65] font-bold hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>

              {errorMsg && (
                <div className="text-error font-label-sm text-label-sm text-center bg-error-container/40 p-xs rounded-xl border border-error/20 my-2">
                  {errorMsg}
                </div>
              )}

              {/* Verify Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#15157d] hover:bg-[#2e3192] text-white py-4 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 group text-sm font-bold"
                >
                  {isSubmitting ? (
                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  ) : (
                    <>
                      <span>Verify &amp; Proceed</span>
                      <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Meta */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[#006a65] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Secure AES-256 encrypted verification</span>
            </div>
          </div>
        </div>
      </main>

      {/* Side Decoration (Web Only) */}
      <div className="hidden lg:block fixed right-0 top-0 h-full w-1/4 -z-10 border-l border-slate-200/40">
        <div className="h-full w-full opacity-40 mix-blend-multiply bg-gradient-to-l from-[#6ff7ee]/20 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 bg-white rounded-3xl rotate-12 shadow-2xl p-6 overflow-hidden border border-slate-100">
            <div className="h-full w-full rounded-2xl overflow-hidden bg-slate-100">
              <img 
                className="h-full w-full object-cover" 
                alt="Contemporary room" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQYG-ca7gGKkj-h0Y8rvbdXsmPeWr_TBpnvT7Met-UOo79_mvpeMtlxDX4kYcUQi2CE1mdYn8bZ0Qv6T4tJCXSJHVG1J0Q86BNCx0KdHLGrat1y09tet5IToqMjcT7AUv4uqbibfZQ5_Ikd2-oJoJC1iVuURBem5JPtQWQ2pMbJd66K7nqhJRGdOtUj54edL1o-rOSAn-oZKdhnSyIMN0P5OpkFwxW2txDMgFCPBjRU83OzCreNo7YCm3_RJCPzzX7QnGSQC1zmBn7"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
