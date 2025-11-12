const mongoose = require('mongoose');

// Use local MongoDB for development
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moviestore';

const options = {
  ssl: true,
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
};

mongoose.connect(MONGODB_URI, options)
.then(() => console.log("✅ MongoDB connected successfully to:", MONGODB_URI.includes('localhost') ? 'Local Database' : 'Atlas Cloud'))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  console.log("💡 Tip: Make sure MongoDB is running locally or check your Atlas IP whitelist");
});
