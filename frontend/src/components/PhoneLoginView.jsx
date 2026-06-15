import React, { useState } from 'react';

export default function PhoneLoginView({ onSendOtp, onBack }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhoneChange = (e) => {
    // Only allow numbers
    const cleanNum = e.target.value.replace(/\D/g, '');
    setPhoneNumber(cleanNum);
    if (cleanNum.length === 10) {
      setHasError(false);
      setErrorMsg('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (phoneNumber.length === 10) {
      setIsSubmitting(true);
      console.log('Sending OTP request to: /api/otp/send', { phoneNumber });
      fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      })
        .then(res => {
          console.log('Received response from /api/otp/send:', res);
          return res.json();
        })
        .then(data => {
          console.log('Parsed data from /api/otp/send:', data);
          setIsSubmitting(false);
          if (data.success) {
            onSendOtp(phoneNumber, data.devOtp);
          } else {
            setErrorMsg(data.error || 'Failed to send OTP.');
            setHasError(true);
          }
        })
        .catch(err => {
          console.error('Fetch error in /api/otp/send:', err);
          setIsSubmitting(false);
          setErrorMsg('Unable to connect to the server.');
          setHasError(true);
        });
    } else {
      setHasError(true);
      setErrorMsg('Invalid phone number! Please enter a 10-digit number.');
      setTimeout(() => setHasError(false), 1000);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col items-center justify-between py-12 selection:bg-secondary-container">
      {/* Top Navigation Branding */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-transparent">
        {onBack ? (
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
            title="Go Back"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <div className="w-10"></div>
        )}
        <div className="font-headline-lg-mobile text-headline-lg-mobile font-extrabold text-primary tracking-tight">
          NestMate
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow w-full max-w-[420px] px-margin-mobile flex flex-col justify-center py-xl mt-12 text-left">
        {/* Welcome Section */}
        <div className="mb-lg space-y-xs">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">Welcome back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Enter your mobile number to get started with your home management concierge.
          </p>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-sm">
          <div className="flex flex-col space-y-xs">
            <label className="font-label-md text-label-md text-on-surface-variant px-1" htmlFor="phone">
              Enter your mobile number
            </label>
            <div 
              className={`flex items-center space-x-2 p-2 bg-surface-container-lowest border rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200 shadow-sm ${
                hasError ? 'border-error animate-shake' : 'border-outline-variant'
              }`}
            >
              {/* Country Selector */}
              <button 
                type="button"
                onClick={() => alert('India (+91) country code selected by default.')}
                className="flex items-center space-x-1 px-2 py-1.5 hover:bg-surface-container-low rounded-lg transition-colors group shrink-0"
              >
                <span className="text-2xl">🇮🇳</span>
                <span className="font-title-lg text-title-lg text-on-surface-variant font-bold">+91</span>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px] group-active:translate-y-0.5 transition-transform">keyboard_arrow_down</span>
              </button>
              
              <div className="h-8 w-[1px] bg-outline-variant shrink-0"></div>
              
              {/* Phone Input */}
              <input 
                id="phone"
                type="tel"
                maxLength="10"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="flex-1 bg-transparent border-none font-title-lg text-title-lg text-on-surface placeholder:text-outline p-2 focus:ring-0 outline-none" 
                placeholder="98765 43210"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="text-error font-label-sm text-label-sm text-center bg-error-container/40 p-xs rounded-xl border border-error/20 my-2">
              {errorMsg}
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-on-primary py-4 rounded-xl font-title-lg text-title-lg shadow-lg active:scale-[0.98] transition-all duration-200 mt-md flex items-center justify-center font-bold ${
              isSubmitting 
                ? 'bg-secondary' 
                : 'bg-primary hover:bg-primary-container hover:text-on-primary-container'
            }`}
          >
            {isSubmitting ? (
              <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
            ) : (
              'Send OTP'
            )}
          </button>
        </form>

        {/* Trust Badges */}
        <div className="mt-xl pt-lg border-t border-outline-variant/30">
          <div className="grid grid-cols-1 gap-sm">
            {/* Badge 1 */}
            <div className="flex items-center space-x-sm p-sm rounded-xl trust-badge-gradient border border-outline-variant/20 bg-gradient-to-br from-slate-50 to-[#edeeef]/40">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <div className="text-left">
                <p className="font-label-md text-label-md text-on-surface font-bold">Secure 256-bit encryption</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Your data is safe with enterprise-grade security.</p>
              </div>
            </div>
            {/* Badge 2 */}
            <div className="flex items-center space-x-sm p-sm rounded-xl trust-badge-gradient border border-outline-variant/20 bg-gradient-to-br from-slate-50 to-[#edeeef]/40">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
              </div>
              <div className="text-left">
                <p className="font-label-md text-label-md text-on-surface font-bold">Privacy Protected</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">We never share your personal information.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Footer */}
        <footer className="mt-lg text-center">
          <p className="font-label-sm text-label-sm text-outline px-4 leading-normal">
            By continuing, you agree to NestMate's {' '}
            <a 
              onClick={(e) => { e.preventDefault(); alert('Terms of Service clicked.'); }}
              className="text-primary hover:underline cursor-pointer"
            >
              Terms of Service
            </a> &amp; {' '}
            <a 
              onClick={(e) => { e.preventDefault(); alert('Privacy Policy clicked.'); }}
              className="text-primary hover:underline cursor-pointer"
            >
              Privacy Policy
            </a>.
          </p>
        </footer>
      </main>
    </div>
  );
}
