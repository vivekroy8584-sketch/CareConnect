import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Pill, FileText, Activity, BookOpen, Search, Menu, User, Phone, Video, MapPin, Clock, Star, IndianRupee, Home, Stethoscope, TestTube, Upload, X, Edit, Save } from 'lucide-react';

export default function CareConnect() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [userType, setUserType] = useState('patient');
  const [userData, setUserData] = useState<any>(null);
  const [authForm, setAuthForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '',
    age: '',
    gender: '',
    location: ''
  });
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showAddReading, setShowAddReading] = useState(false);
  const [showUploadRecord, setShowUploadRecord] = useState(false);
  interface Article { id: number; title: string; category: string; readTime: string; content: string; }
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Priya Sharma', specialty: 'General Physician', date: '2026-01-28', time: '10:00 AM', fee: 200, status: 'upcoming' }
  ]);
  
  const [healthRecords, setHealthRecords] = useState([
    { id: 1, type: 'Prescription', doctor: 'Dr. Rajesh Kumar', date: '2026-01-20', title: 'Fever & Cold' },
    { id: 2, type: 'Lab Report', lab: 'City Diagnostics', date: '2026-01-15', title: 'Complete Blood Count' }
  ]);

  const [healthReadings, setHealthReadings] = useState([
    { id: 1, type: 'blood_pressure', value: '120/80', date: '2026-01-26', time: '09:00 AM' },
    { id: 2, type: 'heart_rate', value: '72', date: '2026-01-26', time: '09:00 AM' },
    { id: 3, type: 'blood_sugar', value: '95', date: '2026-01-26', time: '08:00 AM' },
  ]);

  const [newReading, setNewReading] = useState({
    type: 'blood_pressure',
    value: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5)
  });

  const [newRecord, setNewRecord] = useState({
    type: 'Prescription',
    title: '',
    doctor: '',
    lab: '',
    date: new Date().toISOString().split('T')[0]
  });

  interface Doctor {
    id: number;
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    consultations: number;
    fee: number;
    languages: string[];
    available: boolean;
    location: string;
  }

  const doctors: Doctor[] = [
    { id: 1, name: 'Dr. Priya Sharma', specialty: 'General Physician', experience: '12 years', rating: 4.8, consultations: 2500, fee: 200, languages: ['Hindi', 'English'], available: true, location: 'Civil Lines' },
    { id: 2, name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', experience: '15 years', rating: 4.9, consultations: 1800, fee: 350, languages: ['Hindi', 'Bengali'], available: true, location: 'Medical Road' },
    { id: 3, name: 'Dr. Anita Verma', specialty: 'Pediatrician', experience: '10 years', rating: 4.7, consultations: 3200, fee: 250, languages: ['Hindi', 'English'], available: false, location: 'Nehru Nagar' },
    { id: 4, name: 'Dr. Suresh Patel', specialty: 'Dermatologist', experience: '8 years', rating: 4.6, consultations: 1500, fee: 300, languages: ['Hindi', 'Gujarati'], available: true, location: 'Station Road' },
  ];

  const medicines = [
    { id: 1, name: 'Paracetamol 500mg', pharmacy: 'MedPlus Pharmacy', price: 15, stock: 'In Stock' },
    { id: 2, name: 'Paracetamol 500mg', pharmacy: 'Apollo Pharmacy', price: 18, stock: 'In Stock' },
    { id: 3, name: 'Amoxicillin 250mg', pharmacy: 'Local Chemist', price: 45, stock: 'In Stock' },
  ];

  const diagnosticTests = [
    { id: 1, name: 'Complete Blood Count', lab: 'City Diagnostics', price: 250, homeCollection: true },
    { id: 2, name: 'Lipid Profile', lab: 'HealthCare Labs', price: 400, homeCollection: true },
    { id: 3, name: 'Thyroid Profile', lab: 'Metro Labs', price: 500, homeCollection: false },
  ];

  const healthArticles = [
    { 
      id: 1, 
      title: 'Managing Diabetes in Daily Life', 
      category: 'Chronic Conditions', 
      readTime: '5 min',
      content: 'Diabetes management involves regular monitoring of blood sugar levels, maintaining a balanced diet, regular exercise, and taking prescribed medications. Key tips include eating smaller meals throughout the day, choosing whole grains over refined carbs, staying hydrated, and getting at least 30 minutes of physical activity daily. Regular check-ups with your doctor are essential to prevent complications.'
    },
    { 
      id: 2, 
      title: 'Common Cold: Prevention & Treatment', 
      category: 'General Health', 
      readTime: '3 min',
      content: 'The common cold is caused by viruses and spreads through airborne droplets. Prevention includes frequent handwashing, avoiding close contact with sick people, and maintaining good hygiene. Treatment focuses on symptom relief: rest, stay hydrated, use saline nasal drops, and take over-the-counter pain relievers if needed. Most colds resolve within 7-10 days. Consult a doctor if symptoms worsen or persist.'
    },
    { 
      id: 3, 
      title: 'Understanding Blood Pressure', 
      category: 'Heart Health', 
      readTime: '4 min',
      content: 'Blood pressure measures the force of blood against artery walls. Normal blood pressure is around 120/80 mmHg. High blood pressure (hypertension) can lead to heart disease and stroke. To maintain healthy blood pressure: reduce salt intake, exercise regularly, maintain a healthy weight, limit alcohol, manage stress, and monitor your readings regularly. Consult your doctor if readings are consistently high.'
    },
    { 
      id: 4, 
      title: 'Nutrition for a Healthy Heart', 
      category: 'Heart Health', 
      readTime: '6 min',
      content: 'A heart-healthy diet includes plenty of fruits, vegetables, whole grains, and lean proteins. Limit saturated fats, trans fats, sodium, and added sugars. Include omega-3 fatty acids from fish, nuts, and seeds. Choose healthy cooking methods like grilling, baking, or steaming. Stay hydrated and maintain portion control. A balanced diet combined with regular exercise is key to cardiovascular health.'
    },
    { 
      id: 5, 
      title: 'Mental Health and Stress Management', 
      category: 'Mental Health', 
      readTime: '7 min',
      content: 'Mental health is as important as physical health. Stress management techniques include deep breathing exercises, meditation, yoga, regular physical activity, and adequate sleep. Maintain social connections, set realistic goals, and take breaks when needed. Do not hesitate to seek professional help if feeling overwhelmed, anxious, or depressed. Remember, asking for help is a sign of strength, not weakness.'
    },
  ];

  const handleSignup = () => {
    if (authForm.name && authForm.email && authForm.phone && authForm.password) {
      setUserData({
        name: authForm.name,
        email: authForm.email,
        phone: authForm.phone,
        type: userType,
        age: authForm.age,
        gender: authForm.gender,
        location: authForm.location || 'Kolkata, West Bengal'
      });
      setIsLoggedIn(true);
      setShowAuth(false);
    }
  };

  const handleLogin = () => {
    if (authForm.email && authForm.password) {
      setUserData({
        name: userType === 'patient' ? 'Rajesh Kumar' : userType === 'doctor' ? 'Dr. Priya Sharma' : 'MedPlus Pharmacy',
        email: authForm.email,
        phone: '9876543210',
        type: userType,
        age: '32',
        gender: 'Male',
        location: 'Kolkata, West Bengal'
      });
      setIsLoggedIn(true);
      setShowAuth(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAuth(true);
    setUserData(null);
    setAuthForm({ name: '', email: '', phone: '', password: '', age: '', gender: '', location: '' });
  };

  const handleSaveProfile = () => {
    setUserData({ ...userData, ...authForm });
    setEditingProfile(false);
  };

  const handleAddReading = () => {
    const reading = {
      id: healthReadings.length + 1,
      ...newReading,
      date: newReading.date,
      time: newReading.time
    };
    setHealthReadings([reading, ...healthReadings]);
    setShowAddReading(false);
    setNewReading({
      type: 'blood_pressure',
      value: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5)
    });
  };

  const handleUploadRecord = () => {
    const baseRecord = {
      id: healthRecords.length + 1,
      type: newRecord.type,
      title: newRecord.title,
      date: newRecord.date
    };

    const record = newRecord.type === 'Lab Report'
      ? { ...baseRecord, lab: newRecord.lab }
      : { ...baseRecord, doctor: newRecord.doctor };

    setHealthRecords([record, ...healthRecords]);
    setShowUploadRecord(false);
    setNewRecord({
      type: 'Prescription',
      title: '',
      doctor: '',
      lab: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const getLatestReading = (type: string): string => {
    const reading = healthReadings.find((r) => r.type === type);
    return reading ? reading.value : 'N/A';
  };

  const AuthView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="text-blue-600" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CareConnect</h1>
          <p className="text-gray-600">Affordable Healthcare for Everyone</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              authMode === 'login'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              authMode === 'signup'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3 text-center">I am a:</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button
              onClick={() => setUserType('patient')}
              className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                userType === 'patient'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setUserType('doctor')}
              className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                userType === 'doctor'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => setUserType('pharmacy')}
              className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                userType === 'pharmacy'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pharmacy
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={authForm.phone}
                onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={10}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {authMode === 'signup' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    value={authForm.age}
                    onChange={(e) => setAuthForm({ ...authForm, age: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    value={authForm.gender}
                    onChange={(e) => setAuthForm({ ...authForm, gender: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="City, State"
                  value={authForm.location}
                  onChange={(e) => setAuthForm({ ...authForm, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <button
            onClick={authMode === 'login' ? handleLogin : handleSignup}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-lg transition-all"
          >
            {authMode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
            <div>
              <div className="font-bold text-blue-600 text-lg">₹200</div>
              <div>Starting from</div>
            </div>
            <div>
              <div className="font-bold text-green-600 text-lg">5000+</div>
              <div>Doctors</div>
            </div>
            <div>
              <div className="font-bold text-purple-600 text-lg">24/7</div>
              <div>Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">My Profile</h3>
          <button onClick={() => setShowProfile(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {!editingProfile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={48} className="text-blue-600" />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <p className="text-lg font-semibold text-gray-800">{userData?.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="text-lg font-semibold text-gray-800">{userData?.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <p className="text-lg font-semibold text-gray-800">{userData?.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">User Type</label>
                <p className="text-lg font-semibold text-gray-800 capitalize">{userData?.type}</p>
              </div>
              {userData?.age && (
                <div>
                  <label className="text-sm text-gray-600">Age</label>
                  <p className="text-lg font-semibold text-gray-800">{userData?.age}</p>
                </div>
              )}
              {userData?.gender && (
                <div>
                  <label className="text-sm text-gray-600">Gender</label>
                  <p className="text-lg font-semibold text-gray-800">{userData?.gender}</p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-600">Location</label>
                <p className="text-lg font-semibold text-gray-800">{userData?.location}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingProfile(true);
                setAuthForm({
                  name: userData.name,
                  email: userData.email,
                  phone: userData.phone,
                  password: userData?.password || '',
                  age: userData.age,
                  gender: userData.gender,
                  location: userData.location
                });
              }}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Edit size={20} />
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={authForm.phone}
                onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={authForm.age}
                  onChange={(e) => setAuthForm({ ...authForm, age: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  value={authForm.gender}
                  onChange={(e) => setAuthForm({ ...authForm, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={authForm.location}
                onChange={(e) => setAuthForm({ ...authForm, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Changes
              </button>
              <button
                onClick={() => setEditingProfile(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome, {userData?.name}!</h2>
        <p className="text-blue-100">Affordable healthcare at your fingertips</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setActiveTab('doctors')} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center space-y-2">
          <Stethoscope className="text-blue-600" size={32} />
          <span className="font-semibold text-gray-800">Find Doctors</span>
        </button>
        <button onClick={() => setActiveTab('appointments')} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center space-y-2">
          <Calendar className="text-green-600" size={32} />
          <span className="font-semibold text-gray-800">Appointments</span>
        </button>
        <button onClick={() => setActiveTab('medicines')} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center space-y-2">
          <Pill className="text-purple-600" size={32} />
          <span className="font-semibold text-gray-800">Medicines</span>
        </button>
        <button onClick={() => setActiveTab('diagnostics')} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center space-y-2">
          <TestTube className="text-red-600" size={32} />
          <span className="font-semibold text-gray-800">Lab Tests</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <Calendar className="mr-2 text-blue-600" size={20} />
          Upcoming Appointments
        </h3>
        {appointments.filter(a => a.status === 'upcoming').length > 0 ? (
          appointments.filter(a => a.status === 'upcoming').map(apt => (
            <div key={apt.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
              <p className="font-semibold text-gray-800">{apt.doctor}</p>
              <p className="text-sm text-gray-600">{apt.specialty}</p>
              <p className="text-sm text-gray-700 mt-1">{apt.date} at {apt.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No upcoming appointments</p>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <BookOpen className="mr-2 text-green-600" size={20} />
          Health Education
        </h3>
        <div className="space-y-2">
          {healthArticles.slice(0, 2).map(article => (
            <div 
              key={article.id} 
              onClick={() => {
                setSelectedArticle(article);
                setActiveTab('education');
              }}
              className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer"
            >
              <p className="font-semibold text-gray-800 text-sm">{article.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-600">{article.category}</span>
                <span className="text-xs text-gray-500">{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DoctorsView = () => (
    <div className="space-y-4">
      <div className="sticky top-0 bg-gray-50 pb-4 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by specialty or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-3">
        {doctors.filter(doc => 
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(doctor => (
          <div key={doctor.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{doctor.name}</h3>
                <p className="text-blue-600 font-semibold">{doctor.specialty}</p>
                <p className="text-sm text-gray-600">{doctor.experience} experience</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${doctor.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {doctor.available ? 'Available' : 'Busy'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div className="flex items-center text-gray-600">
                <Star className="text-yellow-500 mr-1" size={16} />
                {doctor.rating} ({doctor.consultations}+)
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-1" size={16} />
                {doctor.location}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {doctor.languages.map(lang => (
                <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {lang}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center">
                <IndianRupee size={18} className="text-green-600" />
                <span className="text-xl font-bold text-green-600">{doctor.fee}</span>
                <span className="text-sm text-gray-600 ml-1">per visit</span>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
                  <Video size={16} className="mr-1" />
                  Consult
                </button>
                <button 
                  onClick={() => setSelectedDoctor(doctor)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm"
                >
                  <Calendar size={16} className="mr-1" />
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Book Appointment</h3>
            <p className="text-gray-700 mb-4">Dr. {selectedDoctor.name} - {selectedDoctor.specialty}</p>
            <div className="space-y-3 mb-4">
              <input type="date" className="w-full px-4 py-2 border rounded-lg" />
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>2:00 PM</option>
                <option>4:00 PM</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setAppointments([...appointments, {
                    id: appointments.length + 1,
                    doctor: selectedDoctor.name,
                    specialty: selectedDoctor.specialty,
                    date: '2026-01-30',
                    time: '10:00 AM',
                    fee: selectedDoctor.fee,
                    status: 'upcoming'
                  }]);
                  setSelectedDoctor(null);
                  setActiveTab('appointments');
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Confirm Booking
              </button>
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AppointmentsView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
      
      {appointments.length > 0 ? (
        appointments.map(apt => (
          <div key={apt.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-800">{apt.doctor}</h3>
                <p className="text-sm text-blue-600">{apt.specialty}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                {apt.status}
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <Calendar size={16} className="mr-2" />
              {apt.date} at {apt.time}
            </div>
            <div className="flex items-center text-green-600 font-semibold">
              <IndianRupee size={16} />
              {apt.fee}
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                Join Video Call
              </button>
              <button className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-300">
                Reschedule
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No appointments yet</p>
          <button 
            onClick={() => setActiveTab('doctors')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book an Appointment
          </button>
        </div>
      )}
    </div>
  );

  const MedicinesView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Medicine Delivery</h2>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search medicines..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-sm text-blue-800">💡 <strong>Price Comparison:</strong> We show prices from multiple pharmacies to help you save money!</p>
      </div>

      <div className="space-y-3">
        {medicines.map(med => (
          <div key={med.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-800">{med.name}</h3>
                <p className="text-sm text-gray-600">{med.pharmacy}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                {med.stock}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-green-600 font-bold text-lg">
                <IndianRupee size={18} />
                {med.price}
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DiagnosticsView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Diagnostic Tests</h2>
      
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <p className="text-sm text-green-800">🏠 <strong>Home Sample Collection</strong> available for selected tests</p>
      </div>

      <div className="space-y-3">
        {diagnosticTests.map(test => (
          <div key={test.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-800 mb-1">{test.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{test.lab}</p>
            
            {test.homeCollection && (
              <div className="flex items-center text-green-600 text-sm mb-2">
                <Home size={16} className="mr-1" />
                Home collection available
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-red-600 font-bold text-lg">
                <IndianRupee size={18} />
                {test.price}
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                Book Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RecordsView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Health Records</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <p className="text-sm text-yellow-800">📱 <strong>Offline Access:</strong> Your records are saved locally and accessible without internet!</p>
      </div>

      <div className="space-y-3">
        {healthRecords.map(record => (
          <div key={record.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                  {record.type}
                </span>
                <h3 className="font-bold text-gray-800 mt-2">{record.title}</h3>
                <p className="text-sm text-gray-600">
                  {record.doctor || record.lab} • {record.date}
                </p>
              </div>
              <FileText className="text-gray-400" size={24} />
            </div>
            <button className="mt-2 text-blue-600 text-sm font-semibold hover:text-blue-700">
              View Details →
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setShowUploadRecord(true)}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-semibold"
      >
        + Upload New Record
      </button>

      {showUploadRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Upload Health Record</h3>
              <button onClick={() => setShowUploadRecord(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Record Type</label>
                <select
                  value={newRecord.type}
                  onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option>Prescription</option>
                  <option>Lab Report</option>
                  <option>Medical Certificate</option>
                  <option>X-Ray</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="e.g., Blood Test Results"
                  value={newRecord.title}
                  onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {newRecord.type === 'Lab Report' ? 'Lab Name' : 'Doctor Name'}
                </label>
                <input
                  type="text"
                  placeholder={newRecord.type === 'Lab Report' ? 'e.g., City Diagnostics' : 'e.g., Dr. Sharma'}
                  value={newRecord.type === 'Lab Report' ? newRecord.lab : newRecord.doctor}
                  onChange={(e) => setNewRecord({ 
                    ...newRecord, 
                    [newRecord.type === 'Lab Report' ? 'lab' : 'doctor']: e.target.value 
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-600">Click to upload file or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUploadRecord}
                disabled={!newRecord.title}
                className={`flex-1 py-3 rounded-lg font-semibold ${
                  newRecord.title
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Upload Record
              </button>
              <button
                onClick={() => setShowUploadRecord(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const HealthTrackerView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Health Tracker</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-red-500" size={24} />
            <span className="text-xs text-gray-500">Latest</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{getLatestReading('blood_pressure')}</p>
          <p className="text-sm text-gray-600">Blood Pressure</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Heart className="text-pink-500" size={24} />
            <span className="text-xs text-gray-500">Latest</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{getLatestReading('heart_rate')}</p>
          <p className="text-sm text-gray-600">Heart Rate</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Activity className="text-blue-500" size={24} />
            <span className="text-xs text-gray-500">Fasting</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{getLatestReading('blood_sugar')}</p>
          <p className="text-sm text-gray-600">Blood Sugar</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Pill className="text-purple-500" size={24} />
            <span className="text-xs text-gray-500">Today</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">2/3</p>
          <p className="text-sm text-gray-600">Medications</p>
        </div>
      </div>

      <button 
        onClick={() => setShowAddReading(true)}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
      >
        + Add New Reading
      </button>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-gray-800 mb-3">Recent Readings</h3>
        <div className="space-y-2">
          {healthReadings.slice(0, 5).map(reading => (
            <div key={reading.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div>
                <p className="font-semibold text-gray-800 text-sm capitalize">
                  {reading.type.replace('_', ' ')}
                </p>
                <p className="text-xs text-gray-600">{reading.date} at {reading.time}</p>
              </div>
              <p className="text-lg font-bold text-blue-600">{reading.value}</p>
            </div>
          ))}
        </div>
      </div>

      {showAddReading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Reading</h3>
              <button onClick={() => setShowAddReading(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Reading Type</label>
                <select
                  value={newReading.type}
                  onChange={(e) => setNewReading({ ...newReading, type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="blood_pressure">Blood Pressure</option>
                  <option value="heart_rate">Heart Rate</option>
                  <option value="blood_sugar">Blood Sugar</option>
                  <option value="weight">Weight</option>
                  <option value="temperature">Temperature</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Value</label>
                <input
                  type="text"
                  placeholder={
                    newReading.type === 'blood_pressure' ? 'e.g., 120/80' :
                    newReading.type === 'heart_rate' ? 'e.g., 72' :
                    newReading.type === 'blood_sugar' ? 'e.g., 95' :
                    newReading.type === 'weight' ? 'e.g., 70' :
                    'e.g., 98.6'
                  }
                  value={newReading.value}
                  onChange={(e) => setNewReading({ ...newReading, value: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newReading.date}
                    onChange={(e) => setNewReading({ ...newReading, date: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={newReading.time}
                    onChange={(e) => setNewReading({ ...newReading, time: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddReading}
                disabled={!newReading.value}
                className={`flex-1 py-3 rounded-lg font-semibold ${
                  newReading.value
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save Reading
              </button>
              <button
                onClick={() => setShowAddReading(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const EducationView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Health Education</h2>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm whitespace-nowrap">All</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-300">General Health</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-300">Chronic Conditions</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-300">Heart Health</button>
      </div>

      {!selectedArticle ? (
        <div className="space-y-3">
          {healthArticles.map(article => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-gray-800 mt-2 mb-1">{article.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={14} className="mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <BookOpen className="text-gray-400" size={24} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center font-semibold"
          >
            ← Back to articles
          </button>
          
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">
            {selectedArticle.category}
          </span>
          
          <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-3">{selectedArticle.title}</h2>
          
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <Clock size={16} className="mr-2" />
            {selectedArticle.readTime}
          </div>
          
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedArticle.content}</p>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 italic">
              💡 This information is for educational purposes only. Always consult with a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <AuthView />
      ) : (
        <div className="max-w-2xl mx-auto">
          <header className="bg-white shadow-sm sticky top-0 z-20">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="text-blue-600" size={28} />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">CareConnect</h1>
                  <p className="text-xs text-gray-600">{userData?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowProfile(true)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <User size={24} />
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          {showProfile && <ProfileView />}

          <main className="p-4 pb-24">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'doctors' && <DoctorsView />}
            {activeTab === 'appointments' && <AppointmentsView />}
            {activeTab === 'medicines' && <MedicinesView />}
            {activeTab === 'diagnostics' && <DiagnosticsView />}
            {activeTab === 'records' && <RecordsView />}
            {activeTab === 'tracker' && <HealthTrackerView />}
            {activeTab === 'education' && <EducationView />}
          </main>

          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
            <div className="max-w-2xl mx-auto flex justify-around items-center py-2">
              <button 
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center p-2 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <Home size={24} />
                <span className="text-xs mt-1">Home</span>
              </button>
              <button 
                onClick={() => setActiveTab('doctors')}
                className={`flex flex-col items-center p-2 ${activeTab === 'doctors' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <Stethoscope size={24} />
                <span className="text-xs mt-1">Doctors</span>
              </button>
              <button 
                onClick={() => setActiveTab('records')}
                className={`flex flex-col items-center p-2 ${activeTab === 'records' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <FileText size={24} />
                <span className="text-xs mt-1">Records</span>
              </button>
              <button 
                onClick={() => setActiveTab('tracker')}
                className={`flex flex-col items-center p-2 ${activeTab === 'tracker' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <Activity size={24} />
                <span className="text-xs mt-1">Tracker</span>
              </button>
              <button 
                onClick={() => setActiveTab('education')}
                className={`flex flex-col items-center p-2 ${activeTab === 'education' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <BookOpen size={24} />
                <span className="text-xs mt-1">Learn</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}