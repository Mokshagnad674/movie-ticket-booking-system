const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/multer');
const Movie = require('../models/movie');
const userModeling = require('../utils/userModeling');

const router = new express.Router();

// Create a movie
router.post('/movies', auth.enhance, async (req, res) => {
  try {
    console.log('Movie creation request:', req.body);
    const movie = new Movie(req.body);
    console.log('Movie object created, attempting to save...');
    await movie.save();
    console.log('Movie saved successfully:', movie._id);
    res.status(201).send(movie);
  } catch (e) {
    console.error('Movie creation error:', e.message);
    console.error('Full error:', e);
    res.status(400).send({ message: e.message || 'Movie creation failed' });
  }
});

router.post(
  '/movies/photo/:id',
  auth.enhance,
  upload('movies').single('file'),
  async (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}`;
    const { file } = req;
    const movieId = req.params.id;
    
    try {
      if (!file) {
        return res.status(400).send({ error: 'Please upload a file' });
      }
      
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).send({ error: 'Movie not found' });
      }
      
      // Fix the image path for proper serving
      const imagePath = file.path.replace(/\\/g, '/');
      movie.image = `${url}/${imagePath}`;
      await movie.save();
      
      console.log('Image saved with URL:', movie.image);
      
      res.send({ 
        message: 'Image uploaded successfully',
        movie,
        imageUrl: movie.image
      });
    } catch (e) {
      console.error('Movie image upload error:', e);
      res.status(400).send({ error: e.message });
    }
  }
);

// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get movie by id
router.get('/movies/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const movie = await Movie.findById(_id);
    if (!movie) return res.sendStatus(404);
    return res.send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update movie by id
router.put('/movies/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'title',
    'image',
    'language',
    'genre',
    'director',
    'cast',
    'description',
    'duration',
    'releaseDate',
    'endDate',
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const movie = await Movie.findById(_id);
    updates.forEach((update) => (movie[update] = req.body[update]));
    await movie.save();
    return !movie ? res.sendStatus(404) : res.send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete movie by id
router.delete('/movies/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const movie = await Movie.findByIdAndDelete(_id);
    return !movie ? res.sendStatus(404) : res.send(movie);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// Movies User modeling (Get Movies Suggestions)
router.get('/movies/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const cinemasUserModeled = await userModeling.moviesUserModeling(username);
    res.send(cinemasUserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
