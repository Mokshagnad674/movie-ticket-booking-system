const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
require('./db/mongoose');

const User = require('./models/user');

async function deleteAllUsers() {
  try {
    const result = await User.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} users from database`);
    console.log('🗑️ All users have been removed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting users:', error);
    process.exit(1);
  }
}

deleteAllUsers();