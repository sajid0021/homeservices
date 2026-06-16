import React from 'react';

export default function ProfileView({ onOpenSafetyCenter, onOpenBookingHistory, onOpenSecurePayments, onOpenAdmin, onLogout }) {
  const handleAddressClick = () => {
    alert('Managing saved addresses...');
  };

  const handleNotificationsClick = () => {
    alert('Configuring push notifications...');
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 text-left pb-16">
      {/* User Hero Section */}
      <section className="flex flex-col items-center py-8 space-y-2">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <img 
              alt="User profile photo" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-ejFjtNj4XjvOXct58K2oIvkSElAwCg-nkCyw1tSes0VzMLtHMEV6AEXf_nzRiuD9l_PgR-HKGPNhq73OiyAUTVh8nzYaxUxdf62qR45Y2ChnhxXCIzl2jWMIzGt-YnDd7Wgq4XDVcYjAL8T-cEbzZIue0FRgAD1QsG3J0GQ8ZO7YiR-0PCBSubtcp0ikW3Y2CHhGh-QNFV0JNgoMXDqB9mwbr9I64UP75gAlDbBWVu76YSeSFX33wGkg3JZJ14WAvu5KScLCf6zV"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-[#15157d] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-800">Arjun Malhotra</h1>
          <p className="text-xs text-slate-500">arjun.m@nestmate.com</p>
        </div>
        <div className="mt-4 px-4 py-1.5 rounded-full bg-[#6ff7ee]/20 text-[#00716b] text-xs font-bold shadow-sm">
          Premium Member
        </div>
      </section>

      {/* Settings Groups */}
      <div className="space-y-6">
        {/* Account & Preferences */}
        <div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 px-2">Account & Preferences</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden divide-y divide-slate-100">
            {/* Booking History */}
            <button 
              onClick={onOpenBookingHistory}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e1e0ff] flex items-center justify-center text-[#15157d]">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <span className="text-sm font-bold text-slate-800">Booking History</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>

            {/* Saved Addresses */}
            <button 
              onClick={handleAddressClick}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e1e0ff] flex items-center justify-center text-[#15157d]">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <span className="text-sm font-bold text-slate-800">Saved Addresses</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>

            {/* Payment Methods */}
            <button 
              onClick={onOpenSecurePayments}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e1e0ff] flex items-center justify-center text-[#15157d]">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="text-sm font-bold text-slate-800">Payment Methods &amp; Wallet</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>

            {/* Notification Settings */}
            <button 
              onClick={handleNotificationsClick}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e1e0ff] flex items-center justify-center text-[#15157d]">
                  <span className="material-symbols-outlined">notifications_active</span>
                </div>
                <span className="text-sm font-bold text-slate-800">Notification Settings</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
          </div>
        </div>


        {/* Support & Legal */}
        <div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 px-2">Support & Legal</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden divide-y divide-slate-100 border-t-2 border-orange-400">
            {/* Help & Support */}
            <button 
              onClick={() => alert('Launching NestMate concierge support...')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined">help</span>
                </div>
                <span className="text-sm font-bold text-slate-800">Help &amp; Support</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>

            {/* Safety Center */}
            <button 
              onClick={onOpenSafetyCenter}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined">shield</span>
                </div>
                <span className="text-sm font-bold text-slate-800">Safety Center</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>

            {/* Privacy Policy */}
            <button 
              onClick={() => alert('Opening Privacy Policy...')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined">policy</span>
                </div>
                <span className="text-sm font-bold text-slate-800">Privacy Policy</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Log Out Action */}
        <div className="pt-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold active:scale-95 transition-all text-sm"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
          <p className="text-center text-[10px] font-bold text-slate-400 py-4">Version 2.4.1 (Stable)</p>
        </div>
      </div>
    </div>
  );
}
