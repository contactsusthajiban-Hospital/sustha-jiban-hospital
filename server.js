const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection with retry
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message);
    setTimeout(connectDB, 5000);
  }
};
connectDB();

mongoose.connection.on('error', err => {
  console.error('MongoDB runtime error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Reconnecting...');
  setTimeout(connectDB, 5000);
});

// Enhanced Schemas
const Doctor = mongoose.model('Doctor', new mongoose.Schema({
  id: Number, 
  name: String, 
  nameBn: String, 
  qualification: String,
  qualificationBn: String, 
  specialty: String, 
  specialtyBn: String,
  timing: String, 
  timingBn: String, 
  days: String
}));

const Patient = mongoose.model('Patient', new mongoose.Schema({
  patientId: String, 
  firstName: String, 
  lastName: String,
  phone: String, 
  email: String, 
  visits: { type: Number, default: 1 }, 
  lastVisit: String,
  createdAt: { type: Date, default: Date.now }
}));

const Appointment = mongoose.model('Appointment', new mongoose.Schema({
  appointmentId: String, 
  patientId: String, 
  firstName: String,
  lastName: String, 
  phone: String, 
  email: String, 
  doctor: String,
  doctorTiming: String, 
  date: String, 
  time: String, 
  symptoms: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

// Init doctors
const initDoctors = async () => {
  try {
    const count = await Doctor.countDocuments();
    if (count === 0) {
      await Doctor.insertMany([
        {id:1,name:"Dr. Abhishek Das",nameBn:"ডাঃ অভিষেক দাস",qualification:"BDS, MDS",qualificationBn:"বিডিএস, এমডিএস",specialty:"Dental Surgeon",specialtyBn:"দন্ত্য চিকিৎসক",timing:"Everyday 10 AM - 2 PM",timingBn:"প্রতিদিন সকাল ১০টা - দুপুর ২টা",days:"Daily"},
        {id:2,name:"Dr. Bishwajit Ghosh",nameBn:"ডাঃ বিশ্বজিৎ ঘোষ",qualification:"MBBS",qualificationBn:"এমবিবিএস",specialty:"General Physician",specialtyBn:"জেনারেল ফিজিশিয়ান",timing:"Sunday 2 PM onwards",timingBn:"রবিবার দুপুর ২টা থেকে",days:"Sunday"},
        {id:3,name:"Dr. Prodip Kumar Sarkar",nameBn:"ডাঃ প্রদীপ কুমার সরকার",qualification:"MBBS, MD",qualificationBn:"এমবিবিএস, এমডি",specialty:"Specialist Physician",specialtyBn:"বিশেষজ্ঞ ফিজিশিয়ান",timing:"Sunday 6 PM onwards",timingBn:"রবিবার সন্ধ্যা ৬টা থেকে",days:"Sunday"},
        {id:4,name:"Dr. Santu Hossain",nameBn:"ডাঃ সন্তু হোসেন",qualification:"MBBS, MD",qualificationBn:"এমবিবিএস, এমডি",specialty:"Chest Specialist",specialtyBn:"বক্ষ রোগ বিশেষজ্ঞ",timing:"Monday 4 PM onwards",timingBn:"সোমবার বিকেল ৪টা থেকে",days:"Monday"},
        {id:5,name:"Dr. Soumya Ray",nameBn:"ডাঃ সৌম্য রায়",qualification:"MBBS, MS",qualificationBn:"এমবিবিএস, এমএস",specialty:"ENT Specialist",specialtyBn:"নাক, কান, গলা বিশেষজ্ঞ",timing:"Monday 4 PM onwards",timingBn:"সোমবার বিকেল ৪টা থেকে",days:"Monday"},
        {id:6,name:"Dr. Amit Agarwal",nameBn:"ডাঃ অমিত আগারওয়াল",qualification:"MBBS, DNB",qualificationBn:"এমবিবিএস, ডিএনবি",specialty:"Critical Care",specialtyBn:"ক্রিটিক্যাল কেয়ার",timing:"1st & 3rd Saturday",timingBn:"১ম ও ৩য় শনিবার",days:"Saturday"},
        {id:7,name:"Dr. Sayak Chattopadhyay",nameBn:"ডাঃ সায়ক চট্টোপাধ্যায়",qualification:"MBBS, MS, MCH",qualificationBn:"এমবিবিএস, এমএস, এমসিএইচ",specialty:"Neurosurgeon",specialtyBn:"নিউরোসার্জন",timing:"Friday 10 AM onwards",timingBn:"শুক্রবার সকাল ১০টা থেকে",days:"Friday"},
        {id:8,name:"Dr. Ayesha Chakraborty",nameBn:"ডাঃ আয়েশা চক্রবর্তী",qualification:"MBBS, MS",qualificationBn:"এমবিবিএস, এমএস",specialty:"Gynecologist",specialtyBn:"গাইনেকোলজিস্ট",timing:"Every Sunday",timingBn:"প্রতি রবিবার",days:"Sunday"}
      ]);
      console.log('✅ Doctors initialized');
    }
  } catch (err) {
    console.error('Doctor init error:', err);
  }
};
initDoctors();

// Auth middleware
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({error: 'No token provided'});
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({error: 'Invalid token format'});
    }
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({error: 'Invalid or expired token'});
  }
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

app.get('/api/slots', async (req, res) => {
  try {
    const { doctor, date } = req.query;
    const allSlots = ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM','06:00 PM'];
    const booked = (await Appointment.find({doctor, date, status:{$ne:'cancelled'}})).map(a=>a.time);
    res.json(allSlots.filter(s=>!booked.includes(s)));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slots' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, doctor, date, time, symptoms } = req.body;
    
    let patient = await Patient.findOne({phone});
    const patientId = patient?.patientId || 'PT'+uuidv4().slice(0,6).toUpperCase();
    
    if (!patient) {
      await new Patient({
        patientId, 
        firstName, 
        lastName, 
        phone, 
        email: email || '', 
        visits: 1, 
        lastVisit: date
      }).save();
    } else {
      await Patient.updateOne(
        {phone}, 
        {
          $inc: {visits: 1}, 
          lastVisit: date,
          ...(email && !patient.email ? {email} : {})
        }
      );
    }
    
    const doc = await Doctor.findOne({name: doctor});
    const appointmentId = 'SJ'+Date.now().toString().slice(-6);
    
    const appointment = await new Appointment({
      appointmentId, 
      patientId, 
      firstName, 
      lastName, 
      phone, 
      email: email || '', 
      doctor,
      doctorTiming: doc?.timing || '', 
      date, 
      time, 
      symptoms: symptoms || '',
      status: 'pending'
    }).save();
    
    res.json({
      success: true, 
      appointmentId: appointment.appointmentId, 
      appointment
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'NaCks@687haratna';
  
  console.log('Login attempt:', username);
  
  if (username === validUsername && password === validPassword) {
    const token = jwt.sign(
      { role: 'admin', username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    res.json({
      success: true, 
      token: token,
      message: 'Login successful'
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

app.get('/api/admin/stats', auth, async (req, res) => {
  try {
    const [total, pending, confirmed, completed, cancelled, patients] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({status:'pending'}),
      Appointment.countDocuments({status:'confirmed'}),
      Appointment.countDocuments({status:'completed'}),
      Appointment.countDocuments({status:'cancelled'}),
      Patient.countDocuments()
    ]);
    
    res.json({ total, pending, confirmed, completed, cancelled, patients });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get('/api/admin/appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({createdAt: -1})
      .select('appointmentId patientId firstName lastName phone email doctor date time symptoms status createdAt');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

app.get('/api/admin/patients', auth, async (req, res) => {
  try {
    const patients = await Patient.find()
      .sort({createdAt: -1})
      .select('patientId firstName lastName phone email visits lastVisit createdAt');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

app.patch('/api/admin/appointments/:id', auth, async (req, res) => {
  try {
    await Appointment.findOneAndUpdate(
      {appointmentId: req.params.id}, 
      {status: req.body.status}
    );
    res.json({success:true});
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

app.get('/api/admin/export', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({createdAt: -1});
    let csv = 'Appointment ID,Patient ID,First Name,Last Name,Phone,Email,Doctor,Date,Time,Symptoms,Status,Created At\n';
    csv += appointments.map(a => 
      `"${a.appointmentId}","${a.patientId}","${a.firstName}","${a.lastName}","${a.phone}","${a.email || ''}","${a.doctor}","${a.date}","${a.time}","${(a.symptoms || '').replace(/"/g, '""')}","${a.status}","${a.createdAt}"`
    ).join('\n');
    
    res.set('Content-Type','text/csv')
       .set('Content-Disposition','attachment; filename=appointments.csv')
       .send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔑 Admin: admin / NaCks@687haratna`);
});
