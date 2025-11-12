const mongoose = require('mongoose');
const Movie = require('./models/movie');
require('dotenv').config();

const highQualityImages = {
  'avengers: endgame': 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
  'spider-man: no way home': 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
  'the batman': 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
  'dune': 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
  'top gun: maverick': 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg'
};

async function updateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const [title, imageUrl] of Object.entries(highQualityImages)) {
      await Movie.updateOne(
        { title: title },
        { $set: { image: imageUrl } }
      );
      console.log(`Updated ${title} with high-quality image`);
    }

    console.log('All movie images updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
}

updateImages();