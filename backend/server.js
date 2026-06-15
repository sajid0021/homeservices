const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// OTP Memory Store
const otpStore = {};

// Mock Database for Workforce Matchmaking ("My Regulars")
const mockPartners = [
  { id: 'p1', name: 'Seema Rao', service: 'Daily Housekeeping', rating: 4.9, secondaryId: 'p2' },
  { id: 'p2', name: 'Ramesh Kumar', service: 'Backup Housekeeping', rating: 4.7 }
];

// OTP APIs
app.post('/api/otp/send', (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber || phoneNumber.length !== 10) {
    return res.status(400).json({ success: false, error: "Invalid phone number! Please enter a 10-digit number." });
  }

  // Generate 6-Digit Random OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP with 5-minute expiry
  otpStore[phoneNumber] = {
    otp: generatedOtp,
    expiresAt: Date.now() + 5 * 60 * 1000 
  };

  // SMS Gateway Simulation Alert
  console.log(`\n--- 📱 REALISTIC SMS GATEWAY ALERT ---`);
  console.log(`To: +91 ${phoneNumber}`);
  console.log(`Message: [NestMate] Your login OTP is: ${generatedOtp}. This is valid for 5 minutes only.`);
  console.log(`--------------------------------------\n`);

  res.json({ success: true, message: "OTP sent successfully!", devOtp: generatedOtp });
});

app.post('/api/otp/verify', (req, res) => {
  const { phoneNumber, otp } = req.body;
  const record = otpStore[phoneNumber];

  if (!record) {
    return res.status(400).json({ success: false, error: "No OTP request found for this number, or it has expired." });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[phoneNumber];
    return res.status(400).json({ success: false, error: "OTP has expired." });
  }

  if (record.otp === otp) {
    delete otpStore[phoneNumber];
    res.json({ success: true, message: "Login successful! Welcome to NestMate." });
  } else {
    res.status(400).json({ success: false, error: "Incorrect OTP! Please try again." });
  }
});

// In-Memory Bookings and Notifications Databases
const bookingsStore = [
  {
    id: 'NM-98231',
    title: 'Bathroom Sanitization Routine',
    price: 1149.00,
    providerName: 'Anita K.',
    providerRating: 4.9,
    date: 'Jun 10, 2026',
    time: '10:00 AM',
    status: 'Completed',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    lastUpdated: Date.now() - 3 * 24 * 60 * 60 * 1000
  },
  {
    id: 'NM-91283',
    title: 'AC Filter Check & Dusting',
    price: 850.00,
    providerName: 'Rohan S.',
    providerRating: 4.7,
    date: 'May 28, 2026',
    time: '02:00 PM',
    status: 'Completed',
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    lastUpdated: Date.now() - 15 * 24 * 60 * 60 * 1000
  }
];

const notificationsStore = [
  {
    id: 'n-init-1',
    title: 'Welcome to NestMate!',
    message: 'Set up your location and select your first domestic chore.',
    time: 'Just now',
    read: false
  }
];

// 1. Cross-Service Bundling Checkout Endpoint
app.post('/api/bookings', (req, res) => {
  const { primaryService, bundleAddons, bookingDetails } = req.body;
  let totalCost = primaryService.price;

  // Apply 20% bundling discount philosophy
  if (bundleAddons && bundleAddons.length > 0) {
    bundleAddons.forEach(addon => {
      totalCost += addon.price * 0.8; 
    });
  }

  const generatedId = `NM-${Math.floor(Math.random() * 90000) + 10000}`;
  
  // Choose random provider details
  const randomProvider = primaryService.title.toLowerCase().includes('ac') 
    ? { name: 'Arjun Varma', rating: 4.8 }
    : { name: 'Seema Rao', rating: 4.9 };

  const newBooking = {
    id: generatedId,
    title: primaryService.title,
    price: totalCost,
    providerName: randomProvider.name,
    providerRating: randomProvider.rating,
    date: bookingDetails?.date || 'Today',
    time: bookingDetails?.time || 'ASAP',
    status: 'Scheduled', // 'Scheduled' | 'Partner Assigned' | 'Arrived' | 'In Progress' | 'Completed'
    createdAt: Date.now(),
    lastUpdated: Date.now()
  };

  bookingsStore.unshift(newBooking);

  // Push confirmation notification
  notificationsStore.unshift({
    id: `n-conf-${Date.now()}`,
    title: 'Booking Confirmed!',
    message: `Your booking for ${newBooking.title} is confirmed with ${newBooking.providerName}.`,
    time: 'Just now',
    read: false
  });

  res.status(201).json({
    success: true,
    bookingId: generatedId,
    totalCost,
    booking: newBooking,
    message: "Unified Booking Context Saved Successfully."
  });
});

