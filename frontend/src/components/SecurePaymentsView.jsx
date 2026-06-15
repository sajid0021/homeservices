import React, { useState } from 'react';

export default function SecurePaymentsView({ walletBalance, onTopUp, onBack }) {
  const [topUpAmount, setTopUpAmount] = useState('500');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const [savedCards, setSavedCards] = useState([
    { id: 'c1', type: 'visa', bank: 'HDFC Bank', masked: '•••• •••• •••• 4821', expiry: '09/29' },
    { id: 'c2', type: 'mastercard', bank: 'ICICI Bank', masked: '•••• •••• •••• 8830', expiry: '12/28' }
  ]);

  const [savedUpis, setSavedUpis] = useState([
    { id: 'u1', name: 'Google Pay', handle: 'arjun.m@okaxis' },
    { id: 'u2', name: 'PhonePe', handle: 'arjunmalhotra@ybl' }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 't1', desc: 'Top up Wallet (Secure NetBanking)', type: 'credit', amt: 500, date: 'Today' },
    { id: 't2', desc: 'Booking NM-98231 (Bathroom Sanitization)', type: 'debit', amt: 1149, date: 'Jun 10, 2026' },
    { id: 't3', desc: 'Booking NM-91283 (AC Filter Check)', type: 'debit', amt: 850, date: 'May 28, 2026' }
  ]);

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setIsProcessing(true);
    // Simulate secure 3D-secure redirection delay
    setTimeout(() => {
      onTopUp(amt);
      setTransactions(prev => [
        { id: `t-top-${Date.now()}`, desc: 'Top up Wallet (Secure UPI)', type: 'credit', amt, date: 'Just now' },
        ...prev
      ]);
      setIsProcessing(false);
      alert(`Payment Successful! ₹${amt.toFixed(2)} added securely to your NestMate wallet.`);
    }, 2000);
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !cardExpiry || !cardCvv) {
      alert('Please complete all card details.');
      return;
    }

    const masked = `•••• •••• •••• ${cardNumber.slice(-4)}`;
    const newCard = {
      id: `c-add-${Date.now()}`,
      type: cardNumber.startsWith('4') ? 'visa' : 'mastercard',
      bank: 'SBI Card',
      masked,
      expiry: cardExpiry
    };

    setSavedCards(prev => [...prev, newCard]);
    setShowAddCard(false);
    // Reset fields
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvv('');
    alert('Card saved securely under PCI-DSS tokenization compliance.');
  };

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex flex-col font-sans relative text-left">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 w-full z-40 border-b border-[#c7c5d4]/30 shadow-sm h-16 flex items-center">
        <div className="flex justify-between items-center px-6 w-full max-w-7xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-[#15157d] transition-colors group">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            <span className="text-sm font-semibold">Back</span>
          </button>
          <h1 className="text-base font-black text-slate-800">Secure Payments</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-6 py-8 space-y-6">
        
        {/* Secure Wallet Card */}
        <section className="bg-gradient-to-br from-[#15157d] to-[#2e3192] rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-48 h-48 bg-white/5 rounded-full pointer-events-none"></div>
          <div className="absolute left-10 top-2 w-32 h-32 bg-white/5 rounded-full pointer-events-none"></div>

          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Active Wallet Balance</p>
                <h2 className="text-3xl font-black mt-1">₹{walletBalance.toFixed(2)}</h2>
              </div>
              <span className="material-symbols-outlined text-white/40 text-[40px]">account_balance_wallet</span>
            </div>

            {/* Quick Secure Top Up Form */}
            <form onSubmit={handleTopUpSubmit} className="pt-4 border-t border-white/10 space-y-3">
              <label className="block text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Secure Quick Top-Up</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="Enter Amount"
                    disabled={isProcessing}
                    className="w-full h-11 pl-8 pr-4 bg-white text-slate-800 rounded-xl font-bold focus:outline-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-[#6ff7ee] hover:bg-[#5be2d9] text-[#004d49] font-bold px-6 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 shrink-0 active:scale-95 transform shadow-md"
                >
                  {isProcessing ? (
                    <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      <span>Pay Securely</span>
                    </>
                  )}
                </button>
              </div>

              {/* Amount Shortcuts */}
              <div className="flex gap-2">
                {['200', '500', '1000', '2000'].map(amt => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setTopUpAmount(amt)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold border transition-colors ${
                      topUpAmount === amt 
                        ? 'bg-white/20 border-white text-white' 
                        : 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10'
                    }`}
                  >
                    + ₹{amt}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </section>

        {/* Security Seals */}
        <section className="grid grid-cols-3 gap-2 bg-[#e1e0ff]/20 border border-slate-200/50 rounded-2xl p-4 text-center">
          <div className="space-y-1 flex flex-col items-center">
            <span className="material-symbols-outlined text-[#15157d] text-[20px]">verified</span>
            <span className="text-[9px] font-black text-slate-700 uppercase leading-none">PCI-DSS Level 1</span>
          </div>
          <div className="space-y-1 border-x border-slate-200 flex flex-col items-center">
            <span className="material-symbols-outlined text-[#15157d] text-[20px]">lock_open</span>
            <span className="text-[9px] font-black text-slate-700 uppercase leading-none">SSL 256-Bit</span>
          </div>
          <div className="space-y-1 flex flex-col items-center">
            <span className="material-symbols-outlined text-[#15157d] text-[20px]">security</span>
            <span className="text-[9px] font-black text-slate-700 uppercase leading-none">3D Secure v2</span>
          </div>
        </section>

        {/* Saved Methods */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Saved Cards &amp; UPI</h3>
            <button 
              onClick={() => setShowAddCard(!showAddCard)}
              className="text-xs font-bold text-[#15157d] hover:underline flex items-center gap-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">{showAddCard ? 'remove' : 'add'}</span>
              <span>{showAddCard ? 'Cancel Card' : 'Add Card'}</span>
            </button>
          </div>

          {/* Interactive Card Form Drawer */}
          {showAddCard && (
            <form onSubmit={handleAddCardSubmit} className="bg-white rounded-3xl border border-slate-200/50 p-6 shadow-sm space-y-6 animate-slideDown">
              {/* Credit Card Preview Animation */}
              <div className="w-full max-w-[320px] h-[190px] mx-auto perspective relative">
                <div 
                  className={`w-full h-full rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-[#15157d] text-white p-5 shadow-lg flex flex-col justify-between transition-transform duration-500 transform-style absolute inset-0 ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'none',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold italic tracking-widest text-indigo-300">NestMate Card</span>
                    <span className="material-symbols-outlined text-indigo-200">contactless</span>
                  </div>
                  
                  {/* Card Number */}
                  <div className="text-center font-mono text-lg tracking-widest py-3">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  {/* Card Footer Info */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] text-indigo-300 uppercase tracking-wider font-semibold">Card Holder</p>
                      <p className="text-xs font-bold tracking-wide">{cardHolder || 'FULL NAME'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-indigo-300 uppercase tracking-wider font-semibold">Expires</p>
                      <p className="text-xs font-bold tracking-wide">{cardExpiry || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>

                {/* Back side of the credit card preview */}
                <div 
                  className={`w-full h-full rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white shadow-lg flex flex-col justify-between transition-transform duration-500 transform-style absolute inset-0 ${
                    isFlipped ? '' : 'rotate-y-180'
                  }`}
                  style={{
                    transform: isFlipped ? 'none' : 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="h-10 bg-slate-800 w-full mt-4"></div>
                  <div className="px-5 py-3 flex justify-end items-center gap-2">
                    <div className="text-right">
                      <span className="text-[8px] text-indigo-300 uppercase font-semibold">CVV</span>
                      <div className="bg-white text-slate-800 font-mono text-xs font-bold px-3 py-1 rounded mt-0.5">
                        {cardCvv || '•••'}
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pb-4 text-[7px] text-slate-500 text-center leading-normal">
                    This tokenized digital representation is protected under PCI DSS Level 1 encryption protocols.
                  </div>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4 text-xs font-bold text-slate-500">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cardNum">Card Number</label>
                  <input
                    id="cardNum"
                    type="text"
                    maxLength={16}
                    value={cardNumber}
                    onFocus={() => setIsFlipped(false)}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="4000 1234 5678 9010"
                    className="w-full h-11 px-4 bg-[#f3f4f5] border border-[#c7c5d4]/40 rounded-xl text-slate-800 focus:outline-none focus:border-[#15157d]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="holder">Card Holder Name</label>
                  <input
                    id="holder"
                    type="text"
                    value={cardHolder}
                    onFocus={() => setIsFlipped(false)}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Arjun Malhotra"
                    className="w-full h-11 px-4 bg-[#f3f4f5] border border-[#c7c5d4]/40 rounded-xl text-slate-800 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      id="expiry"
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onFocus={() => setIsFlipped(false)}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full h-11 px-4 bg-[#f3f4f5] border border-[#c7c5d4]/40 rounded-xl text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="cvv">CVV Code</label>
                    <input
                      id="cvv"
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="•••"
                      className="w-full h-11 px-4 bg-[#f3f4f5] border border-[#c7c5d4]/40 rounded-xl text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#15157d] hover:bg-[#2e3192] text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Save Card &amp; Tokenize</span>
                </button>
              </div>
            </form>
          )}

          {/* List Saved Options */}
          <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden divide-y divide-slate-100">
            {savedCards.map(card => (
              <div key={card.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded-md bg-[#f3f4f5] border border-slate-200 flex items-center justify-center font-bold italic text-slate-500 uppercase text-[10px]">
                    {card.type}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{card.bank}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">{card.masked} &bull; Exp: {card.expiry}</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Editing this saved method...')}
                  className="p-2 text-slate-400 hover:text-[#15157d] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
            ))}
            
            {savedUpis.map(upi => (
              <div key={upi.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded-md bg-[#e1e0ff]/30 border border-[#c0c1ff]/30 flex items-center justify-center text-[#15157d]">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{upi.name} Integration</h4>
                    <p className="text-[10px] text-slate-400 font-bold">{upi.handle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Editing this UPI setup...')}
                  className="p-2 text-slate-400 hover:text-[#15157d] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Transaction History Log */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">Recent Transactions Logs</h3>
          <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden divide-y divide-slate-100">
            {transactions.map(t => (
              <div key={t.id} className="p-4 flex justify-between items-center text-xs">
                <div className="space-y-1">
                  <p className="font-bold text-slate-800">{t.desc}</p>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase">{t.date}</p>
                </div>
                <span className={`font-extrabold text-sm shrink-0 ${
                  t.type === 'credit' ? 'text-blue-600' : 'text-slate-800'
                }`}>
                  {t.type === 'credit' ? '+' : '-'} ₹{t.amt.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
