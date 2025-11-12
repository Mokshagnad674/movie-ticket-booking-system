const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
require('./db/mongoose');

const Movie = require('./models/movie');
const Cinema = require('./models/cinema');
const Showtime = require('./models/showtime');

const sampleCinemas = [
  {
    name: 'pvr cinemas',
    city: 'mumbai',
    seats: Array(12).fill().map(() => Array(15).fill(0)),
    seatsAvailable: 180,
    ticketPrice: 300,
    image: 'https://images.unsplash.com/photo-1489599904472-84978f312f2e?w=800&h=400&fit=crop&crop=center'
  },
  {
    name: 'inox theatre',
    city: 'bangalore',
    seats: Array(10).fill().map(() => Array(12).fill(0)),
    seatsAvailable: 120,
    ticketPrice: 250,
    image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=800&h=400&fit=crop&crop=center'
  }
];

const sampleMovies = [
  // 3 English Movies
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
  // 3 Telugu Movies
  {
    title: 'rrr',
    description: 'a fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country.',
    director: 'ss rajamouli',
    cast: 'nt rama rao jr., ram charan, ajay devgn, alia bhatt',
    genre: 'action',
    duration: 187,
    releaseDate: new Date('2024-01-10'),
    endDate: new Date('2024-12-31'),
    language: 'telugu',
    image: 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'pushpa: the rise',
    description: 'pushpa raj is a coolie who rises in the world of red sandalwood smuggling.',
    director: 'sukumar',
    cast: 'allu arjun, rashmika mandanna, fahadh faasil',
    genre: 'action',
    duration: 179,
    releaseDate: new Date('2024-01-20'),
    endDate: new Date('2024-12-31'),
    language: 'telugu',
    image: 'https://m.media-amazon.com/images/M/MV5BNDFhOTcxZjYtMzBkZi00NzJkLWI2NzEtYTZiYWUxMGQxMzVlXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'baahubali 2: the conclusion',
    description: 'when shiva, the son of bahubali, learns about his heritage, he begins to look for answers.',
    director: 'ss rajamouli',
    cast: 'prabhas, rana daggubati, anushka shetty, tamannaah bhatia',
    genre: 'action',
    duration: 167,
    releaseDate: new Date('2024-02-05'),
    endDate: new Date('2024-12-31'),
    language: 'telugu',
    image: 'https://m.media-amazon.com/images/M/MV5BYTMxMmI5ZDMtNDNkNy00MzVhLTlhYjMtZDI3NzBiNzE0NGFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  // 2 Hindi Movies
  {
    title: 'dangal',
    description: 'former wrestler mahavir singh phogat and his two wrestler daughters struggle towards glory at the commonwealth games.',
    director: 'nitesh tiwari',
    cast: 'aamir khan, sakshi tanwar, fatima sana shaikh, sanya malhotra',
    genre: 'drama',
    duration: 161,
    releaseDate: new Date('2024-01-25'),
    endDate: new Date('2024-12-31'),
    language: 'hindi',
    image: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: '3 idiots',
    description: 'two friends are searching for their long lost companion. they revisit their college days.',
    director: 'rajkumar hirani',
    cast: 'aamir khan, kareena kapoor, r madhavan, sharman joshi',
    genre: 'comedy',
    duration: 170,
    releaseDate: new Date('2024-02-10'),
    endDate: new Date('2024-12-31'),
    language: 'hindi',
    image: 'https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  // 2 Kannada Movies
  {
    title: 'kgf: chapter 2',
    description: 'the blood-soaked land of kolar gold fields has a new overlord now - rocky, whose name strikes fear in the heart of his foes.',
    director: 'prashanth neel',
    cast: 'yash, sanjay dutt, raveena tandon, srinidhi shetty',
    genre: 'action',
    duration: 168,
    releaseDate: new Date('2024-02-15'),
    endDate: new Date('2024-12-31'),
    language: 'kannada',
    image: 'https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'kantara',
    description: 'it involves the culture of kambla and bhootha kola. a human and nature conflict where shiva is the rebellion who works against nature.',
    director: 'rishab shetty',
    cast: 'rishab shetty, sapthami gowda, kishore kumar g',
    genre: 'thriller',
    duration: 148,
    releaseDate: new Date('2024-02-20'),
    endDate: new Date('2024-12-31'),
    language: 'kannada',
    image: 'https://m.media-amazon.com/images/M/MV5BYjc2YWJkNWEtMzNjZC00NzAyLWI3MjMtNzFiNzhlMGE5NDY4XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  }
];

async function seedComplete() {
  try {
    // Clear existing data
    await Movie.deleteMany({});
    await Cinema.deleteMany({});
    await Showtime.deleteMany({});
    
    // Insert cinemas
    const cinemas = await Cinema.insertMany(sampleCinemas);
    console.log(`✅ Inserted ${cinemas.length} cinemas`);
    
    // Insert movies
    const movies = await Movie.insertMany(sampleMovies);
    console.log(`✅ Inserted ${movies.length} movies`);
    
    // Create showtimes
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
    
    console.log('🎬 Complete database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   • ${cinemas.length} Cinemas (PVR & INOX with images)`);
    console.log(`   • ${movies.length} Movies (3 English, 3 Telugu, 2 Hindi, 2 Kannada)`);
    console.log(`   • ${showtimes.length} Showtimes`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedComplete();