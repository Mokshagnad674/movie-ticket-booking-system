const mongoose = require('mongoose');
const Movie = require('./models/movie');
require('dotenv').config();

const nowShowingMovies = [
  {
    title: 'black panther',
    image: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    language: 'english',
    genre: 'action',
    director: 'ryan coogler',
    cast: 'chadwick boseman, michael b. jordan, lupita nyongo',
    description: 'king tchalla returns home to wakanda to serve as his countrys new leader',
    duration: 134,
    releaseDate: new Date('2024-01-15'),
    endDate: new Date('2024-12-31')
  },
  {
    title: 'wonder woman',
    image: 'https://image.tmdb.org/t/p/w500/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg',
    language: 'english',
    genre: 'action',
    director: 'patty jenkins',
    cast: 'gal gadot, chris pine, robin wright',
    description: 'an amazon princess comes to the world of man to become the greatest of the female superheroes',
    duration: 141,
    releaseDate: new Date('2024-02-01'),
    endDate: new Date('2024-12-31')
  }
];

const comingSoonMovies = [
  {
    title: 'guardians of the galaxy vol. 3',
    image: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    language: 'english',
    genre: 'action',
    director: 'james gunn',
    cast: 'chris pratt, zoe saldana, dave bautista',
    description: 'the guardians embark on their final adventure together',
    duration: 150,
    releaseDate: new Date('2025-03-15'),
    endDate: new Date('2025-12-31')
  },
  {
    title: 'fast x',
    image: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    language: 'english',
    genre: 'action',
    director: 'louis leterrier',
    cast: 'vin diesel, michelle rodriguez, tyrese gibson',
    description: 'dom toretto and his family face their most lethal opponent yet',
    duration: 141,
    releaseDate: new Date('2025-05-20'),
    endDate: new Date('2025-12-31')
  },
  {
    title: 'john wick: chapter 5',
    image: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    language: 'english',
    genre: 'action',
    director: 'chad stahelski',
    cast: 'keanu reeves, laurence fishburne, ian mcshane',
    description: 'john wick continues his legendary journey in the fifth installment',
    duration: 169,
    releaseDate: new Date('2025-07-10'),
    endDate: new Date('2025-12-31')
  }
];

async function addMoreMovies() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Add Now Showing movies
    const insertedNowShowing = await Movie.insertMany(nowShowingMovies);
    console.log(`Added ${insertedNowShowing.length} Now Showing movies`);

    // Add Coming Soon movies
    const insertedComingSoon = await Movie.insertMany(comingSoonMovies);
    console.log(`Added ${insertedComingSoon.length} Coming Soon movies`);

    console.log('Additional movies added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding movies:', error);
    process.exit(1);
  }
}

addMoreMovies();