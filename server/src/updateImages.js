const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
require('./db/mongoose');

const Movie = require('./models/movie');

const imageUpdates = [
  {
    title: 'avengers: endgame',
    image: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'spider-man: no way home', 
    image: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'the batman',
    image: 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'dune',
    image: 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'black panther: wakanda forever',
    image: 'https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  },
  {
    title: 'top gun: maverick',
    image: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
  }
];

async function updateImages() {
  try {
    for (const update of imageUpdates) {
      await Movie.updateOne(
        { title: update.title },
        { $set: { image: update.image } }
      );
      console.log(`✅ Updated ${update.title}`);
    }
    console.log('🎬 All images updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating images:', error);
    process.exit(1);
  }
}

updateImages();