const mongoose = require('mongoose');
const Movie = require('./models/movie');
const Cinema = require('./models/cinema');
const Showtime = require('./models/showtime');
require('dotenv').config();

async function seedShowtimes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all movies and cinemas
    const movies = await Movie.find({});
    const cinemas = await Cinema.find({});

    if (movies.length === 0 || cinemas.length === 0) {
      console.log('No movies or cinemas found. Please run seedMoviesAndCinemas.js first');
      process.exit(1);
    }

    // Clear existing showtimes
    await Showtime.deleteMany({});
    console.log('Cleared existing showtimes');

    const showtimes = [];
    const timeSlots = ['10:00', '13:30', '17:00', '20:30'];
    
    // Create showtimes for each movie in each cinema
    movies.forEach(movie => {
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
    console.log(`Inserted ${insertedShowtimes.length} showtimes`);
    console.log('Showtimes seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding showtimes:', error);
    process.exit(1);
  }
}

seedShowtimes();