const mongoose = require('mongoose');

// Use local MongoDB for development
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/moviestore';

const options = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
};

mongoose.connect(MONGODB_URI, options)
.then(() => console.log("MongoDB Connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
  console.log("Check your MongoDB connection string");
});
