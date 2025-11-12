const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// Connect to MongoDB
require('./db/mongoose');

// Import models
const Movie = require('./models/movie');
const Cinema = require('./models/cinema');
const Showtime = require('./models/showtime');

const sampleMovies = [
  {
    title: 'avengers: endgame',
    description: 'the epic conclusion to the infinity saga that will determine the fate of the universe.',
    director: 'anthony russo, joe russo',
    cast: 'robert downey jr., chris evans, mark ruffalo, chris hemsworth, scarlett johansson',
    genre: 'action',
    duration: 181,
    releaseDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    language: 'english',
    image: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'spider-man: no way home',
    description: 'peter parker seeks help from doctor strange when his secret identity is revealed.',
    director: 'jon watts',
    cast: 'tom holland, zendaya, benedict cumberbatch, jacob batalon',
    genre: 'action',
    duration: 148,
    releaseDate: new Date('2024-01-15'),
    endDate: new Date('2024-12-31'),
    language: 'english',
    image: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'the batman',
    description: 'batman ventures into gotham city underworld when a sadistic killer leaves behind a trail of cryptic clues.',
    director: 'matt reeves',
    cast: 'robert pattinson, zoe kravitz, paul dano, jeffrey wright',
    genre: 'action',
    duration: 176,
    releaseDate: new Date('2024-02-01'),
    endDate: new Date('2024-12-31'),
    language: 'english',
    image: 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'dune',
    description: 'a noble family becomes embroiled in a war for control over the galaxys most valuable asset.',
    director: 'denis villeneuve',
    cast: 'timothee chalamet, rebecca ferguson, oscar isaac, josh brolin',
    genre: 'sci-fi',
    duration: 155,
    releaseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    endDate: new Date('2024-12-31'),
    language: 'english',
    image: 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'black panther: wakanda forever',
    description: 'the people of wakanda fight to protect their home from intervening world powers.',
    director: 'ryan coogler',
    cast: 'letitia wright, lupita nyongo, danai gurira, winston duke',
    genre: 'action',
    duration: 161,
    releaseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    endDate: new Date('2024-12-31'),
    language: 'english',
    image: 'https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'top gun: maverick',
    description: 'after thirty years, maverick is still pushing the envelope as a top naval aviator.',
    director: 'joseph kosinski',
    cast: 'tom cruise, miles teller, jennifer connelly, jon hamm',
    genre: 'action',
    duration: 131,
    releaseDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    endDate: new Date('2024-12-31'),
    language: 'english',
    image: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  }
];

const sampleCinemas = [
  {
    name: 'pvr cinemas',
    city: 'mumbai',
    seats: Array(10).fill().map(() => Array(12).fill(0)),
    seatsAvailable: 120,
    ticketPrice: 250,
    image: 'https://images.unsplash.com/photo-1489599904472-84978f312f2e?w=400&h=200&fit=crop'
  },
  {
    name: 'inox theatre',
    city: 'delhi',
    seats: Array(8).fill().map(() => Array(15).fill(0)),
    seatsAvailable: 120,
    ticketPrice: 300,
    image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400&h=200&fit=crop'
  },
  {
    name: 'cinepolis',
    city: 'bangalore',
    seats: Array(12).fill().map(() => Array(10).fill(0)),
    seatsAvailable: 120,
    ticketPrice: 280,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Movie.deleteMany({});
    await Cinema.deleteMany({});
    await Showtime.deleteMany({});
    
    // Insert sample movies
    const movies = await Movie.insertMany(sampleMovies);
    console.log(`✅ Inserted ${movies.length} movies`);
    
    // Insert sample cinemas
    const cinemas = await Cinema.insertMany(sampleCinemas);
    console.log(`✅ Inserted ${cinemas.length} cinemas`);
    
    // Create sample showtimes
    const sampleShowtimes = [];
    const times = ['18:00', '21:00'];
    
    movies.forEach(movie => {
      cinemas.forEach(cinema => {
        times.forEach(time => {
          sampleShowtimes.push({
            movieId: movie._id,
            cinemaId: cinema._id,
            startAt: time,
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          });
        });
      });
    });
    
    const showtimes = await Showtime.insertMany(sampleShowtimes);
    console.log(`✅ Inserted ${showtimes.length} showtimes`);
    
    console.log('🎬 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();