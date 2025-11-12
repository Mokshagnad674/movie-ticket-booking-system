const mongoose = require('mongoose');
const Movie = require('./models/movie');
require('dotenv').config();

async function updateMovieDates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const today = new Date();
    const futureDate = new Date();
    futureDate.setMonth(today.getMonth() + 2); // 2 months from now

    // Update some movies to be "Now Showing" (released before today)
    await Movie.updateMany(
      { title: { $in: ['avengers: endgame', 'spider-man: no way home', 'the batman'] } },
      { 
        $set: { 
          releaseDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31')
        } 
      }
    );
    console.log('Updated 3 movies to "Now Showing"');

    // Update some movies to be "Coming Soon" (release date in future)
    await Movie.updateMany(
      { title: { $in: ['dune', 'top gun: maverick'] } },
      { 
        $set: { 
          releaseDate: futureDate,
          endDate: new Date('2024-12-31')
        } 
      }
    );
    console.log('Updated 2 movies to "Coming Soon"');

    console.log('Movie dates updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating movie dates:', error);
    process.exit(1);
  }
}

updateMovieDates();