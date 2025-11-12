const mongoose = require('mongoose');
const Movie = require('./models/movie');
const Cinema = require('./models/cinema');
require('dotenv').config();

const movies = [
  {
    title: 'avengers: endgame',
    image: 'https://via.placeholder.com/300x450/FF6B6B/FFFFFF?text=Avengers',
    language: 'english',
    genre: 'action',
    director: 'russo brothers',
    cast: 'robert downey jr., chris evans, scarlett johansson',
    description: 'the epic conclusion to the infinity saga',
    duration: 181,
    releaseDate: new Date('2019-04-26'),
    endDate: new Date('2024-12-31')
  },
  {
    title: 'spider-man: no way home',
    image: 'https://via.placeholder.com/300x450/4ECDC4/FFFFFF?text=Spider-Man',
    language: 'english',
    genre: 'action',
    director: 'jon watts',
    cast: 'tom holland, zendaya, benedict cumberbatch',
    description: 'peter parker faces his greatest challenge yet',
    duration: 148,
    releaseDate: new Date('2021-12-17'),
    endDate: new Date('2024-12-31')
  },
  {
    title: 'the batman',
    image: 'https://via.placeholder.com/300x450/45B7D1/FFFFFF?text=Batman',
    language: 'english',
    genre: 'action',
    director: 'matt reeves',
    cast: 'robert pattinson, zoë kravitz, paul dano',
    description: 'a new take on the dark knight',
    duration: 176,
    releaseDate: new Date('2022-03-04'),
    endDate: new Date('2024-12-31')
  },
  {
    title: 'dune',
    image: 'https://via.placeholder.com/300x450/96CEB4/FFFFFF?text=Dune',
    language: 'english',
    genre: 'sci-fi',
    director: 'denis villeneuve',
    cast: 'timothée chalamet, rebecca ferguson, oscar isaac',
    description: 'epic adaptation of frank herbert\'s classic novel',
    duration: 155,
    releaseDate: new Date('2021-10-22'),
    endDate: new Date('2024-12-31')
  },
  {
    title: 'top gun: maverick',
    image: 'https://via.placeholder.com/300x450/FFEAA7/FFFFFF?text=Top+Gun',
    language: 'english',
    genre: 'action',
    director: 'joseph kosinski',
    cast: 'tom cruise, miles teller, jennifer connelly',
    description: 'maverick returns to train a new generation of pilots',
    duration: 130,
    releaseDate: new Date('2022-05-27'),
    endDate: new Date('2024-12-31')
  }
];

const cinemas = [
  {
    name: 'PVR Cinemas',
    ticketPrice: 250,
    city: 'mumbai',
    seats: generateSeats(50),
    seatsAvailable: 50,
    image: 'https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=PVR+Cinemas'
  },
  {
    name: 'INOX Multiplex',
    ticketPrice: 300,
    city: 'delhi',
    seats: generateSeats(60),
    seatsAvailable: 60,
    image: 'https://via.placeholder.com/400x200/4ECDC4/FFFFFF?text=INOX+Multiplex'
  },
  {
    name: 'Cinepolis',
    ticketPrice: 280,
    city: 'bangalore',
    seats: generateSeats(45),
    seatsAvailable: 45,
    image: 'https://via.placeholder.com/400x200/45B7D1/FFFFFF?text=Cinepolis'
  },
  {
    name: 'Carnival Cinemas',
    ticketPrice: 220,
    city: 'pune',
    seats: generateSeats(55),
    seatsAvailable: 55,
    image: 'https://via.placeholder.com/400x200/96CEB4/FFFFFF?text=Carnival'
  },
  {
    name: 'SPI Cinemas',
    ticketPrice: 270,
    city: 'chennai',
    seats: generateSeats(40),
    seatsAvailable: 40,
    image: 'https://via.placeholder.com/400x200/FFEAA7/FFFFFF?text=SPI+Cinemas'
  }
];

function generateSeats(totalSeats) {
  const seats = [];
  const rows = Math.ceil(totalSeats / 10);
  let seatNumber = 1;
  
  for (let row = 0; row < rows; row++) {
    const rowLetter = String.fromCharCode(65 + row); // A, B, C, etc.
    const seatsInRow = Math.min(10, totalSeats - (row * 10));
    
    for (let seat = 1; seat <= seatsInRow; seat++) {
      seats.push({
        seat_id: `${rowLetter}${seat}`,
        isBooked: false
      });
      seatNumber++;
    }
  }
  
  return seats;
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Movie.deleteMany({});
    await Cinema.deleteMany({});
    console.log('Cleared existing movies and cinemas');

    // Insert movies
    const insertedMovies = await Movie.insertMany(movies);
    console.log(`Inserted ${insertedMovies.length} movies`);

    // Insert cinemas
    const insertedCinemas = await Cinema.insertMany(cinemas);
    console.log(`Inserted ${insertedCinemas.length} cinemas`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();