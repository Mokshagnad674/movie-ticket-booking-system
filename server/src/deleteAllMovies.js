const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
require('./db/mongoose');

const Movie = require('./models/movie');
const Showtime = require('./models/showtime');

async function deleteAllMovies() {
  try {
    const movieResult = await Movie.deleteMany({});
    const showtimeResult = await Showtime.deleteMany({});
    
    console.log(`✅ Deleted ${movieResult.deletedCount} movies from database`);
    console.log(`✅ Deleted ${showtimeResult.deletedCount} showtimes from database`);
    console.log('🗑️ All movies and showtimes have been removed successfully!');
    console.log('📝 You can now add your own movies.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting movies:', error);
    process.exit(1);
  }
}

deleteAllMovies();