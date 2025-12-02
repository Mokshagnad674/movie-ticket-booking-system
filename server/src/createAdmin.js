const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: 'Admin',
      username: 'admin',
      email: 'admin@moviestore.com',
      password: 'admin123',
      phone: '1234567890',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

createAdmin();