// Get Bookings List
app.get('/api/bookings', (req, res) => {
  res.json({ success: true, bookings: bookingsStore });
});

// Get Notifications List
app.get('/api/notifications', (req, res) => {
  res.json({ success: true, notifications: notificationsStore });
});

// Post Mark Notification as Read
app.post('/api/notifications/read', (req, res) => {
  notificationsStore.forEach(n => n.read = true);
  res.json({ success: true });
});

// 2. Fetch "My Regulars" Engine
app.get('/api/partners/regulars', (req, res) => {
  res.json({ success: true, preferredTeam: mockPartners });
});

// Fetch Dashboard blueprint
app.get('/api/dashboard', (req, res) => {
  res.json({
    location: { id: 'loc_1', name: '🏠 Indiranagar, Bangalore' }
  });
});

// 3. AI-Video Verification Event Handler
app.post('/api/verify-session', (req, res) => {
  const { expertId, checkInTime } = req.body;
  res.json({
    success: true,
    verificationStatus: 'PENDING_AI_STREAM',
    token: `V-TOK-${Date.now()}`
  });
});

// Simulated Real-Time Booking State Machine Loop
// Moves active bookings forward every 12 seconds to make the app feel alive!
setInterval(() => {
  bookingsStore.forEach(booking => {
    if (booking.status !== 'Completed') {
      let nextStatus;
      let msg;
      
      if (booking.status === 'Scheduled') {
        nextStatus = 'Partner Assigned';
        msg = `${booking.providerName} has been assigned to your ${booking.title} request.`;
      } else if (booking.status === 'Partner Assigned') {
        nextStatus = 'Arrived';
        msg = `${booking.providerName} has arrived at your doorstep.`;
      } else if (booking.status === 'Arrived') {
        nextStatus = 'In Progress';
        msg = `${booking.providerName} has begun performing ${booking.title}.`;
      } else if (booking.status === 'In Progress') {
        nextStatus = 'Completed';
        msg = `Chore completed successfully by ${booking.providerName}. Rate your experience!`;
      }

      if (nextStatus) {
        booking.status = nextStatus;
        booking.lastUpdated = Date.now();
        notificationsStore.unshift({
          id: `n-${Date.now()}-${Math.random()}`,
          title: `Chore Update: ${nextStatus}`,
          message: msg,
          time: 'Just now',
          read: false
        });
        console.log(`[STATUS SIMULATION] Booking ${booking.id} transitioned to ${nextStatus}`);
      }
    }
  });
}, 12000);

// Admin override status updates
app.post('/api/bookings/update-status', (req, res) => {
  const { id, status, providerName, providerRating } = req.body;
  const booking = bookingsStore.find(b => b.id === id);
  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking reference not found.' });
  }

  if (status) {
    booking.status = status;
    
    // Add real-time event log
    notificationsStore.unshift({
      id: `n-admin-${Date.now()}-${Math.random()}`,
      title: `Admin Override: ${status}`,
      message: `Booking ${id} status pushed to ${status} by systems administrator.`,
      time: 'Just now',
      read: false
    });
    console.log(`[ADMIN OVERRIDE] Booking ${id} status set to ${status}`);
  }

  if (providerName) {
    booking.providerName = providerName;
  }
  if (providerRating) {
    booking.providerRating = parseFloat(providerRating);
  }

  booking.lastUpdated = Date.now();
  res.json({ success: true, booking });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`NestMate Backbone operating on port ${PORT}`));
