const mongoose = require('mongoose');
const Movie = require('./models/movie');
const Cinema = require('./models/cinema');
const Showtime = require('./models/showtime');
require('dotenv').config();

async function addShowtimesForNewMovies() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get new Now Showing movies (Black Panther, Wonder Woman)
    const nowShowingMovies = await Movie.find({
      title: { $in: ['black panther', 'wonder woman'] }
    });

    // Get all cinemas
    const cinemas = await Cinema.find({});

    if (nowShowingMovies.length === 0 || cinemas.length === 0) {
      console.log('No movies or cinemas found');
      process.exit(1);
    }

    const showtimes = [];
    const timeSlots = ['10:00', '13:30', '17:00', '20:30'];
    
    // Create showtimes only for Now Showing movies
    nowShowingMovies.forEach(movie => {
      cinemas.forEach(cinema => {
        timeSlots.forEach(time => {
          showtimes.push({
            startAt: time,
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
            movieId: movie._id,
            cinemaId: cinema._id
          });
        });
      });
    });

    const insertedShowtimes = await Showtime.insertMany(showtimes);
    console.log(`Added ${insertedShowtimes.length} showtimes for new Now Showing movies`);
    
    console.log('Showtimes added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding showtimes:', error);
    process.exit(1);
  }
}

addShowtimesForNewMovies();