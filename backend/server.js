require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route - Absolutely will work
app.get('/test-guaranteed', (req, res) => {
  console.log('✅ /test-guaranteed was called');
  res.json({ message: "This route WILL work", timestamp: new Date() });
});

// Health Check - Basic version
app.get('/api/health', (req, res) => {
  console.log('✅ /api/health was called');
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_db')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server absolutely running on http://localhost:${PORT}`);
  console.log('🔎 Test these endpoints:');
  console.log(`- http://localhost:${PORT}/test-guaranteed`);
  console.log(`- http://localhost:${PORT}/api/health\n`);
});