import React, { useState } from 'react';

export default function BundledCheckout({ selectedService, walletBalance, onConfirmCheckout, onCancel, preselectedCandle }) {
  const [step, setStep] = useState(1); // 1: Review & Addons, 2: Payment Method, 3: Processing & Success
  const [selectedAddons, setSelectedAddons] = useState(preselectedCandle ? ['nestmate_candle'] : []);
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // 'wallet' | 'card' | 'upi'
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  // UPI Inputs
  const [upiVpa, setUpiVpa] = useState('arjun.m@okaxis');

  // Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [completedBookingId, setCompletedBookingId] = useState('');

  // Addon Options
  const addonOptions = [
    { id: 'nestmate_candle', title: 'Weekend Recharge Aromatherapy Candle', price: 299, category: 'NestMate' },
    { id: 'a1', title: '1-Hr Professional Maid Support', price: 150, category: 'Cleaning' },
    { id: 'a2', title: 'Eco-Waste Disposal & Scrap Clearance', price: 250, category: 'Repair' },
    { id: 'a3', title: 'Premium Multi-surface Disinfectant Spray', price: 99, category: 'Cleaning' }
  ];

  const handleAddonToggle = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(prev => prev.filter(id => id !== addonId));
    } else {
      setSelectedAddons(prev => [...prev, addonId]);
    }
  };

  // Cost Calculations
  const primaryPrice = selectedService.price;
  const activeAddons = addonOptions.filter(o => selectedAddons.includes(o.id));
  const addonsDiscountedTotal = activeAddons.reduce((sum, item) => sum + (item.price * 0.8), 0);
  const totalCost = primaryPrice + addonsDiscountedTotal;

  const handleProceedToPayment = () => {
    setStep(2);
  };

  const handlePayNow = async () => {
    if (paymentMethod === 'wallet' && walletBalance < totalCost) {
      alert('Insufficient wallet funds! Please select another payment method or top up your wallet.');
      return;
    }

    setStep(3);
    setIsProcessing(true);
    setProcessingStatus('Establishing secure SSL connection...');

    // Step-by-step security processing simulator
    setTimeout(() => {
      setProcessingStatus('Securing gateway transaction using AES-256...');
      setTimeout(() => {
        setProcessingStatus('Verifying payment credentials with issuing bank...');
        setTimeout(async () => {
          try {
            const res = await fetch('/api/bookings', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                primaryService: { title: selectedService.title, price: primaryPrice },
                bundleAddons: activeAddons.map(a => ({ title: a.title, price: a.price })),
                bookingDetails: { date: 'Today', time: 'ASAP' }
              })
            });
            const data = await res.json();
            if (data.success) {
              setCompletedBookingId(data.bookingId);
              setIsProcessing(false);
            } else {
              throw new Error(data.error || 'Failed to confirm booking.');
            }
          } catch (err) {
            console.error(err);
            alert('Booking transaction failed. Please check backend connection.');
            setStep(2);
          }
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleSuccessDone = () => {
    onConfirmCheckout(totalCost, completedBookingId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden animate-scaleIn text-left text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex justify-between items-center bg-slate-950">
          <div>
            <h3 className="text-sm font-black text-slate-100 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-[#f5921c]">shield</span>
              <span>Secure checkout</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Step {step} of 3 &bull; Payment Processing Console</p>
          </div>
          {step < 3 && (
            <button 
              onClick={onCancel}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Wizard Step Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">

          {/* STEP 1: REVIEW & ADDONS */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Primary Service Summary */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-1">
                <span className="text-[8px] font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-800/50 px-2 py-0.5 rounded-full uppercase tracking-wider">Primary Service</span>
                <div className="flex justify-between items-start pt-1">
                  <h4 className="text-xs font-black text-slate-100">{selectedService.title}</h4>
                  <span className="text-xs font-extrabold text-slate-100">₹{primaryPrice}</span>
                </div>
              </div>

              {/* Contextual Recommendations */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Suggested Add-ons</h4>
                  <span className="text-[9px] font-bold text-blue-400 bg-blue-950/80 border border-blue-800/50 px-2 py-0.5 rounded-full uppercase">⚡ Save 20% on Bundle</span>
                </div>
                
                <div className="space-y-2">
                  {addonOptions.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => handleAddonToggle(addon.id)}
                        className={`w-full flex items-center gap-3 rounded-2xl p-3 border text-left text-xs transition-all ${
                          isChecked 
                            ? 'border-indigo-500 bg-indigo-950/30' 
                            : 'border-slate-800 bg-slate-950/30 hover:bg-slate-950'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[18px] font-bold shrink-0 ${
                          isChecked ? 'text-indigo-400' : 'text-slate-600'
                        }`}>
                          {isChecked ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <div className="flex-grow min-w-0">
                          <p className="font-bold text-slate-200 truncate">{addon.title}</p>
                          <p className="text-[9px] text-slate-400 font-semibold uppercase">{addon.category}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="line-through text-slate-500 text-[9px] block">₹{addon.price}</span>
                          <span className="font-extrabold text-blue-400">₹{(addon.price * 0.8).toFixed(2)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT PORTAL */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Payment Methods Tabs */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">Select Payment Option</h4>
                
                <div className="grid grid-cols-3 gap-2">
                  {/* Wallet */}
                  <button
                    onClick={() => setPaymentMethod('wallet')}
                    className={`py-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'wallet' 
                        ? 'border-indigo-500 bg-indigo-950/40 text-white' 
                        : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                    <span className="text-[10px] font-bold leading-none">Wallet</span>
                  </button>

                  {/* Card */}
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-indigo-500 bg-indigo-950/40 text-white' 
                        : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                    <span className="text-[10px] font-bold leading-none">Credit Card</span>
                  </button>

                  {/* UPI */}
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'upi' 
                        ? 'border-indigo-500 bg-indigo-950/40 text-white' 
                        : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                    <span className="text-[10px] font-bold leading-none">Unified UPI</span>
                  </button>
                </div>
              </div>

              {/* Wallet Info Panel */}
              {paymentMethod === 'wallet' && (
                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">NestMate Wallet Balance:</span>
                    <span className="font-extrabold text-[#6ff7ee]">₹{walletBalance.toFixed(2)}</span>
                  </div>
                  {walletBalance < totalCost ? (
                    <p className="text-[10px] text-red-400 font-semibold">Insufficient funds. Add money in payments or choose card/UPI option.</p>
                  ) : (
                    <p className="text-[10px] text-[#006a65] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Secure direct checkout active.
                    </p>
                  )}
                </div>
              )}

              {/* Card Inputs Form with Flip Preview */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  {/* Small Animated Card Preview */}
                  <div className="w-[280px] h-[160px] mx-auto perspective relative">
                    <div 
                      className={`w-full h-full rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-950 text-white p-4 shadow-lg flex flex-col justify-between transition-transform duration-500 transform-style absolute inset-0 ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                      style={{
                        transform: isFlipped ? 'rotateY(180deg)' : 'none',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <div className="flex justify-between items-center text-[10px] tracking-wider font-bold">
                        <span>Visa / Mastercard</span>
                        <span className="material-symbols-outlined text-[16px]">contactless</span>
                      </div>
                      <div className="text-center font-mono text-base tracking-widest py-2">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      <div className="flex justify-between items-end text-[9px]">
                        <div>
                          <p className="text-indigo-300 uppercase leading-none mb-1">Holder</p>
                          <p className="font-bold">{cardHolder || 'ARJUN MALHOTRA'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-indigo-300 uppercase leading-none mb-1">Expiry</p>
                          <p className="font-bold">{cardExpiry || 'MM/YY'}</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`w-full h-full rounded-2xl bg-slate-900 text-white shadow-lg flex flex-col justify-between transition-transform duration-500 transform-style absolute inset-0 ${
                        isFlipped ? '' : 'rotate-y-180'
                      }`}
                      style={{
                        transform: isFlipped ? 'none' : 'rotateY(180deg)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <div className="h-8 bg-slate-800 w-full mt-3"></div>
                      <div className="px-4 py-2 flex justify-end items-center gap-1">
                        <span className="text-[8px] text-indigo-300 uppercase font-semibold">CVV</span>
                        <div className="bg-white text-slate-800 font-mono text-xs font-bold px-2.5 py-0.5 rounded">
                          {cardCvv || '•••'}
                        </div>
                      </div>
                      <div className="px-4 pb-3 text-[6px] text-slate-600 text-center">
                        Secure PCI Tokenized Representation
                      </div>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-3 text-xs font-bold text-slate-400">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="cardN">Card Number</label>
                      <input
                        id="cardN"
                        type="text"
                        maxLength={16}
                        value={cardNumber}
                        onFocus={() => setIsFlipped(false)}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="4000 1234 5678 9010"
                        className="w-full h-10 px-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="exp">Expiry Date</label>
                        <input
                          id="exp"
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onFocus={() => setIsFlipped(false)}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full h-10 px-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          id="cvv"
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onFocus={() => setIsFlipped(true)}
                          onBlur={() => setIsFlipped(false)}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full h-10 px-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Info Panel */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5 text-xs font-bold text-slate-400">
                    <label htmlFor="vpa">Virtual Payment Address (VPA)</label>
                    <input
                      id="vpa"
                      type="text"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      placeholder="arjun.m@okaxis"
                      className="w-full h-11 px-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                  <div className="bg-slate-950 p-4 border border-slate-800 rounded-2xl flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#6ff7ee] text-[18px]">verified_user</span>
                    <p className="text-[10px] text-slate-400 leading-normal">You will receive a secure authorization request on your Google Pay / PhonePe app to approve the transaction.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PROCESSING & SUCCESS */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
              {isProcessing ? (
                <>
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-[#6ff7ee] animate-spin flex items-center justify-center"></div>
                    <span className="material-symbols-outlined text-white text-[32px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">lock</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-100">Securing Payment...</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[280px]">{processingStatus}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-[#6ff7ee]/10 text-[#6ff7ee] border-2 border-[#6ff7ee]/40 rounded-full flex items-center justify-center animate-scaleIn shadow-lg shadow-[#6ff7ee]/5">
                    <span className="material-symbols-outlined text-[42px]" style={{ fontVariationSettings: "'wght' 700" }}>check_circle</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-black text-slate-100">Booking Confirmed!</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[280px]">
                      Your domestic service context has been encrypted and saved under ID <span className="font-mono font-bold text-white bg-slate-850 px-2 py-0.5 border border-slate-850/50 rounded">{completedBookingId}</span>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="w-full bg-slate-950 p-4 border border-slate-800/80 rounded-2xl space-y-2 text-xs text-left">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-400">Transaction Mode:</span>
                      <span className="text-slate-200 capitalize">{paymentMethod} (Secure)</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-400">Total Deducted:</span>
                      <span className="text-[#6ff7ee] font-black">₹{totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Cost summary and actions footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-4">
          {step < 3 && (
            <div className="space-y-1.5 text-xs font-semibold text-slate-400">
              <div className="flex justify-between">
                <span>Primary Chores Subtotal:</span>
                <span className="text-slate-200">₹{primaryPrice.toFixed(2)}</span>
              </div>
              {activeAddons.length > 0 && (
                <div className="flex justify-between text-blue-400">
                  <span>Bundled Extra (20% Discount):</span>
                  <span>+₹{addonsDiscountedTotal.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-black text-slate-200">
                <span>Total Payment Due:</span>
                <span className="text-indigo-400">₹{totalCost.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 justify-end">
            {step === 1 && (
              <>
                <button
                  onClick={onCancel}
                  className="rounded-xl px-6 py-3 text-xs font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToPayment}
                  className="rounded-xl px-6 py-3 text-xs font-bold text-[#04006d] bg-[#6ff7ee] hover:bg-[#5be2d9] transition-colors shadow-md flex items-center gap-0.5"
                >
                  <span>Select Payment</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl px-6 py-3 text-xs font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePayNow}
                  className="rounded-xl px-6 py-3 text-xs font-bold text-white bg-[#15157d] hover:bg-[#2e3192] transition-colors shadow-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Pay ₹{totalCost.toFixed(2)} Securely</span>
                </button>
              </>
            )}

            {step === 3 && !isProcessing && (
              <button
                onClick={handleSuccessDone}
                className="w-full rounded-xl py-3.5 text-xs font-black text-[#04006d] bg-[#6ff7ee] hover:bg-[#5be2d9] transition-colors shadow-md text-center"
              >
                Go to Booking Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
