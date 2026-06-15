import React, { useState, useEffect } from 'react';

export default function BookingHistoryView({ bookings, onBack }) {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedBookingForTracking, setSelectedBookingForTracking] = useState(null);
  const [trackingStep, setTrackingStep] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Filter bookings based on active or past tab
  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'active') {
      return b.status !== 'Completed';
    } else {
      return b.status === 'Completed';
    }
  });

  // Handle live tracking simulation ticks
  useEffect(() => {
    if (!selectedBookingForTracking) return;
    
    setTrackingStep(0);
    const interval = setInterval(() => {
      setTrackingStep(prev => {
        if (prev < 4) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedBookingForTracking]);

  const handleDownloadInvoice = (booking) => {
    const subtotal = booking.price / 1.18;
    const gst = booking.price - subtotal;
    const invoiceContent = `================================================
               NESTMATE INVOICE                 
================================================
Invoice ID: INV-${booking.id.split('-')[1] || '0000'}-${Math.floor(Math.random() * 900) + 100}
Booking Reference: ${booking.id}
Date of Issue: ${booking.date}
Service Time: ${booking.time}
Status: PAID / COMPLETED
================================================
CLIENT PROFILE:
Name: Arjun Malhotra (Premium Member)
Email: arjun.m@nestmate.com
================================================
CHORE DESCRIPTION:
Chore Type: ${booking.title}
Assigned Partner: ${booking.providerName} (Rating: ${booking.providerRating}⭐)
================================================
BILLING SUMMARY:
Subtotal:          ₹${subtotal.toFixed(2)}
GST (18%):         ₹${gst.toFixed(2)}
------------------------------------------------
TOTAL AMOUNT PAID: ₹${booking.price.toFixed(2)}
================================================
Payment Method: NestMate Wallet (Secured by SSL)
Thank you for choosing NestMate domestic concierge!
================================================`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NestMate_Invoice_${booking.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Scheduled':
        return (
          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Scheduled
          </span>
        );
      case 'Partner Assigned':
        return (
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
            Partner Assigned
          </span>
        );
      case 'Arrived':
        return (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Arrived
          </span>
        );
      case 'In Progress':
        return (
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
            In Progress
          </span>
        );
      case 'Completed':
        return (
          <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Completed
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {status}
          </span>
        );
    }
  };

  const getTrackingStatusText = (step) => {
    switch (step) {
      case 0: return "Preparing equipment and route plan...";
      case 1: return "Partner dispatched. Driving along Residency Road (2.4 km away)";
      case 2: return "Navigating traffic. Turning onto Indiranagar 100 Feet Road (1.1 km away)";
      case 3: return "Approaching your street. Arriving in 1 minute...";
      case 4: return "Partner arrived at doorstep. Ready to start service!";
      default: return "Partner matching in progress...";
    }
  };

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex flex-col font-sans relative text-left">
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 w-full z-40 border-b border-[#c7c5d4]/30 shadow-sm h-16 flex items-center">
        <div className="flex justify-between items-center px-6 w-full max-w-7xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-[#15157d] transition-colors group">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            <span className="text-sm font-semibold">Back</span>
          </button>
          <h1 className="text-base font-black text-slate-800">Booking History</h1>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Tab Switcher */}
        <div className="flex bg-[#e1e0ff]/40 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 text-xs font-black rounded-lg transition-all ${
              activeTab === 'active' 
                ? 'bg-[#15157d] text-white shadow-md' 
                : 'text-slate-600 hover:text-[#15157d]'
            }`}
          >
            Active Bookings ({bookings.filter(b => b.status !== 'Completed').length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 text-xs font-black rounded-lg transition-all ${
              activeTab === 'past' 
                ? 'bg-[#15157d] text-white shadow-md' 
                : 'text-slate-600 hover:text-[#15157d]'
            }`}
          >
            Past Completed ({bookings.filter(b => b.status === 'Completed').length})
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/50 shadow-sm px-4">
              <div className="w-16 h-16 bg-[#e1e0ff]/50 text-[#15157d] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[32px]">calendar_today</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">No Bookings Found</h3>
              <p className="text-xs text-slate-400">You don't have any {activeTab} bookings at the moment.</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div 
                key={booking.id}
                className="bg-white rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow p-6 space-y-4 relative overflow-hidden"
              >
                {/* Header Row */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{booking.id}</span>
                    <h3 className="text-sm font-black text-slate-800 leading-tight">{booking.title}</h3>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Provider</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-bold text-slate-700">{booking.providerName}</span>
                      <div className="flex items-center text-amber-500 text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px] fill-current">star</span>
                        <span>{booking.providerRating}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Schedule</span>
                    <span className="font-bold text-slate-700 block mt-0.5">{booking.date} @ {booking.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Total Paid</span>
                    <span className="font-extrabold text-[#15157d] block mt-0.5">₹{booking.price.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Payment Mode</span>
                    <span className="font-bold text-blue-600 block mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified_user</span>
                      Wallet (Secure)
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-4 flex gap-2">
                  {activeTab === 'active' ? (
                    <>
                      <button 
                        onClick={() => setSelectedBookingForTracking(booking)}
                        className="flex-1 bg-[#15157d] hover:bg-[#2e3192] text-white py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">map</span>
                        Track Professional
                      </button>
                      <button 
                        onClick={() => alert('Support request submitted for this active service.')}
                        className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors"
                      >
                        Help
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setSelectedInvoice(booking)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                        Download Invoice
                      </button>
                      <button 
                        onClick={() => alert('Booking copy loaded into schedule. Re-routing...')}
                        className="flex-1 bg-[#006a65] hover:bg-[#00524e] text-white py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">autorenew</span>
                        Rebook Service
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* GORGEOUS PRINTABLE TAX INVOICE MODAL WITH SCANNABLE QR CODE */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl text-[#191c1d] flex flex-col my-8 animate-scaleIn">
            {/* Action Header Panel */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center rounded-t-3xl print:hidden">
              <div className="flex items-center gap-2 text-[#15157d]">
                <span className="material-symbols-outlined text-[20px] font-bold">receipt_long</span>
                <span className="text-xs font-black uppercase tracking-wider">Tax Invoice Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.print()}
                  className="bg-[#15157d] hover:bg-[#2e3192] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Print / Save PDF</span>
                </button>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-350 hover:text-slate-800 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            {/* Printable Invoice Contents */}
            <div className="p-8 md:p-10 space-y-6 text-sm text-left overflow-y-auto leading-relaxed print:p-0">
              {/* Business Header */}
              <div className="flex justify-between items-start gap-4 border-b-2 border-indigo-700 pb-4">
                <div>
                  <h2 className="text-xl font-black text-[#15157d] flex items-center gap-1">
                    <span className="material-symbols-outlined font-black fill-current text-[24px]">nest_eco_leaf</span>
                    <span>NestMate Technologies</span>
                  </h2>
                  <p className="text-[10px] text-slate-500 font-medium mt-1 leading-normal max-w-xs">
                    Corporate Office: Suite 402, Elite Hub, 100 Feet Road, Indiranagar, Bangalore, Karnataka - 560038
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">GSTIN: 29AAACN8392M1ZH &bull; PAN: AAACN8392M</p>
                </div>
                <div className="text-right">
                  <span className="bg-indigo-100 text-[#15157d] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">Tax Invoice</span>
                  <p className="text-xs text-slate-700 font-bold mt-2">Invoice No: INV-{selectedInvoice.id.split('-')[1] || '0000'}-{Math.floor(Math.random() * 900) + 100}</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Date of Issue: {selectedInvoice.date}</p>
                </div>
              </div>

              {/* Client details & QR Code Row */}
              <div className="flex justify-between items-start gap-6 pt-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[9px] text-slate-400 font-black uppercase tracking-wider mb-1">Billing To:</h4>
                    <p className="font-extrabold text-slate-800 text-sm">Arjun Malhotra</p>
                    <p className="text-xs text-slate-500 leading-normal mt-0.5">
                      Residency: Prestige Lavender Bay, Apt 405,<br />
                      Indiranagar, Bangalore, KA - 560038
                    </p>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Email: arjun.m@nestmate.com | +91 90303 25396</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] text-slate-400 font-black uppercase tracking-wider mb-1">Supply Info:</h4>
                    <p className="text-xs text-slate-600 font-bold">Place of Supply: Karnataka (Code 29)</p>
                    <p className="text-xs text-slate-500">Booking Reference ID: <span className="font-mono font-bold text-slate-800">{selectedInvoice.id}</span></p>
                  </div>
                </div>
                
                {/* Authentic Scannable QR Code */}
                <div className="flex flex-col items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl shrink-0 text-center space-y-1 shadow-sm">
                  <img 
                    className="w-24 h-24 rounded border border-slate-100 bg-white"
                    alt="Verification QR code" 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=15157d&data=${encodeURIComponent(window.location.origin + '/?verify=' + selectedInvoice.id)}`}
                  />
                  <span className="text-[8px] font-black text-[#15157d] uppercase tracking-wider">Scan to Verify</span>
                  <button
                    onClick={() => {
                      window.open(`${window.location.origin}/?verify=${selectedInvoice.id}`, '_blank');
                    }}
                    className="text-[9px] font-extrabold text-[#15157d] hover:text-[#2e3192] underline mt-0.5 block print:hidden transition-colors active:scale-95"
                  >
                    Simulate Scan
                  </button>
                </div>
              </div>

              {/* Itemized Invoice Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-4">
                <table className="w-full text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 font-black text-slate-600 uppercase text-[9px]">
                    <tr>
                      <th className="px-4 py-3 text-left">Chore Description</th>
                      <th className="px-4 py-3 text-center font-bold">SAC</th>
                      <th className="px-4 py-3 text-right">Value</th>
                      <th className="px-4 py-3 text-right">CGST (9%)</th>
                      <th className="px-4 py-3 text-right">SGST (9%)</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="px-4 py-4 text-left">
                        <span className="font-bold text-slate-800 block text-xs">{selectedInvoice.title}</span>
                        <span className="text-[10px] text-slate-400">Assigned Partner: {selectedInvoice.providerName}</span>
                      </td>
                      <td className="px-4 py-4 text-center font-mono">998533</td>
                      <td className="px-4 py-4 text-right font-mono">₹{(selectedInvoice.price / 1.18).toFixed(2)}</td>
                      <td className="px-4 py-4 text-right font-mono text-slate-500">₹{((selectedInvoice.price - (selectedInvoice.price / 1.18)) / 2).toFixed(2)}</td>
                      <td className="px-4 py-4 text-right font-mono text-slate-500">₹{((selectedInvoice.price - (selectedInvoice.price / 1.18)) / 2).toFixed(2)}</td>
                      <td className="px-4 py-4 text-right font-extrabold text-[#15157d] font-mono">₹{selectedInvoice.price.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tax breakdown note */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex justify-between items-center text-xs">
                <div className="space-y-0.5 max-w-md">
                  <p className="font-bold text-slate-700">Tax declaration:</p>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Services are subject to Reverse Charge: No. Total Tax amount of ₹{(selectedInvoice.price - (selectedInvoice.price / 1.18)).toFixed(2)} is computed under domestic service GST guidelines.
                  </p>
                </div>
                <div className="text-right space-y-1 font-bold">
                  <div className="text-slate-400 text-[10px] uppercase">Tax Amount:</div>
                  <div className="text-slate-800 font-mono">₹{(selectedInvoice.price - (selectedInvoice.price / 1.18)).toFixed(2)}</div>
                </div>
              </div>

              {/* Signatures and Seals */}
              <div className="flex justify-between items-end pt-8 mt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006a65] text-[24px]">verified_user</span>
                  <div className="text-left text-[9px] leading-normal font-semibold text-slate-400 uppercase">
                    Electronic billing signature<br />
                    <span className="text-slate-600 font-bold">Tokenized Verified transaction</span>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-8 w-24 bg-slate-100/50 rounded flex items-center justify-center border border-dashed border-slate-200">
                    <span className="font-mono text-[9px] text-[#15157d] italic font-black uppercase">NestMate Core</span>
                  </div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Authorized Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Map Tracking Modal Overlay */}
      {selectedBookingForTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-white">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden animate-scaleIn text-left text-white flex flex-col h-[520px]">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
              <div>
                <h3 className="text-sm font-black text-slate-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping"></span>
                  Live tracking
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{selectedBookingForTracking.providerName} &bull; {selectedBookingForTracking.title}</p>
              </div>
              <button 
                onClick={() => setSelectedBookingForTracking(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Map Simulation Panel */}
            <div className="flex-grow bg-slate-950 relative overflow-hidden flex items-center justify-center">
              {/* Fake Aerial Map Graphic */}
              <div className="absolute inset-0 opacity-40 mix-blend-lighten">
                <img 
                  className="w-full h-full object-cover" 
                  alt="City map grid"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJdWp54oxB4Jj_zB-BiBwhZu4uRiIrIiPlHUqBDRAOBalgCBTUJEGyIsnRxyif_gnm39HJUZgg80faZ9e-qoYWtVNuX53MMh6RWJkvJ0pHJRPpFfaAnuHMVC88SfAEoW--3LoS5_GHELps_kvSmBBOVPUjlnda4-3Iwvyz7tvnidh6wMOBTTyeW2bJWO6iKjEjh4ThuWHozpGPgPKoetQpzrQSJYZTmQyKM2c6vhvqKpzlogyy3Hs0MhbO1Vgq4ougEfA5Ino8Vyin"
                />
              </div>

              {/* Central Destination Marker (Home) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
                <div className="w-10 h-10 bg-[#15157d] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]">home</span>
                </div>
                <span className="text-[9px] font-bold bg-[#15157d] border border-white/20 px-2 py-0.5 rounded-full mt-1.5 block shadow-md">Your Nest</span>
              </div>

              {/* Simulated Vehicle Icon moving closer */}
              <div 
                className="absolute z-20 transition-all duration-1000 ease-out flex flex-col items-center animate-pulse"
                style={{
                  top: trackingStep === 0 ? '75%' : trackingStep === 1 ? '60%' : trackingStep === 2 ? '42%' : trackingStep === 3 ? '45%' : '48%',
                  left: trackingStep === 0 ? '20%' : trackingStep === 1 ? '38%' : trackingStep === 2 ? '32%' : trackingStep === 3 ? '43%' : '48%',
                }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-[#f5921c] rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px]">motorcycle</span>
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-[#f5921c]/40 animate-ping pointer-events-none"></div>
                </div>
                <span className="text-[8px] font-black bg-[#f5921c] px-1.5 py-0.5 rounded-md mt-1 block uppercase shadow-md border border-white/20">
                  {selectedBookingForTracking.providerName.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Tracking Status Card */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 shrink-0">
                  <img 
                    alt="Provider avatar" 
                    className="w-full h-full object-cover" 
                    src={selectedBookingForTracking.providerName === 'Arjun Varma' 
                      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-ejFjtNj4XjvOXct58K2oIvkSElAwCg-nkCyw1tSes0VzMLtHMEV6AEXf_nzRiuD9l_PgR-HKGPNhq73OiyAUTVh8nzYaxUxdf62qR45Y2ChnhxXCIzl2jWMIzGt-YnDd7Wgq4XDVcYjAL8T-cEbzZIue0FRgAD1QsG3J0GQ8ZO7YiR-0PCBSubtcp0ikW3Y2CHhGh-QNFV0JNgoMXDqB9mwbr9I64UP75gAlDbBWVu76YSeSFX33wGkg3JZJ14WAvu5KScLCf6zV'
                      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQYG-ca7gGKkj-h0Y8rvbdXsmPeWr_TBpnvT7Met-UOo79_mvpeMtlxDX4kYcUQi2CE1mdYn8bZ0Qv6T4tJCXSJHVG1J0Q86BNCx0KdHLGrat1y09tet5IToqMjcT7AUv4uqbibfZQ5_Ikd2-oJoJC1iVuURBem5JPtQWQ2pMbJd66K7nqhJRGdOtUj54edL1o-rOSAn-oZKdhnSyIMN0P5OpkFwxW2txDMgFCPBjRU83OzCreNo7YCm3_RJCPzzX7QnGSQC1zmBn7'
                    }
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-black text-slate-200">{selectedBookingForTracking.providerName}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">{selectedBookingForTracking.providerRating} Rating &bull; Domestic Specialist</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => alert(`Calling ${selectedBookingForTracking.providerName} via masked gateway...`)}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </button>
                  <button 
                    onClick={() => alert(`Opening secure support chat...`)}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </button>
                </div>
              </div>

              {/* Status Update text */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#f5921c] text-[20px] mt-0.5">location_searching</span>
                <div className="flex-grow">
                  <p className="text-xs font-extrabold text-slate-200 leading-snug">
                    {getTrackingStatusText(trackingStep)}
                  </p>
                  <p className="text-[9px] text-slate-500 font-semibold mt-1 uppercase tracking-wider">Estimated arrival: ASAP (within 10-15 mins)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
