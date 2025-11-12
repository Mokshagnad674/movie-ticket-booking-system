const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
require('./db/mongoose');

const User = require('./models/user');

async function checkUsers() {
  try {
    const users = await User.find({});
    console.log(`📊 Total users in database: ${users.length}`);
    
    if (users.length > 0) {
      console.log('\n👥 Users:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name}, Username: ${user.username}, Email: ${user.email}, Role: ${user.role || 'user'}`);
      });
    } else {
      console.log('❌ No users found in database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking users:', error);
    process.exit(1);
  }
}

checkUsers();