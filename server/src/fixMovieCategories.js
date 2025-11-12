const mongoose = require('mongoose');
const Movie = require('./models/movie');
require('dotenv').config();

async function fixMovieCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const today = new Date();
    
    // Set "Now Showing" movies (should be bookable)
    await Movie.updateMany(
      { title: { $in: ['avengers: endgame', 'spider-man: no way home', 'the batman', 'black panther', 'wonder woman'] } },
      { 
        $set: { 
          releaseDate: new Date('2024-01-01'), // Past date (released)
          endDate: new Date('2024-12-31')
        } 
      }
    );
    console.log('Fixed Now Showing movies - set to past release dates');

    // Set "Coming Soon" movies (should not be bookable)
    await Movie.updateMany(
      { title: { $in: ['dune', 'top gun: maverick', 'guardians of the galaxy vol. 3', 'fast x', 'john wick: chapter 5'] } },
      { 
        $set: { 
          releaseDate: new Date('2025-06-01'), // Future date
          endDate: new Date('2025-12-31')
        } 
      }
    );
    console.log('Fixed Coming Soon movies - set to future release dates');

    console.log('Movie categories fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing movie categories:', error);
    process.exit(1);
  }
}

fixMovieCategories();