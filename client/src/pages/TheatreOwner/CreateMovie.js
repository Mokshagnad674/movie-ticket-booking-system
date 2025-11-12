import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addMovie, getCinemas } from '../../store/actions';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  card: {
    marginBottom: theme.spacing(3)
  },
  imagePreview: {
    width: 200,
    height: 300,
    objectFit: 'cover',
    marginTop: theme.spacing(2)
  }
}));

const CreateMovie = ({ addMovie, getCinemas, cinemas }) => {
  const classes = useStyles();
  const history = useHistory();
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    director: '',
    cast: '',
    genre: [],
    duration: '',
    releaseDate: '',
    endDate: '',
    language: '',
    ticketPrice: '',
    cinema: '',
    showtimes: [],
    image: null,
    imagePreview: null
  });

  const [newShowtime, setNewShowtime] = useState('');

  const genres = ['action', 'comedy', 'drama', 'horror', 'romance', 'sci-fi', 'thriller', 'animation'];
  const languages = ['english', 'hindi', 'tamil', 'telugu', 'malayalam', 'kannada'];
  const timeSlots = ['09:00', '12:00', '15:00', '18:00', '21:00'];

  useEffect(() => {
    if (!cinemas.length) getCinemas();
  }, [cinemas, getCinemas]);

  const handleInputChange = (field) => (event) => {
    setMovieData({
      ...movieData,
      [field]: event.target.value
    });
  };

  const handleGenreChange = (event) => {
    setMovieData({
      ...movieData,
      genre: event.target.value
    });
  };



  const addShowtime = () => {
    if (newShowtime && !movieData.showtimes.includes(newShowtime)) {
      setMovieData({
        ...movieData,
        showtimes: [...movieData.showtimes, newShowtime]
      });
      setNewShowtime('');
    }
  };

  const removeShowtime = (time) => {
    setMovieData({
      ...movieData,
      showtimes: movieData.showtimes.filter(t => t !== time)
    });
  };

  const handleSubmit = async () => {
    try {
      const { image, imagePreview, showtimes, ticketPrice, cinema, ...restData } = movieData;
      const moviePayload = {
        ...restData,
        genre: movieData.genre.join(','),
        releaseDate: new Date(movieData.releaseDate),
        endDate: new Date(movieData.endDate),
        duration: parseInt(movieData.duration),
        image: 'https://via.placeholder.com/300x450/333/fff?text=Movie+Poster'
      };
      
      console.log('Submitting movie:', moviePayload);
      await addMovie(null, moviePayload);
      history.push('/admin/movies');
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Create New Movie
      </Typography>
      
      <Card className={classes.card}>
        <CardHeader title="Movie Information" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Movie Title"
                value={movieData.title}
                onChange={handleInputChange('title')}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Director"
                value={movieData.director}
                onChange={handleInputChange('director')}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={movieData.description}
                onChange={handleInputChange('description')}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cast (comma separated)"
                value={movieData.cast}
                onChange={handleInputChange('cast')}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                value={movieData.duration}
                onChange={handleInputChange('duration')}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Genre</InputLabel>
                <Select
                  multiple
                  value={movieData.genre}
                  onChange={handleGenreChange}
                  label="Genre"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {genres.map(genre => (
                    <MenuItem key={genre} value={genre}>
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Language</InputLabel>
                <Select
                  value={movieData.language}
                  onChange={handleInputChange('language')}
                  label="Language"
                >
                  {languages.map(lang => (
                    <MenuItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Release Date"
                type="date"
                value={movieData.releaseDate}
                onChange={handleInputChange('releaseDate')}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={movieData.endDate}
                onChange={handleInputChange('endDate')}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ticket Price (₹)"
                type="number"
                value={movieData.ticketPrice}
                onChange={handleInputChange('ticketPrice')}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Cinema Hall</InputLabel>
                <Select
                  value={movieData.cinema}
                  onChange={handleInputChange('cinema')}
                  label="Cinema Hall"
                >
                  {cinemas.map(cinema => (
                    <MenuItem key={cinema._id} value={cinema._id}>
                      {cinema.name} - {cinema.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Showtimes
              </Typography>
              <Box display="flex" gap={2} alignItems="center" mb={2}>
                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                  <InputLabel>Time</InputLabel>
                  <Select
                    value={newShowtime}
                    onChange={(e) => setNewShowtime(e.target.value)}
                    label="Time"
                  >
                    {timeSlots.map(time => (
                      <MenuItem key={time} value={time}>{time}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="outlined" onClick={addShowtime}>
                  Add Time
                </Button>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {movieData.showtimes.map(time => (
                  <Chip
                    key={time}
                    label={time}
                    onDelete={() => removeShowtime(time)}
                    color="primary"
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Movie Poster URL (optional)"
                value={movieData.image || ''}
                onChange={handleInputChange('image')}
                variant="outlined"
                placeholder="https://example.com/poster.jpg"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button 
          variant="outlined" 
          size="large"
          onClick={() => history.push('/admin/movies')}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={handleSubmit}
        >
          Create Movie
        </Button>
      </Box>
    </div>
  );
};

const mapStateToProps = ({ cinemaState }) => ({
  cinemas: cinemaState.cinemas
});

export default connect(mapStateToProps, { addMovie, getCinemas })(CreateMovie);