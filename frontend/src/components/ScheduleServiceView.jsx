import React, { useState } from 'react';

export default function ScheduleServiceView({ onBack, service, onConfirm }) {
  const [priority, setPriority] = useState('later'); // 'asap' | 'later'
  const [selectedDate, setSelectedDate] = useState('15'); // default selected date (15th of current month)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00 AM');
  const [customInstructions, setCustomInstructions] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handlePrioritySelect = (type) => {
    setPriority(type);
  };

  const handleConfirm = () => {
    onConfirm({
      priority,
      date: priority === 'asap' ? 'ASAP' : `June ${selectedDate}, 2026`,
      time: priority === 'asap' ? 'ASAP' : selectedTimeSlot,
      instructions: customInstructions,
      uploadedCount: uploadedFiles.length
    });
  };

  const handleSimulatedUpload = () => {
    setUploadedFiles(['photo_utility.jpg']);
    alert('Simulated photo upload successful! Added 1 item.');
  };

  return (
    <div className="bg-background text-on-surface min-h-screen pb-32 font-sans antialiased text-left selection:bg-secondary-container">
      {/* Top AppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile py-xs w-full max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-xs">
            <button 
              onClick={onBack}
              className="active:scale-95 transition-transform p-2 hover:bg-surface-container-high/50 rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Schedule Service</h1>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant">
            <img 
              className="w-full h-full object-cover" 
              alt="User Profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZtHFimjXSkUZn4nwLz-zKSSeuPStCA49xUT3JaHnzfBrUiPvFnIOwwkkX0kUSCQ8YTVrq8Zli8h2lJR1R0SZ9qmrg48-mKa7b_E2fXFIvOOIHSwfZmUoJ1mZRq6XnCDykYH7XJppPXyDUjli1cseWXjS6SW-dWFqyt4GAyqBzVRwmN4pPoIIMibiEMt2CXr2Ia7qfoBLQB4b1w_xvSTNs6-1tsSgMZ5c55hnD7jO8GpLCYu5j9tvC7e1LDwgEXWOBtpuRWAa3YRjB"
            />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-2xl mx-auto space-y-lg">
        {/* Priority Selection */}
        <section className="grid grid-cols-2 gap-md">
          <button 
            type="button"
            onClick={() => handlePrioritySelect('asap')}
            className={`glass-card flex flex-col items-center justify-center p-md rounded-xl transition-all border-2 active:scale-95 group text-center ${
              priority === 'asap' 
                ? 'border-primary bg-primary-container/10' 
                : 'border-transparent hover:border-slate-300'
            }`}
          >
            <span className="material-symbols-outlined text-primary text-4xl mb-2 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="font-title-lg text-title-lg text-primary font-bold">Urgent (ASAP)</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Arrives within 60 mins</span>
          </button>
          
          <button 
            type="button"
            onClick={() => handlePrioritySelect('later')}
            className={`glass-card flex flex-col items-center justify-center p-md rounded-xl transition-all border-2 active:scale-95 group text-center ${
              priority === 'later' 
                ? 'border-primary bg-primary-container/10' 
                : 'border-transparent hover:border-slate-300'
            }`}
          >
            <span className="material-symbols-outlined text-primary text-4xl mb-2 group-hover:scale-110 transition-transform">calendar_month</span>
            <span className="font-title-lg text-title-lg text-primary font-bold">Schedule Later</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Pick your preferred slot</span>
          </button>
        </section>

        {/* Calendar Section (Visible when 'Schedule Later' is selected) */}
        <div className={`transition-all duration-350 ${priority === 'later' ? 'opacity-100 h-auto pointer-events-auto' : 'opacity-40 pointer-events-none'}`}>
          <section className="space-y-sm" id="calendar-container">
            <div className="flex items-center justify-between">
              <h2 className="font-title-lg text-title-lg text-primary font-bold">Select Date</h2>
              <div className="flex items-center gap-xs">
                <button 
                  type="button"
                  onClick={() => alert('Previous Month')}
                  className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <span className="font-label-md text-label-md font-bold text-slate-800">June 2026</span>
                <button 
                  type="button"
                  onClick={() => alert('Next Month')}
                  className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            
            <div className="glass-card p-sm rounded-xl bg-white/70">
              <div className="grid grid-cols-7 gap-1 text-center mb-xs">
                <span className="font-label-sm text-label-sm text-outline font-semibold">MO</span>
                <span className="font-label-sm text-label-sm text-outline font-semibold">TU</span>
                <span className="font-label-sm text-label-sm text-outline font-semibold">WE</span>
                <span className="font-label-sm text-label-sm text-outline font-semibold">TH</span>
                <span className="font-label-sm text-label-sm text-outline font-semibold">FR</span>
                <span className="font-label-sm text-label-sm text-outline font-semibold">SA</span>
                <span className="font-label-sm text-label-sm text-outline font-semibold">SU</span>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {/* Simulated dates for June 2026: June 1st is Monday */}
                {[...Array(30)].map((_, index) => {
                  const dayNum = String(index + 1).padStart(2, '0');
                  const isSelected = selectedDate === dayNum;
                  const isPast = index + 1 < 13; // June 13, 2026 is current date
                  
                  if (isPast) {
                    return (
                      <button 
                        key={index} 
                        type="button"
                        disabled 
                        className="p-2 font-label-md text-label-md rounded-lg text-outline-variant cursor-not-allowed opacity-30 text-center"
                      >
                        {dayNum}
                      </button>
                    );
                  }
                  
                  return (
                    <button 
                      key={index}
                      type="button"
                      onClick={() => setSelectedDate(dayNum)}
                      className={`p-2 font-label-md text-label-md rounded-lg text-center font-semibold transition-colors ${
                        isSelected 
                          ? 'bg-primary text-on-primary font-bold shadow-md' 
                          : 'hover:bg-surface-container-high'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Time Slots (Visible when 'Schedule Later' is selected) */}
        <div className={`transition-all duration-350 ${priority === 'later' ? 'opacity-100 h-auto pointer-events-auto' : 'opacity-40 pointer-events-none'}`}>
          <section className="space-y-sm" id="time-slot-container">
            <h2 className="font-title-lg text-title-lg text-primary font-bold">Select Time Slot</h2>
            <div className="flex gap-sm overflow-x-auto pb-xs hide-scrollbar">
              {[
                { time: '09:00 AM', available: true },
                { time: '11:30 AM', available: true },
                { time: '02:00 PM', available: true },
                { time: '04:30 PM', available: true },
                { time: '07:00 PM', available: false }
              ].map((slot, idx) => {
                if (!slot.available) {
                  return (
                    <button 
                      key={idx}
                      type="button"
                      disabled
                      className="flex-shrink-0 px-md py-sm rounded-full glass-card opacity-50 cursor-not-allowed text-slate-400 font-semibold text-xs"
                    >
                      {slot.time} (Booked)
                    </button>
                  );
                }
                const isSelected = selectedTimeSlot === slot.time;
                return (
                  <button 
                    key={idx}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    className={`flex-shrink-0 px-md py-sm rounded-full glass-card transition-colors font-semibold border text-xs ${
                      isSelected 
                        ? 'border-primary text-primary bg-primary/5 font-bold' 
                        : 'border-outline-variant/30 hover:bg-surface-container'
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Custom Requirements & Upload */}
        <section className="space-y-sm">
          <h2 className="font-title-lg text-title-lg text-primary font-bold">Custom Requirements</h2>
          <div className="glass-card p-md rounded-xl space-y-md bg-white/70">
            <textarea 
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-md font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px] transition-all text-left" 
              placeholder={`Specific instructions for our housekeeping team... (e.g., Use organic cleaners, pay extra attention to balcony)`}
            />
            <div className="flex items-center gap-md">
              <button 
                type="button"
                onClick={handleSimulatedUpload}
                className="flex flex-1 items-center justify-center gap-xs p-md border-2 border-dashed border-outline-variant rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <span className="material-symbols-outlined text-outline group-hover:text-primary">photo_camera</span>
                <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary font-semibold">Upload Photo/Video</span>
              </button>
              <div className="w-16 h-16 rounded-lg bg-surface-container-highest flex items-center justify-center text-outline-variant border border-outline-variant/20">
                {uploadedFiles.length > 0 ? (
                  <span className="material-symbols-outlined text-secondary font-bold text-3xl">check_circle</span>
                ) : (
                  <span className="material-symbols-outlined text-3xl">description</span>
                )}
              </div>
            </div>
            <p className="font-label-sm text-label-sm text-outline italic text-left">Videos help our experts assess tools needed and provide accurate estimates.</p>
          </div>
        </section>
      </main>

      {/* Price Estimate Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg px-margin-mobile py-sm border-t border-outline-variant/30 flex items-center justify-between z-50">
        <div className="flex flex-col text-left">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Estimated Total</span>
          <span className="font-headline-md text-headline-md text-primary font-bold">
            ₹{service ? service.price.toLocaleString() : '0'}
          </span>
        </div>
        <button 
          type="button"
          onClick={handleConfirm}
          className="bg-primary text-on-primary px-xl py-md rounded-xl font-title-lg text-title-lg active:scale-95 transition-transform shadow-lg shadow-primary/20 font-bold"
        >
          Confirm Booking
        </button>
      </footer>
    </div>
  );
}
