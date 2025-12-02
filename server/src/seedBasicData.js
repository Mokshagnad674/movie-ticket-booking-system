const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Movie = require('./models/movie');
const Cinema = require('./models/cinema');
const Showtime = require('./models/showtime');

const MONGODB_URI = process.env.MONGODB_URI;

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Movie.deleteMany({});
    await Cinema.deleteMany({});
    await Showtime.deleteMany({});

    // Add Movies
    const movies = await Movie.insertMany([
      {
        title: 'Avengers: Endgame',
        description: 'The epic conclusion to the Infinity Saga',
        director: 'Russo Brothers',
        cast: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
        genre: 'Action',
        duration: 181,
        releaseDate: new Date('2024-01-15'),
        endDate: new Date('2024-12-31'),
        language: 'English',
        image: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
      },
      {
        title: 'Spider-Man: No Way Home',
        description: 'Peter Parker faces his greatest challenge yet',
        director: 'Jon Watts',
        cast: 'Tom Holland, Zendaya, Benedict Cumberbatch',
        genre: 'Action',
        duration: 148,
        releaseDate: new Date('2024-02-01'),
        endDate: new Date('2024-12-31'),
        language: 'English',
        image: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
      },
      {
        title: 'The Batman',
        description: 'A new take on the Dark Knight',
        director: 'Matt Reeves',
        cast: 'Robert Pattinson, Zoë Kravitz, Paul Dano',
        genre: 'Action',
        duration: 176,
        releaseDate: new Date('2024-03-01'),
        endDate: new Date('2024-12-31'),
        language: 'English',
        image: 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg'
      }
    ]);

    // Add Cinemas
    const cinemas = await Cinema.insertMany([
      {
        name: 'PVR Cinemas',
        city: 'downtown',
        seats: Array.from({length: 10}, () => Array.from({length: 10}, () => 0)),
        seatsAvailable: 100,
        ticketPrice: 250
      },
      {
        name: 'INOX Theatre',
        city: 'center',
        seats: Array.from({length: 8}, () => Array.from({length: 10}, () => 0)),
        seatsAvailable: 80,
        ticketPrice: 300
      },
      {
        name: 'Cinepolis',
        city: 'metro',
        seats: Array.from({length: 10}, () => Array.from({length: 12}, () => 0)),
        seatsAvailable: 120,
        ticketPrice: 280
      }
    ]);

    // Add Showtimes
    const showtimes = [];
    const times = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
    for (let movie of movies) {
      for (let cinema of cinemas) {
        for (let time of times) {
          showtimes.push({
            movieId: movie._id,
            cinemaId: cinema._id,
            startAt: time,
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31')
          });
        }
      }
    }
    await Showtime.insertMany(showtimes);

    console.log('✅ Sample data created successfully!');
    console.log(`📽️ Movies: ${movies.length}`);
    console.log(`🎭 Cinemas: ${cinemas.length}`);
    console.log(`⏰ Showtimes: ${showtimes.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

seedData();