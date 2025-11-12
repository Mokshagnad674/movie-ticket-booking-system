// Simple in-memory data for testing without MongoDB
const sampleMovies = [
  {
    _id: '1',
    title: 'Avengers: Endgame',
    description: 'The epic conclusion to the Infinity Saga',
    director: 'Russo Brothers',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
    genre: 'Action',
    duration: 181,
    releaseDate: '2019-04-26',
    language: 'English',
    rating: 'PG-13',
    image: 'https://via.placeholder.com/300x450/FF6B6B/FFFFFF?text=Avengers'
  },
  {
    _id: '2', 
    title: 'Spider-Man: No Way Home',
    description: 'Peter Parker faces his greatest challenge yet',
    director: 'Jon Watts',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
    genre: 'Action',
    duration: 148,
    releaseDate: '2021-12-17',
    language: 'English', 
    rating: 'PG-13',
    image: 'https://via.placeholder.com/300x450/4ECDC4/FFFFFF?text=Spider-Man'
  },
  {
    _id: '3',
    title: 'The Batman',
    description: 'A new take on the Dark Knight',
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano'],
    genre: 'Action',
    duration: 176,
    releaseDate: '2022-03-04',
    language: 'English',
    rating: 'PG-13', 
    image: 'https://via.placeholder.com/300x450/45B7D1/FFFFFF?text=Batman'
  }
];

module.exports = { sampleMovies };