import React, { useState, useEffect } from 'react';
import HomeHealthScore from './components/HomeHealthScore';
import ActionGrid from './components/ActionGrid';
import BundledCheckout from './components/BundledCheckout';
import VideoVerify from './components/VideoVerify';
import SplashView from './components/SplashView';
import VerifyOtpView from './components/VerifyOtpView';
import LocationAccessView from './components/LocationAccessView';
import AcDeepCleanView from './components/AcDeepCleanView';
import ProfileView from './components/ProfileView';
import SafetyCenterView from './components/SafetyCenterView';
import SearchView from './components/SearchView';
import ProviderProfileView from './components/ProviderProfileView';
import ProviderCodeOfConductView from './components/ProviderCodeOfConductView';
import ScheduleServiceView from './components/ScheduleServiceView';
import PhoneLoginView from './components/PhoneLoginView';
import BookingHistoryView from './components/BookingHistoryView';
import SecurePaymentsView from './components/SecurePaymentsView';
import ChoreVerificationView from './components/ChoreVerificationView';
import AdminLoginView from './components/AdminLoginView';
import AdminDashboardView from './components/AdminDashboardView';

export default function App() {
  // Global User States
  const [flowStep, setFlowStep] = useState('splash'); // 'splash' | 'phone' | 'otp' | 'location' | 'dashboard'
  const [subView, setSubView] = useState(null); // null | 'search' | 'ac_cleaning' | 'safety' | 'provider_profile' | 'conduct' | 'schedule_service' | 'booking_history' | 'secure_payments'
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedServiceForScheduling, setSelectedServiceForScheduling] = useState(null);
  const [userPhone, setUserPhone] = useState('');
  const [walletBalance, setWalletBalance] = useState(2450.00);
  const [activeActionTab, setActiveActionTab] = useState('daily');
  const [locationName, setLocationName] = useState('🏠 Indiranagar, Bangalore');
  const [cartBundle, setCartBundle] = useState(false);
  
  // Real-time Persistent Stores
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [devOtp, setDevOtp] = useState('');
  const [toasts, setToasts] = useState([]);
  const [selectedVerifyBooking, setSelectedVerifyBooking] = useState(null);

  // Chores State (calibrates Home Health Score ring)
  const [chores, setChores] = useState([
    { id: 1, title: 'Weekly Kitchen Deep Clean', category: 'Cleaning', completed: false },
    { id: 2, title: 'AC Filter Check & Dusting', category: 'Maintenance', completed: false },
    { id: 3, title: 'Occasion Gift Box Purchase', category: 'Gifting', completed: false },
    { id: 4, title: 'Bathroom Sanitization Routine', category: 'Cleaning', completed: true }
  ]);

  // Partners / regulars ("My Regulars" Workforce match)
  const [regulars, setRegulars] = useState([]);
  const [activeVerifyPartner, setActiveVerifyPartner] = useState(null);

  // Gifting Occasions State
  const [giftingEvents, setGiftingEvents] = useState([
    { id: 'g1', title: "Mom's Birthday Celebration", date: 'June 20, 2026', gift: 'Flower Bouquet & Maid Service Bundle', price: 2999, status: 'PENDING' },
    { id: 'g2', title: "Marriage Anniversary", date: 'July 02, 2026', gift: 'Spa Session & Deep Cleaning Bundle', price: 4999, status: 'PENDING' }
  ]);

  // Daily Help Tab Specific States
  const [selectedDailyService, setSelectedDailyService] = useState(null); // 'dish', 'clean', 'iron'

  // Home Care Tab Specific States
  const [selectedDate, setSelectedDate] = useState('Oct 24');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [selectedHomeCareAddons, setSelectedHomeCareAddons] = useState([]); // ['balcony', 'fridge', 'tile']

  // Selected Service for Checkout
  const [checkoutService, setCheckoutService] = useState(null);

  // Global Audio Synthesizer for UI Tactile Tick Feedback
  const playTick = (type = 'click') => {
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
      } else if (type === 'slide') {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.008, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'toast') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      console.warn("Audio Context blocked:", e);
    }
  };

  // Add global window event listener to intercept clicks and play tactile ticks
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, [role="button"], .cursor-pointer, input[type="submit"], [onClick]');
      if (target) {
        playTick('click');
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Play slide sound on page transitions
  useEffect(() => {
    if (flowStep !== 'splash') {
      playTick('slide');
    }
  }, [flowStep]);

  // Trigger Toast Notification helper
  const triggerToast = (title, message) => {
    playTick('toast');
    const id = `t-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Fetch initial dashboard blueprints & regular partners list
  useEffect(() => {
    // Fetch dashboard layout blueprint
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(json => {
        if (json.location && json.location.name) {
          setLocationName(json.location.name);
        }
      })
      .catch(err => {
        console.error("Dashboard blueprint error:", err);
        setLocationName('🏠 Indiranagar, Bangalore');
      });

    // Fetch My Regulars engine list
    fetch('/api/partners/regulars')
      .then(res => res.json())
      .then(json => {
        if (json.success) setRegulars(json.preferredTeam);
      })
      .catch(err => console.error("Regulars Match Engine error:", err));
  }, []);

  // Retrieve bookings list and monitor transitions
  const fetchBookings = () => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setBookings(prev => {
            json.bookings.forEach(newB => {
              const oldB = prev.find(ob => ob.id === newB.id);
              if (oldB && oldB.status !== newB.status) {
                triggerToast(`Chore status updated: ${newB.status}`, `${newB.providerName} has updated the status of your ${newB.title} request.`);
              }
            });
            return json.bookings;
          });
        }
      })
      .catch(err => console.error("Error fetching bookings:", err));
  };

  // Parse URL verify query parameters on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Check if ?admin is passed in URL
    if (params.get('admin') === 'true' || params.has('admin')) {
      setSubView('admin_login');
      window.history.pushState({}, '', window.location.pathname);
      return;
    }

    const verifyId = params.get('verify');
    if (verifyId) {
      fetch('/api/bookings')
        .then(res => res.json())
        .then(json => {
          const found = json.success ? json.bookings.find(b => b.id === verifyId) : null;
          if (found) {
            setSelectedVerifyBooking(found);
            setFlowStep('verify_portal');
          } else {
            // Mock fallback verification
            setSelectedVerifyBooking({
              id: verifyId,
              title: 'Bathroom Sanitization Routine',
              price: 1149.00,
              providerName: 'Anita K.',
              providerRating: 4.9,
              date: 'Jun 10, 2026',
              time: '10:00 AM',
              status: 'Completed'
            });
            setFlowStep('verify_portal');
          }
        })
        .catch(() => {
          setSelectedVerifyBooking({
            id: verifyId,
            title: 'Bathroom Sanitization Routine',
            price: 1149.00,
            providerName: 'Anita K.',
            providerRating: 4.9,
            date: 'Jun 10, 2026',
            time: '10:00 AM',
            status: 'Completed'
          });
          setFlowStep('verify_portal');
        });
    }
  }, []);

  // Real-time background simulation engine
  useEffect(() => {
    if (flowStep !== 'dashboard') return;

    // Fetch bookings list immediately
    fetchBookings();

    const interval = setInterval(() => {
      // Poll bookings list for changes
      fetchBookings();

      // Poll notifications list
      fetch('/api/notifications')
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            const unread = json.notifications.filter(n => !n.read);
            if (unread.length > 0) {
              unread.forEach(n => {
                triggerToast(n.title, n.message);
              });
              fetch('/api/notifications/read', { method: 'POST' })
                .catch(err => console.error("Marking notifications read error:", err));
            }
            setNotifications(json.notifications);
          }
        })
        .catch(err => console.error("Polling notifications error:", err));
    }, 3500);

    return () => clearInterval(interval);
  }, [flowStep]);

  // Toggle chore status
  const handleToggleChore = (choreId) => {
    setChores(prev => 
      prev.map(c => c.id === choreId ? { ...c, completed: !c.completed } : c)
    );
  };

  // Top up user wallet
  const handleTopUpWallet = () => {
    setWalletBalance(prev => prev + 500.00);
    alert('Wallet top up successful! Added ₹500.00.');
  };

  // Confirm booking checkout
  const handleConfirmCheckout = (totalCost, bookingId) => {
    setWalletBalance(prev => Math.max(0, prev - totalCost));
    
    // Refresh bookings list immediately
    fetch('/api/bookings')
      .then(res => res.json())
      .then(json => {
        if (json.success) setBookings(json.bookings);
      })
      .catch(err => console.error("Error refreshing bookings:", err));

    setCheckoutService(null);
    setCartBundle(false);
    setSelectedDailyService(null);
    setSelectedHomeCareAddons([]);

    if (checkoutService && checkoutService.id.startsWith('g')) {
      setGiftingEvents(prev => 
        prev.map(item => item.id === checkoutService.id ? { ...item, status: 'ORDERED' } : item)
      );
    }

    // Direct user to booking history to witness the live progress
    setSubView('booking_history');
  };

  // Toggle home care addons
  const handleToggleAddon = (addonId) => {
    if (selectedHomeCareAddons.includes(addonId)) {
      setSelectedHomeCareAddons(prev => prev.filter(id => id !== addonId));
    } else {
      setSelectedHomeCareAddons(prev => [...prev, addonId]);
    }
  };

  const handleOpenProviderProfile = (name, service, rating, avatar) => {
    setSelectedProvider({
      name,
      service,
      rating,
      reviews: name === 'Anita K.' ? 428 : name === 'Rohan S.' ? 192 : name === 'Meera D.' ? 54 : name === 'Seema Rao' ? 342 : 110,
      experience: name === 'Anita K.' ? '5+ Years Experience' : name === 'Rohan S.' ? '3+ Years Experience' : name === 'Arjun Varma' ? '8+ Years Experience' : '2+ Years Experience',
      bio: `${name} is a top-rated NestMate certified professional. Known for consistent service quality, attention to detail, and professional reliability in premium residences.`,
      avatar,
      rate: name === 'Anita K.' ? 350 : name === 'Rohan S.' ? 400 : name === 'Meera D.' ? 300 : 450
    });
    setSubView('provider_profile');
  };

  const activeBooking = bookings.find(b => b.status !== 'Completed');

  if (subView === 'admin_login') {
    return (
      <AdminLoginView 
        onBack={() => setSubView(null)} 
        onLoginSuccess={() => setSubView('admin_dashboard')} 
      />
    );
  }

  if (subView === 'admin_dashboard') {
    return (
      <AdminDashboardView 
        bookings={bookings}
        onRefresh={fetchBookings}
        onLogout={() => setSubView(null)} 
      />
    );
  }

  if (flowStep === 'verify_portal') {
    return (
      <ChoreVerificationView 
        booking={selectedVerifyBooking}
        onClose={() => {
          window.history.pushState({}, '', window.location.pathname);
          setSelectedVerifyBooking(null);
          setFlowStep('dashboard');
        }}
      />
    );
  }

  if (flowStep === 'splash') {
    return <SplashView onGetStarted={() => setFlowStep('phone')} />;
  }

  if (flowStep === 'phone') {
    return (
      <PhoneLoginView 
        onSendOtp={(phone, otpCode) => {
          console.log("OTP requested for phone:", phone);
          setUserPhone(phone);
          setDevOtp(otpCode);
          setFlowStep('otp');
        }} 
        onBack={() => setFlowStep('splash')}
      />
    );
  }

  if (flowStep === 'otp') {
    return (
      <VerifyOtpView 
        phoneNumber={userPhone}
        devOtp={devOtp}
        onBack={() => setFlowStep('phone')} 
        onVerify={(code) => {
          console.log("OTP code verified:", code);
          setFlowStep('location');
        }} 
      />
    );
  }

  if (flowStep === 'location') {
    return (
      <LocationAccessView 
        onLocationSelect={(selectedAddress) => {
          setLocationName(selectedAddress);
          setFlowStep('dashboard');
        }} 
      />
    );
  }

  if (subView === 'search') {
    return (
      <SearchView 
        onBack={() => setSubView(null)} 
        onOpenDetailedService={(svc) => setSubView(svc)} 
      />
    );
  }

  if (subView === 'ac_cleaning') {
    return (
      <AcDeepCleanView 
        onBack={() => setSubView('search')} 
        onSelectPackage={(title, price) => {
          setSelectedServiceForScheduling({ id: 'ac_deep_cleaning', title, price });
          setSubView('schedule_service');
        }} 
      />
    );
  }

  if (subView === 'safety') {
    return (
      <SafetyCenterView 
        onBack={() => setSubView(null)} 
        onOpenCodeOfConduct={() => setSubView('conduct')}
      />
    );
  }

  if (subView === 'conduct') {
    return (
      <ProviderCodeOfConductView 
        onBack={() => setSubView('safety')} 
      />
    );
  }

  if (subView === 'schedule_service') {
    return (
      <ScheduleServiceView 
        onBack={() => setSubView(null)} 
        service={selectedServiceForScheduling}
        onConfirm={(details) => {
          // Add scheduling details to checkout
          const priorityLabel = details.priority === 'asap' ? 'ASAP' : `${details.date} @ ${details.time}`;
          setCheckoutService({
            id: selectedServiceForScheduling.id,
            title: `${selectedServiceForScheduling.title} (${priorityLabel})`,
            price: selectedServiceForScheduling.price,
            customAddons: selectedServiceForScheduling.addons || []
          });
          setSubView(null);
        }}
      />
    );
  }

  if (subView === 'provider_profile') {
    return (
      <ProviderProfileView 
        onBack={() => setSubView(null)} 
        providerInfo={selectedProvider} 
      />
    );
  }
  if (subView === 'booking_history') {
    return (
      <BookingHistoryView 
        bookings={bookings}
        onBack={() => setSubView(null)} 
      />
    );
  }

  if (subView === 'secure_payments') {
    return (
      <SecurePaymentsView 
        walletBalance={walletBalance}
        onTopUp={(amt) => setWalletBalance(prev => prev + amt)}
        onBack={() => setSubView(null)} 
      />
    );
  }

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen pb-32 selection:bg-indigo-500/20 font-sans w-full">
      
      {/* Top App Bar */}
      <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#c7c5d4] shadow-sm">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveActionTab('nest')}
              className="w-8 h-8 rounded-full overflow-hidden border border-[#c7c5d4] cursor-pointer hover:opacity-85 transition-opacity"
            >
              <img 
                alt="Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3heQv8bX48eDNCHU2gPl3A8i69XlHXeRo-jVmK-ndi_-Nhq08VCFMISWsIRzUmoVXkud5_vMaPm1d_25BFgjdgKuR_cJFmkq68Et78Wpthm5eZOXUU9SpmSxSfAMYwminNh-DH1e8rMDiPbnSJTN-5tAXChz1k4NwMNZBSqHQOyyveVG0og-GVkmkePVxhinMKU729U92Lfj8YjyESnh6dBSqrmtNe18NAFal66KwoWGNpTaoZeE4UDakLHUkSRVxQXfQGjoeTyVm"
              />
            </div>
            <span className="text-xl font-extrabold text-[#15157d]">NestMate</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSubView('search')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors active:scale-95 text-[#15157d]"
              title="Search Services"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            <div className="bg-[#e1e0ff]/70 border border-[#c0c1ff] rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-bold text-[#04006d] shadow-sm">
              <span className="material-symbols-outlined text-sm">payments</span>
              <span>Wallet: ₹{walletBalance.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleTopUpWallet}
              className="rounded-full bg-[#15157d] text-white px-3 py-1.5 text-xs font-bold hover:bg-[#2e3192] shadow-md transition-colors active:scale-95"
              title="Add ₹500"
            >
              + Top Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-24 px-6 max-w-7xl mx-auto space-y-12 text-left">
        
        {/* iOS-Style Dynamic Live Activity Banner */}
        {activeBooking && (
          <section className="bg-slate-950 text-white rounded-3xl p-5 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-scaleIn relative overflow-hidden">
            {/* Holographic background line scan */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-[#6ff7ee]/5 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              {/* Pulsing indicator/avatar ring */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700 bg-slate-900">
                  <img 
                    alt="Active provider avatar" 
                    className="w-full h-full object-cover" 
                    src={activeBooking.providerName.includes('Arjun') 
                      ? "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ejFjtNj4XjvOXct58K2oIvkSElAwCg-nkCyw1tSes0VzMLtHMEV6AEXf_nzRiuD9l_PgR-HKGPNhq73OiyAUTVh8nzYaxUxdf62qR45Y2ChnhxXCIzl2jWMIzGt-YnDd7Wgq4XDVcYjAL8T-cEbzZIue0FRgAD1QsG3J0GQ8ZO7YiR-0PCBSubtcp0ikW3Y2CHhGh-QNFV0JNgoMXDqB9mwbr9I64UP75gAlDbBWVu76YSeSFX33wGkg3JZJ14WAvu5KScLCf6zV"
                      : "https://lh3.googleusercontent.com/aida-public/AB6AXuACBgyRTWFTz1anff53QNAyqxebFnT_MPHReXYVelfpRI5x9e8aTvPcg2uxjS4FF-dE0uzel43aVXKyMicO0huAVz3KTr_sMEu4GjDPVJekEozRnuAMf7ShiUHJp9bGyqXaPaHITlrGg2xUQUS1hQarrJ6rnYogiQd6fR7m3D5Enp02DPVBw0XWzXUctV0zHxEh17nKmHOIk0IoHqG8EQ8AWdml3f116I-ga4nobL9f5JesHdHTJeoUg5A9HQwCfna4uGtRMYHyPesW"
                    }
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                </span>
              </div>
              
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-[#6ff7ee]">
                  <span className="w-1 h-1 bg-[#6ff7ee] rounded-full animate-pulse"></span>
                  NestMate Active Activity
                </span>
                <h4 className="text-xs font-black text-slate-100">{activeBooking.title}</h4>
                <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1.5">
                  <span>With {activeBooking.providerName}</span>
                  <span>&bull;</span>
                  <span className="text-blue-400 font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[10px] animate-pulse">sync</span>
                    {activeBooking.status}
                  </span>
                </p>
              </div>
            </div>
            
            {/* Live Progress HUD Tracker & Buttons */}
            <div className="flex items-center gap-3 shrink-0 relative z-10 w-full md:w-auto">
              <div className="hidden sm:flex flex-col text-right pr-3 border-r border-slate-800 font-mono text-[9px] text-slate-500">
                <p>REF ID: {activeBooking.id}</p>
                <p className="text-slate-400 font-bold">STATUS SIM ACTIVE</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSubView('booking_history');
                  }}
                  className="flex-1 sm:flex-initial bg-[#15157d] hover:bg-[#2e3192] text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1 shadow-md"
                >
                  <span className="material-symbols-outlined text-xs">map</span>
                  Track Live Map
                </button>
                {(activeBooking.status === 'Arrived' || activeBooking.status === 'Partner Assigned') && (
                  <button
                    onClick={() => {
                      setActiveVerifyPartner({
                        id: activeBooking.id,
                        name: activeBooking.providerName,
                        service: activeBooking.title,
                        rating: activeBooking.providerRating
                      });
                    }}
                    className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1 shadow-md"
                  >
                    <span className="material-symbols-outlined text-xs">badge</span>
                    Verify Identity
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
        
        {/* Hero & Switcher */}
        {activeActionTab !== 'nest' && (
          <section className="relative rounded-2xl overflow-hidden bg-[#15157d] p-8 md:p-12 shadow-xl">
            <div className="absolute inset-0 pattern-bg opacity-10 pointer-events-none"></div>
            <div className="relative z-10 text-white">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 max-w-2xl">Total Home Peace of Mind</h1>
              <p className="text-sm md:text-base text-[#e1e0ff] mb-8 max-w-lg opacity-90 leading-relaxed">Manage your entire domestic life with one elite concierge app designed for the modern professional.</p>
              
              {/* Toggle Switcher */}
              <ActionGrid activeTab={activeActionTab} onSelectTab={setActiveActionTab} />
            </div>
          </section>
        )}

        {/* Home Health Status Section */}
        {activeActionTab !== 'nest' && (
          <HomeHealthScore chores={chores} onToggleChore={handleToggleChore} />
        )}

        {/* Quick Categories Catalog (Expanded Grid) */}
        {activeActionTab !== 'nest' && (
          <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Explore Premium Chore Categories</h3>
              <span className="text-[10px] font-bold text-[#15157d] bg-[#e1e0ff] px-2 py-0.5 rounded-full uppercase">6 Categories</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { id: 'cat_clean', label: 'Home Deep Clean', icon: 'cleaning_services', bg: 'bg-indigo-50 text-[#15157d] border-indigo-200/50', service: { id: 'home_deep_clean', title: 'Premium House Sanitization Clean', price: 4499 } },
                { id: 'cat_appliance', label: 'Appliance Care', icon: 'electrical_services', bg: 'bg-blue-50 text-blue-800 border-blue-200/50', service: { id: 'appliance_care', title: 'Washing Machine & Fridge Check', price: 999 } },
                { id: 'cat_chef', label: 'Chef & Cooks', icon: 'restaurant', bg: 'bg-amber-50 text-amber-800 border-amber-200/50', service: { id: 'chef_cooks', title: 'Personal Chef Gourmet Service (4 Hrs)', price: 1899 } },
                { id: 'cat_well', label: 'In-Home Wellness', icon: 'spa', bg: 'bg-rose-50 text-rose-800 border-rose-200/50', service: { id: 'home_wellness', title: 'Aromatherapy Massage Therapy (90 Mins)', price: 2199 } },
                { id: 'cat_errand', label: 'Errand Runner', icon: 'local_shipping', bg: 'bg-sky-50 text-sky-800 border-sky-200/50', service: { id: 'errand_runner', title: 'Concierge Grocery/Errand Runner', price: 499 } },
                { id: 'cat_gift', label: 'Premium Gifting', icon: 'redeem', bg: 'bg-purple-50 text-purple-800 border-purple-200/50', service: { id: 'premium_gifting', title: 'Luxury Floral & Chocolates Box Delivery', price: 1599 } }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedServiceForScheduling(cat.service);
                    setSubView('schedule_service');
                  }}
                  className={`p-5 rounded-3xl border flex flex-col items-center justify-center text-center gap-3 shadow-sm hover:shadow-md active:scale-95 transition-all group ${cat.bg}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                  </div>
                  <span className="text-xs font-bold leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* STATE-DRIVEN CONTENT PANEL */}
        <div className="mt-lg">
          
          {/* DAILY HELP TAB */}
          {activeActionTab === 'daily' && (
            <div className="space-y-md">
              <div className="flex flex-col gap-1 mb-6 border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-[#15157d]">What can we help with today?</h2>
                <p className="text-slate-500 text-xs">On-demand domestic support for your busy life.</p>
              </div>
              
              {/* Bento Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Dishwashing */}
                <button 
                  onClick={() => setSelectedDailyService('dish')}
                  className={`group relative overflow-hidden flex flex-col items-start p-6 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md text-left w-full ${
                    selectedDailyService === 'dish' 
                      ? 'border-[#15157d] bg-[#e1e0ff]/30' 
                      : 'border-[#c7c5d4]/40 bg-white hover:border-[#15157d]'
                  }`}
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-[#6ff7ee]/20 flex items-center justify-center text-[#00716b] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800 mb-1">Dishwashing</span>
                  <span className="text-slate-500 text-xs">1 Hour Session</span>
                  <div className="mt-4 flex items-center justify-between w-full">
                    <span className="font-semibold text-primary">₹299</span>
                    <span className={`material-symbols-outlined text-primary transition-opacity ${selectedDailyService === 'dish' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>arrow_forward</span>
                  </div>
                </button>

                {/* Cleaning */}
                <button 
                  onClick={() => setSelectedDailyService('clean')}
                  className={`group relative overflow-hidden flex flex-col items-start p-6 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md text-left w-full ${
                    selectedDailyService === 'clean' 
                      ? 'border-[#15157d] bg-[#e1e0ff]/30' 
                      : 'border-[#c7c5d4]/40 bg-white hover:border-[#15157d]'
                  }`}
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-[#6ff7ee]/20 flex items-center justify-center text-[#00716b] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cleaning_services</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800 mb-1">Cleaning</span>
                  <span className="text-slate-500 text-xs">2 Hour Deep Clean</span>
                  <div className="mt-4 flex items-center justify-between w-full">
                    <span className="font-semibold text-primary">₹549</span>
                    <span className={`material-symbols-outlined text-primary transition-opacity ${selectedDailyService === 'clean' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>arrow_forward</span>
                  </div>
                </button>

                {/* Ironing */}
                <button 
                  onClick={() => setSelectedDailyService('iron')}
                  className={`group relative overflow-hidden flex flex-col items-start p-6 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md text-left w-full ${
                    selectedDailyService === 'iron' 
                      ? 'border-[#15157d] bg-[#e1e0ff]/30' 
                      : 'border-[#c7c5d4]/40 bg-white hover:border-[#15157d]'
                  }`}
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-[#6ff7ee]/20 flex items-center justify-center text-[#00716b] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>iron</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800 mb-1">Ironing</span>
                  <span className="text-slate-500 text-xs">30 Mins Batch</span>
                  <div className="mt-4 flex items-center justify-between w-full">
                    <span className="font-semibold text-primary">₹149</span>
                    <span className={`material-symbols-outlined text-primary transition-opacity ${selectedDailyService === 'iron' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>arrow_forward</span>
                  </div>
                </button>
              </div>

              {/* Safety & Verification Banner */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 border border-[#c7c5d4]/30">
                  <span className="material-symbols-outlined text-secondary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>vibration</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Safety First</span>
                    <span className="text-xs font-bold text-slate-700">MASKED CALL</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 border border-[#c7c5d4]/30">
                  <span className="material-symbols-outlined text-secondary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Trust</span>
                    <span className="text-xs font-bold text-slate-700">INSURED PROS</span>
                  </div>
                </div>
              </div>

              {/* Pro List Section */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-bold text-slate-800">Nearby NestPros</h3>
                  <span className="px-3 py-1 bg-indigo-100 text-[#15157d] text-xs font-bold rounded-full">3 Pros Online</span>
                </div>

                <div className="space-y-4">
                  {/* Pro 1 */}
                  <div 
                    onClick={() => handleOpenProviderProfile('Anita K.', 'Daily Housekeeping', 4.9, 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBgyRTWFTz1anff53QNAyqxebFnT_MPHReXYVelfpRI5x9e8aTvPcg2uxjS4FF-dE0uzel43aVXKyMicO0huAVz3KTr_sMEu4GjDPVJekEozRnuAMf7ShiUHJp9bGyqXaPaHITlrGg2xUQUS1hQarrJ6rnYogiQd6fR7m3D5Enp02DPVBw0XWzXUctV0zHxEh17nKmHOIk0IoHqG8EQ8AWdml3f116I-ga4nobL9f5JesHdHTJeoUg5A9HQwCfna4uGtRMYHyPesW')}
                    className="bg-white p-4 rounded-2xl border border-[#c7c5d4]/40 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer hover:border-[#15157d]/50"
                  >
                    <div className="relative">
                      <img 
                        alt="Anita's Profile" 
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuACBgyRTWFTz1anff53QNAyqxebFnT_MPHReXYVelfpRI5x9e8aTvPcg2uxjS4FF-dE0uzel43aVXKyMicO0huAVz3KTr_sMEu4GjDPVJekEozRnuAMf7ShiUHJp9bGyqXaPaHITlrGg2xUQUS1hQarrJ6rnYogiQd6fR7m3D5Enp02DPVBw0XWzXUctV0zHxEh17nKmHOIk0IoHqG8EQ8AWdml3f116I-ga4nobL9f5JesHdHTJeoUg5A9HQwCfna4uGtRMYHyPesW"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-800">Anita K.</h4>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                            <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span>4.9 (428 reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-secondary font-bold text-xs block">Arriving in 15 mins</span>
                          <span className="text-slate-500 text-[10px]">2.4 km away</span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded uppercase">Top Rated</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded uppercase">500+ Tasks</span>
                      </div>
                    </div>
                  </div>
 
                  {/* Pro 2 */}
                  <div 
                    onClick={() => handleOpenProviderProfile('Rohan S.', 'Backup Housekeeping', 4.8, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcEC4j7Eq7gB_UqK48Q2Zf2npW2u6SUmGXbrOKPJwCW5w9WN4XTJQqkIeeCOKbehQfn3GljB9Gs5K6bA7Bb25PmSuvREMjp0vfO4xaX14leBxkKi5axpUjhi1sQ0cXdgjdzhfFM22feS6RKChe-bYZ1P5cb49dSCho4FHfqHtB191wxv4lXXyriejjMMcz8wlvl_SIhoCQqCS-7IzmdkGhmGftZRuvZt0-WwlJcOpJnZCw4xJgfGpXei_xhDGKKCBP2RjRG2nHdMa-')}
                    className="bg-white p-4 rounded-2xl border border-[#c7c5d4]/40 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer hover:border-[#15157d]/50"
                  >
                    <div className="relative">
                      <img 
                        alt="Rohan's Profile" 
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcEC4j7Eq7gB_UqK48Q2Zf2npW2u6SUmGXbrOKPJwCW5w9WN4XTJQqkIeeCOKbehQfn3GljB9Gs5K6bA7Bb25PmSuvREMjp0vfO4xaX14leBxkKi5axpUjhi1sQ0cXdgjdzhfFM22feS6RKChe-bYZ1P5cb49dSCho4FHfqHtB191wxv4lXXyriejjMMcz8wlvl_SIhoCQqCS-7IzmdkGhmGftZRuvZt0-WwlJcOpJnZCw4xJgfGpXei_xhDGKKCBP2RjRG2nHdMa-"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-800">Rohan S.</h4>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                            <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span>4.8 (192 reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-secondary font-bold text-xs block">Arriving in 8 mins</span>
                          <span className="text-slate-500 text-[10px]">0.9 km away</span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded uppercase">Nearby</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded uppercase">Prompt</span>
                      </div>
                    </div>
                  </div>
 
                  {/* Pro 3 */}
                  <div 
                    onClick={() => handleOpenProviderProfile('Meera D.', 'Premium Cleaning', 5.0, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_rl_gk5IJMV7cd4XhCbiDyaoRSpI0D2yUHweZPxzEBfbE1NgfnMNLgZ5rtPzlbRDPLWZfQhQG_MtDovk9fM4HCYdJlR0maLdI7YCc_-35mUnscCPxeYDGlL8QdPfhAC2zTR9A5CF7hlBj1WpmF40eBcQSDOmSnJO8iX98cMNR9jwNTOMifSPkpmQ4rLFZpPoZskIJOQihWipV4rKYRSsjQfSfQdWzIoGikAT7oYAp6BG6i0uPPQPBoQQV5HzjR6l-NFZ7EutqfZWL')}
                    className="bg-white p-4 rounded-2xl border border-[#c7c5d4]/40 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer hover:border-[#15157d]/50"
                  >
                    <div className="relative">
                      <img 
                        alt="Meera's Profile" 
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_rl_gk5IJMV7cd4XhCbiDyaoRSpI0D2yUHweZPxzEBfbE1NgfnMNLgZ5rtPzlbRDPLWZfQhQG_MtDovk9fM4HCYdJlR0maLdI7YCc_-35mUnscCPxeYDGlL8QdPfhAC2zTR9A5CF7hlBj1WpmF40eBcQSDOmSnJO8iX98cMNR9jwNTOMifSPkpmQ4rLFZpPoZskIJOQihWipV4rKYRSsjQfSfQdWzIoGikAT7oYAp6BG6i0uPPQPBoQQV5HzjR6l-NFZ7EutqfZWL"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-800">Meera D.</h4>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                            <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span>5.0 (54 reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-secondary font-bold text-xs block">Arriving in 22 mins</span>
                          <span className="text-slate-500 text-[10px]">3.1 km away</span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded uppercase">New Pro</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded uppercase">Certified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HOME CARE TAB */}
          {activeActionTab === 'deep' && (
            <div className="space-y-md">
              <div className="relative w-full h-[240px] md:h-[320px] rounded-xl overflow-hidden mb-6 shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Marble kitchen interior clean"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN62tP7Vt149n-TlzjI1kgjGGc1rbuMEoqnN6SSmVJ_QKv0z7d-hE8wv3mBO-30jCL1upfXzDnDR-bKwVn0vLBX6VQ3Nfmp70Hb-wfckf-r6pmSMavzj7t3oxD9MMxR9V-MmXFL_8TcCgS3jRr96HdH8w0wb4_n8AmrnSNtLHTR-0Y9UQ_zsp9IsSoCO9yIK0N5rEJNZuw4cfdf-gLPdVrNyFzWnfB27EE_8YxDuXHNiNc45hM_KRKU5mrmadEGC6_FAOZ6tHbzzAP"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-6">
                  <div>
                    <span className="bg-[#6ff7ee] text-[#00201e] text-[10px] font-bold px-3 py-1 rounded-full mb-2 inline-block">PREMIUM SERVICE</span>
                    <h2 className="text-white font-black text-2xl md:text-3xl">Deep Cleaning Solutions</h2>
                  </div>
                </div>
              </div>

              {/* Bento Grid: Package Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Kitchen Deep Clean */}
                <div className="md:col-span-2 bg-white rounded-xl p-6 border border-[#c7c5d4]/40 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-[#15157d]">Kitchen Deep Clean</h3>
                      <span className="text-[#15157d] font-black text-lg">₹2,499</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-6 leading-relaxed">Our most requested specialized package. Targets heavy grease, hidden grime, and bacterial hotspots.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-6">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="font-semibold text-slate-700">Degreasing of Chimney &amp; Hobs</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="font-semibold text-slate-700">Cabinet Exterior &amp; Interior Cleaning</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="font-semibold text-slate-700">Industrial Machine Floor Scrubbing</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="font-semibold text-slate-700">Wall Tiling &amp; Grout Sanitization</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const addonsList = selectedHomeCareAddons.map(id => {
                        if (id === 'balcony') return { title: 'Balcony Pressure Scrubbing Addon', price: 499 };
                        if (id === 'fridge') return { title: 'Fridge Interior Sterilization Addon', price: 599 };
                        return { title: 'Tile Steam Polishing Addon', price: 349 };
                      });
                      setSelectedServiceForScheduling({
                        id: 'deep_kitchen_premium',
                        title: 'Kitchen Deep Clean',
                        price: 2499,
                        addons: addonsList
                      });
                      setSubView('schedule_service');
                    }}
                    className="w-full bg-[#15157d] hover:bg-[#2e3192] text-white py-3 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-sm"
                  >
                    Select Kitchen Deep Clean Package
                  </button>
                </div>

                {/* AC Deep Cleaning Card */}
                <div className="bg-white rounded-xl p-6 flex flex-col justify-between border border-[#c7c5d4]/40 shadow-sm text-left">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 mb-2">AC Deep Cleaning</h3>
                    <p className="text-xs text-slate-500 leading-normal">Jet-pump pressure cleaning for split and window AC units.</p>
                  </div>
                  <div className="mt-6">
                    <div className="text-[#15157d] font-black text-xl mb-4">₹599 - ₹949</div>
                    <button 
                      onClick={() => setSubView('ac_cleaning')}
                      className="w-full bg-[#15157d] hover:bg-[#2e3192] text-white py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Side Card: Full Home */}
                <div className="bg-[#e7e8e9]/40 rounded-xl p-6 flex flex-col justify-between border border-[#c7c5d4]/40 shadow-sm text-left">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 mb-2">Full Home Reset</h3>
                    <p className="text-xs text-slate-500 leading-normal">The complete 360° hygiene protocol for your entire residence.</p>
                  </div>
                  <div className="mt-6">
                    <div className="text-[#15157d] font-black text-xl mb-4">₹6,999</div>
                    <button 
                      onClick={() => {
                        setSelectedServiceForScheduling({
                          id: 'deep_full_reset',
                          title: 'Full Home Reset Clean',
                          price: 6999
                        });
                        setSubView('schedule_service');
                      }}
                      className="w-full border border-[#15157d] text-[#15157d] hover:bg-indigo-50/50 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95"
                    >
                      Book Full Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Protocol checklists */}
              <div className="mb-8">
                <h3 className="text-base font-bold text-[#15157d] mb-4">NestMate Service Protocol</h3>
                <div className="bg-white rounded-xl border border-[#c7c5d4]/40 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-[#c7c5d4]/20 bg-slate-50">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Clinical SOP Checklist</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-left">
                    {/* SOP 1 */}
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#6ff7ee]/20 flex items-center justify-center text-[#00716b]">
                          <span className="material-symbols-outlined text-lg">sanitizer</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">SOP Sanitization</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Hospital-grade disinfectant application on all touchpoints.</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                    {/* SOP 2 */}
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#6ff7ee]/20 flex items-center justify-center text-[#00716b]">
                          <span className="material-symbols-outlined text-lg">air_purifier_gen</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">HEPA Vacuuming</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Industrial grade suction for deep allergens and dust.</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                    {/* SOP 3 */}
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#6ff7ee]/20 flex items-center justify-center text-[#00716b]">
                          <span className="material-symbols-outlined text-lg">eco</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Eco-Solvent Degreasing</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Toxin-free chemicals safe for pets and children.</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 group-hover:text-secondary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slot Scheduler */}
              <div className="mb-8">
                <h3 className="text-base font-bold text-[#15157d] mb-4">Schedule Service</h3>
                <div className="bg-white rounded-xl p-6 border border-[#c7c5d4]/40 shadow-sm text-left">
                  {/* Days */}
                  <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 pb-2 border-b border-slate-100">
                    {[
                      { code: 'Oct 24', label: 'OCT', day: '24', name: 'THU' },
                      { code: 'Oct 25', label: 'OCT', day: '25', name: 'FRI' },
                      { code: 'Oct 26', label: 'OCT', day: '26', name: 'SAT' },
                      { code: 'Oct 27', label: 'OCT', day: '27', name: 'SUN' }
                    ].map(d => {
                      const isSelected = selectedDate === d.code;
                      return (
                        <button 
                          key={d.code}
                          onClick={() => setSelectedDate(d.code)}
                          className={`flex-shrink-0 w-20 py-3 rounded-lg border-2 flex flex-col items-center transition-all ${
                            isSelected 
                              ? 'border-[#15157d] bg-[#e1e0ff] text-[#15157d]' 
                              : 'border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          <span className="text-[9px] font-bold">{d.label}</span>
                          <span className="text-lg font-black">{d.day}</span>
                          <span className="text-[9px] font-bold">{d.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Time Slots */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { code: '08:00 AM', label: '08:00 AM', sub: '4-6 Hours' },
                      { code: '10:00 AM', label: '10:00 AM', sub: '4-6 Hours' },
                      { code: '01:00 PM', label: '01:00 PM', sub: 'Booked', disabled: true },
                      { code: '03:00 PM', label: '03:00 PM', sub: '4-6 Hours' }
                    ].map(t => {
                      if (t.disabled) {
                        return (
                          <div key={t.code} className="p-3 rounded-lg border border-slate-200 text-center opacity-50 cursor-not-allowed bg-slate-50 flex flex-col justify-center">
                            <div className="font-bold text-xs text-slate-400">{t.label}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{t.sub}</div>
                          </div>
                        );
                      }
                      const isSelected = selectedTime === t.code;
                      return (
                        <button 
                          key={t.code}
                          onClick={() => setSelectedTime(t.code)}
                          className={`p-3 rounded-lg border text-center transition-all flex flex-col justify-center relative ${
                            isSelected 
                              ? 'border-[#15157d] bg-[#e1e0ff]/30 text-[#15157d]' 
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-bold text-xs">{t.label}</div>
                          <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#15157d]' : 'text-slate-500'}`}>{t.sub}</div>
                          {isSelected && (
                            <div className="absolute top-1 right-1">
                              <span className="material-symbols-outlined text-xs text-[#15157d]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div className="mb-8">
                <h3 className="text-base font-bold text-[#15157d] mb-4">Enhance Your Service</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                  {/* Addon 1 */}
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-sm border border-[#c7c5d4]/20 text-left">
                    <div className="h-32 relative bg-slate-100">
                      <img 
                        className="w-full h-full object-cover" 
                        alt="Balcony cleaner scrubbing tiles"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeQa-Hgq1kG4qATLNXWYFzhExFq_KkOnDlrYWeroc1kkQ69uW5GbCK-eTxOz0Z5nOrgpRyQJQgLTQtGfTGY-qluLGWlDq2cHAZs2zm2MMtUwfwzAUygBdRQ3tFLmovZgTZs6Fb9r0siCuFOzwZ_7dt9GPSEs7QKcQQ8eVRUPIBKicDRhAsiLwwOMlk3rrWIcLsoG30bbx88fRVt628QiY7BNZ3XFsrkp9RNuHalp8iMnj7ObaZdjRSIrXPQdZcD4AjM4DQ6Ngsdx0f"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-[#15157d] shadow-sm">+ ₹499</div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-xs font-bold text-slate-800">Balcony Scrubbing</h5>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">Pressure washing and bird-droppings removal.</p>
                      <button 
                        onClick={() => handleToggleAddon('balcony')}
                        className={`mt-4 w-full py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                          selectedHomeCareAddons.includes('balcony')
                            ? 'bg-blue-600 text-white border-transparent'
                            : 'border border-secondary text-secondary hover:bg-slate-50'
                        }`}
                      >
                        {selectedHomeCareAddons.includes('balcony') ? '✓ Added' : 'Add Item'}
                      </button>
                    </div>
                  </div>

                  {/* Addon 2 */}
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-sm border border-[#c7c5d4]/20 text-left">
                    <div className="h-32 relative bg-slate-100">
                      <img 
                        className="w-full h-full object-cover" 
                        alt="Hygienic fresh fridge interior"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4nqXEIP37S4E-1Zg8IJVX7zc8zFlRgcA9LYwM-iyyGFre76nJvmpFoywW1CxmlgNQ5EzUWDL6JIimsD_VwDeDEZV_C4J_a9TZK7mDqtnanp-WO1G_qbbqGcc6nrhd6uwRZXyJ-QoWuCG0G-yvCWJ-oE_4xldeEI1X4Fc3bzbhBvljsqqGTTVEPO9tLWVNiD96cFodanuCtyOseKCu6LeQ4vX7qM5lgkdl8slZw1Ty_mwKoGJK_461j9nXnBmfkMfOnEiE_9d4DNnU"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-[#15157d] shadow-sm">+ ₹599</div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-xs font-bold text-slate-800">Fridge Interior</h5>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">Deep sterilization and odor neutralization.</p>
                      <button 
                        onClick={() => handleToggleAddon('fridge')}
                        className={`mt-4 w-full py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                          selectedHomeCareAddons.includes('fridge')
                            ? 'bg-blue-600 text-white border-transparent'
                            : 'border border-secondary text-secondary hover:bg-slate-50'
                        }`}
                      >
                        {selectedHomeCareAddons.includes('fridge') ? '✓ Added' : 'Add Item'}
                      </button>
                    </div>
                  </div>

                  {/* Addon 3 */}
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden shadow-sm border border-[#c7c5d4]/20 text-left">
                    <div className="h-32 relative bg-slate-100">
                      <img 
                        className="w-full h-full object-cover" 
                        alt="High gloss tile steam polish grout clean"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYjN6_TBPp5L-0xx5RWrE2j55JR73R5qmohpyE8vD6vdMYyt-FUAV6tsT0VYLUmuz3Lg8IexbbDlk4lmaMP58kandPCPadG8Nj3VajQfE2oYxSvTuhCxYupHbMaxeIPR4RbgfMSFSS_B9pMQ4E-EJLjIyt3g2NOa7GJwSJjinqEdw8MLt1Skx_2uFBrJRm1eWWQERg2rb8D8JO7k7sGIK3CQ7wESQ40DvkIyHnCO0kFG0P40d9xxjiWWEDkp5ehCsSUAy4_mbHFup7"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold text-[#15157d] shadow-sm">+ ₹349</div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-xs font-bold text-slate-800">Tile Steam Polish</h5>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">Steam treatment for high-gloss restoration.</p>
                      <button 
                        onClick={() => handleToggleAddon('tile')}
                        className={`mt-4 w-full py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                          selectedHomeCareAddons.includes('tile')
                            ? 'bg-blue-600 text-white border-transparent'
                            : 'border border-secondary text-secondary hover:bg-slate-50'
                        }`}
                      >
                        {selectedHomeCareAddons.includes('tile') ? '✓ Added' : 'Add Item'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GIFTING TAB */}
          {activeActionTab === 'gifts' && (
            <div className="space-y-md">
              <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                <div>
                  <h2 className="text-xl font-bold text-[#15157d]">NestMate Gifting &amp; Flowers</h2>
                  <p className="text-slate-500 text-xs">Curated concierge picks for every occasion.</p>
                </div>
              </div>

              {/* Gifting Occasions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mb-8">
                {giftingEvents.map(event => (
                  <div key={event.id} className="bg-white border border-[#c7c5d4]/40 rounded-2xl p-md shadow-sm flex items-start justify-between hover:shadow-md transition-all">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-pink-700 bg-pink-100 border border-pink-200 px-2 py-0.5 rounded-full uppercase">
                        {event.date}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 mt-1">{event.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-normal">Gift Recommendation: <span className="font-semibold text-primary">{event.gift}</span></p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-sm">
                      <span className="text-xs font-black text-slate-800">₹{event.price}</span>
                      {event.status === 'PENDING' ? (
                        <button 
                          onClick={() => setCheckoutService({ id: event.id, title: event.gift, price: event.price })}
                          className="rounded-lg bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 text-[10px] font-bold shadow-sm"
                        >
                          Order Gift
                        </button>
                      ) : (
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase">ORDERED</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Gifting Products */}
              <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 -mx-6 px-6">
                {/* Gift Item 1 */}
                <div 
                  onClick={() => setCheckoutService({ id: 'gift_wellness', title: 'Wellness Spa Gift Basket', price: 1299 })}
                  className="min-w-[220px] max-w-[220px] group cursor-pointer"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 shadow-sm border border-[#c7c5d4]/20 bg-slate-100">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt="Wellness basket"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3xDqQSDdTx-OCT0OTFQVfuFZr-2lpj33l43USoKUMDjm_atrSLotc8BYNT6Bk7IE8NQ6TE0KjktbFh7RLolO37Iz3jfSBKZuVN_uWhDoMxtvolbzO_mgHhuPXlDEWpJ3Lo_t8R4-pbc8I8yLvHGg0Z2JwjTXo66DyBg8GFE0S5tgD1ZvZYuDXGlzuqU8i0z9Nxzxtt8I1MZa4w23E-5cso5YVYsEC1G2qNNw2H5FafvF6-ihVBpEOh-E8zwMFRBL1TrKu86FDi_Lj"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Wellness Basket</h4>
                      <p className="text-slate-500 text-[10px]">Spa &amp; Relaxation</p>
                    </div>
                    <span className="text-xs font-bold text-[#006a65]">₹1,299</span>
                  </div>
                </div>

                {/* Gift Item 2 */}
                <div 
                  onClick={() => setCheckoutService({ id: 'gift_flowers', title: 'Daily Fresh Peonies Bouquet', price: 850 })}
                  className="min-w-[220px] max-w-[220px] group cursor-pointer"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 shadow-sm border border-[#c7c5d4]/20 bg-slate-100">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt="Flowers bouquet"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHutVUKdWnTw1XLzeJiIJzWld9r29AkEj20J6LYWbNBsg43v3CEAHmirrSNIhmS9lfgiXL-ZJQtcnJsWGz5hUPOrgT30gqTSZv9i054HSUfhqYYH1laXFUC2Ia3bVACje9MkNZvaO1ln1X67Z4H9d-JOIsnebyqyGAXXsdm6hgerciILzojGYVcmPPTwWrqmsZ89p_66vfks4jDaxhSfQXTSh0UgL_RFG0ASg8MGa3LDXlj8KGB2A19erNPIDzbWDJX2Fjgz6bZh4E"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Daily Flowers</h4>
                      <p className="text-slate-500 text-[10px]">Morning Fresh Cut</p>
                    </div>
                    <span className="text-xs font-bold text-[#006a65]">₹850</span>
                  </div>
                </div>

                {/* Gift Item 3 */}
                <div 
                  onClick={() => setCheckoutService({ id: 'gift_luxe', title: 'Luxe Ceramic Housewarming Set', price: 4500 })}
                  className="min-w-[220px] max-w-[220px] group cursor-pointer"
                >
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 shadow-sm border border-[#c7c5d4]/20 bg-slate-100">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt="Housewarming dinnerware"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH7oOvXk0rHuQmHeFwIVnTOabAl2pBLyiFWVX3ABzgjvaZA72vQ5vPDjJWONp8yuyvo-XiI6nQdH5mvyT6qvyEnv_eY08z_o2l30D_ihIvNUQsf4qm5CbIOOo9bRUOSUMmdAUMFrVMYpW8v--fNlgnFTantfKn1i6jqf834wjYqU1p6snG52pTeAtpGHJnx_uU0VFDH-7yNLRgTM4DxdFeaCinx2owkyIN-l7gKG_IYkzsPsaq8MjWN7jhoKBHFX0KVqGFAfifZUQZ"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Housewarming Luxe</h4>
                      <p className="text-slate-500 text-[10px]">For new beginnings</p>
                    </div>
                    <span className="text-xs font-bold text-[#006a65]">₹4,500</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeActionTab === 'nest' && (
            <ProfileView 
              onOpenSafetyCenter={() => setSubView('safety')}
              onOpenBookingHistory={() => setSubView('booking_history')}
              onOpenSecurePayments={() => setSubView('secure_payments')}
              onOpenAdmin={() => setSubView('admin_login')}
              onLogout={() => {
                setFlowStep('splash');
                setSubView(null);
                setActiveActionTab('daily');
              }}
            />
          )}
        </div>

        {/* NestMate Candle suggestion banner */}
        <div className="bg-gradient-to-r from-[#e1e0ff]/40 to-white border border-[#c0c1ff]/60 p-5 rounded-3xl text-left space-y-3 shadow-sm relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-xs">
            <span className="text-[10px] font-bold text-[#04006d] bg-[#e1e0ff] border border-[#c0c1ff] px-2 py-0.5 rounded-full uppercase tracking-wider">💡 SMART SUGGESTION</span>
          </div>
          <p className="text-xs md:text-sm text-slate-700 mt-1 leading-relaxed">Friday Evening Housekeeping booked? Add a 'Weekend Recharge' aromatherapy candle bundle from NestMate for just <span className="font-bold text-indigo-700">₹299</span>.</p>
          <button 
            onClick={() => setCartBundle(!cartBundle)}
            className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
              cartBundle 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            {cartBundle ? '✓ Candle Bundle Added (20% Off Applied)' : 'Add to Booking'}
          </button>
        </div>

        {/* WORKFORCE MATCHMAKING ("My Regulars") & BIOMETRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg border-t border-slate-200 pt-lg text-left">
          {/* Workforce match panel */}
          <div className="bg-white p-md rounded-3xl border border-slate-200 shadow-sm space-y-md">
            <h3 className="text-sm font-bold text-[#15157d] flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">group</span>
              My Regulars Preferred Team
            </h3>
            
            <div className="space-y-sm">
              {regulars.map(partner => (
                <div key={partner.id} className="flex items-center justify-between border-b border-slate-100 pb-sm last:border-0 last:pb-0">
                  <div 
                    onClick={() => handleOpenProviderProfile(partner.name, partner.service, partner.rating, partner.id === 'p1' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuACBgyRTWFTz1anff53QNAyqxebFnT_MPHReXYVelfpRI5x9e8aTvPcg2uxjS4FF-dE0uzel43aVXKyMicO0huAVz3KTr_sMEu4GjDPVJekEozRnuAMf7ShiUHJp9bGyqXaPaHITlrGg2xUQUS1hQarrJ6rnYogiQd6fR7m3D5Enp02DPVBw0XWzXUctV0zHxEh17nKmHOIk0IoHqG8EQ8AWdml3f116I-ga4nobL9f5JesHdHTJeoUg5A9HQwCfna4uGtRMYHyPesW' : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcEC4j7Eq7gB_UqK48Q2Zf2npW2u6SUmGXbrOKPJwCW5w9WN4XTJQqkIeeCOKbehQfn3GljB9Gs5K6bA7Bb25PmSuvREMjp0vfO4xaX14leBxkKi5axpUjhi1sQ0cXdgjdzhfFM22feS6RKChe-bYZ1P5cb49dSCho4FHfqHtB191wxv4lXXyriejjMMcz8wlvl_SIhoCQqCS-7IzmdkGhmGftZRuvZt0-WwlJcOpJnZCw4xJgfGpXei_xhDGKKCBP2RjRG2nHdMa-')}
                    className="space-y-0.5 cursor-pointer group text-left"
                  >
                    <p className="text-xs font-bold text-slate-800 group-hover:text-[#15157d]">{partner.name}</p>
                    <p className="text-[10px] text-slate-500">{partner.service} • Rating: {partner.rating}⭐</p>
                  </div>
                  
                  <button
                    onClick={() => setActiveVerifyPartner(partner)}
                    className="rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-100 px-3 py-1.5 flex items-center gap-1 shadow-sm transition-all"
                  >
                    <span className="material-symbols-outlined text-xs">video_camera_front</span>
                    Video Verify
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Biometrics verify feed */}
          {activeVerifyPartner ? (
            <VideoVerify 
              expertName={activeVerifyPartner.name}
              expertId={activeVerifyPartner.id}
              onVerificationComplete={() => {
                setTimeout(() => setActiveVerifyPartner(null), 3000);
              }}
            />
          ) : (
            <div className="bg-white p-md rounded-3xl border border-slate-200 shadow-sm flex items-center justify-center text-center opacity-70 min-h-[200px]">
              <div className="space-y-xs">
                <span className="material-symbols-outlined text-4xl text-slate-400">badge</span>
                <p className="text-xs text-slate-500 max-w-xs">Select "Video Verify" on any regular partner to launch facial check-in scanning.</p>
              </div>
            </div>
          )}
        </div>

        {/* Trust Section */}
        <section className="bg-white border border-slate-200/60 rounded-2xl p-8 mb-12 shadow-sm text-center">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-primary mb-1">Built on Local Trust</h2>
            <p className="text-slate-500 text-xs">Every professional is verified and rated by your neighbors.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-black text-primary mb-1">4.8/5</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg. Pro Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-primary mb-1">12k+</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verified Pros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-primary mb-1">15m</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg. Arrival</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-primary mb-1">100%</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 border-t border-slate-100 pt-6">
            <div className="flex -space-x-3">
              <img alt="User" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOYRP_VJZCngaPq1ZID0AFKmqmHTUGxbI8IeMnwQeNOQMw2XxbhZTJhfOWT0QDlztHlwwZ52NBL3KQQGxgN37J3NOxAMYkOcAX-TLeRdHNEJ3yR7DaCEUTzVMjRggeBM4Yf61Mu4yP6hBDKAq-0e64eGZeeJAc2Krrzeulgb70RG_a1lp-ArUc9VSZ9q-s7dKEDLEl1dL-Bd8Xecko2pVDmM37OzDUrIsaR6CWlCpvrx_vpcQsA9PVwByE25JzWYnwW2jvnhyC8TaK"/>
              <img alt="User" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvJsW5Ebrw1TkfKyj67IsUBMH76H1tmPkztm-TIYYq7IyCDPyyd4VHyTlLoFMqyvY7_lyR0KC8yVyr4nDNgK1kamsIA-H7Hu2ujDzbeNKk_2fyLS3kXUqg0kTv5BJLQU2y7Qze1MU6f_3XP1uC8Qa23NBs_AjAr8DgZDuNgy43U5CGLYoagxo9GZNJWhdFzRXhfxypKSa2iLqJA_EqD7jVjLCpS-NMNW70gyv1cDnv4AK0yhcCNLCAVjnVg4kA7e0MMLJFCtDw7oh6"/>
              <img alt="User" className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgsPZ9XgQQLGiIY3hsV-QYj5aWYvSsdJdOg6Nz7NxoZ94O2Bdl3_VsnjlcrsOCIF3EqP8hahNcxS_7RNvJxI9pdQPINGalqw9gy-XH3riU_qh1fIV9hGKEgQG2frUoEChKUAtVyzgUaFyVvvp3709FL0RZLl0eFS19OFN-3xTOsJcZ5HW5tNea7meVwTHmlBmwnEaKnw6eLL0JZmKoMMLnjpohzluht1CzO650kxaKMFgWCH9h4H3SU46-MRuJdROZkqdhH4oseT2X"/>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#e1e0ff] flex items-center justify-center text-primary text-[10px] font-bold">+500</div>
            </div>
            <p className="text-slate-500 font-semibold text-xs py-2">Trusted by 500+ homes in Indiranagar, Bangalore</p>
          </div>
        </section>
      </main>

      {/* Bottom Nav Bar */}
      <nav className="bg-white/95 backdrop-blur-md fixed bottom-0 w-full z-50 border-t border-slate-200/80 shadow-[0_-4px_12px_rgba(21,21,125,0.05)]">
        <div className="flex justify-around items-center w-full px-2 py-3 pb-safe max-w-lg mx-auto">
          <button 
            onClick={() => setActiveActionTab('daily')}
            className={`flex flex-col items-center justify-center py-1 px-5 rounded-full transition-all duration-200 ${
              activeActionTab === 'daily' 
                ? 'bg-[#6ff7ee] text-[#00201e] font-bold shadow-sm' 
                : 'text-slate-500 hover:text-[#15157d]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">home_work</span>
            <span className="text-[10px] font-medium mt-0.5">Daily Help</span>
          </button>
          
          <button 
            onClick={() => setActiveActionTab('deep')}
            className={`flex flex-col items-center justify-center py-1 px-5 rounded-full transition-all duration-200 ${
              activeActionTab === 'deep' 
                ? 'bg-[#6ff7ee] text-[#00201e] font-bold shadow-sm' 
                : 'text-slate-500 hover:text-[#15157d]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">cleaning_services</span>
            <span className="text-[10px] font-medium mt-0.5">Home Care</span>
          </button>
          
          <button 
            onClick={() => setActiveActionTab('gifts')}
            className={`flex flex-col items-center justify-center py-1 px-5 rounded-full transition-all duration-200 ${
              activeActionTab === 'gifts' 
                ? 'bg-[#6ff7ee] text-[#00201e] font-bold shadow-sm' 
                : 'text-slate-500 hover:text-[#15157d]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">redeem</span>
            <span className="text-[10px] font-medium mt-0.5">Gifting</span>
          </button>

          <button 
            onClick={() => setActiveActionTab('nest')}
            className={`flex flex-col items-center justify-center py-1 px-5 rounded-full transition-all duration-200 ${
              activeActionTab === 'nest' 
                ? 'bg-[#6ff7ee] text-[#00201e] font-bold shadow-sm' 
                : 'text-slate-500 hover:text-[#15157d]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">nest_eco_leaf</span>
            <span className="text-[10px] font-medium mt-0.5">My Nest</span>
          </button>
        </div>
      </nav>

      {/* Daily Help Bottom Booking CTA (Contextual) */}
      {activeActionTab === 'daily' && selectedDailyService && (
        <div className="fixed bottom-20 left-0 w-full px-6 z-40 max-w-sm mx-auto left-1/2 -translate-x-1/2">
          <button 
            onClick={() => {
              const service = selectedDailyService === 'dish' ? { title: 'Dishwashing Session (1 Hr)', price: 299 } :
                              selectedDailyService === 'clean' ? { title: 'Cleaning Session (2 Hr)', price: 549 } :
                              { title: 'Ironing Session (30 Mins)', price: 149 };
              setSelectedServiceForScheduling({ id: `daily_${selectedDailyService}`, title: service.title, price: service.price });
              setSubView('schedule_service');
            }}
            className="w-full h-14 bg-[#15157d] hover:bg-[#2e3192] text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span>Book Professional</span>
            <span className="material-symbols-outlined">bolt</span>
          </button>
        </div>
      )}

      {/* Component C: Bundling checkout card popup overlay */}
      {checkoutService && (
        <BundledCheckout
          selectedService={checkoutService}
          walletBalance={walletBalance}
          onConfirmCheckout={handleConfirmCheckout}
          onCancel={() => setCheckoutService(null)}
          preselectedCandle={cartBundle}
        />
      )}

      {/* Global Toast Notification Container */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="bg-slate-900/95 text-white border border-slate-700/80 rounded-2xl p-4 shadow-2xl flex items-start gap-3 pointer-events-auto animate-slideLeft max-w-sm backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-[#6ff7ee]/10 text-[#6ff7ee] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">notifications</span>
            </div>
            <div className="flex-grow text-left text-xs">
              <h4 className="font-black text-slate-200 leading-tight">{toast.title}</h4>
              <p className="text-slate-400 font-medium mt-1 leading-normal">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
