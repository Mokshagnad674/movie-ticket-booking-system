const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing connection to:', MONGODB_URI ? MONGODB_URI.replace(/\/\/.*@/, '//***:***@') : 'undefined');

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('✅ Connection successful!');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Connection failed:', err.message);
  process.exit(1);
});