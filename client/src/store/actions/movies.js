import { GET_MOVIES, SELECT_MOVIE,GET_SUGGESTIONS } from '../types';
import { setAlert } from './alert';

export const uploadMovieImage = (id, image) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const data = new FormData();
    data.append('file', image);
    const url = '/movies/photo/' + id;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert('Image Uploaded', 'success', 5000));
      dispatch(getMovies()); // Refresh movies to show updated image
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getMovies = () => async dispatch => {
  try {
    const url = '/movies';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      const movies = await response.json();
      dispatch({ type: GET_MOVIES, payload: movies });
    } else {
      console.error('Failed to fetch movies:', response.status, response.statusText);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const onSelectMovie = movie => ({
  type: SELECT_MOVIE,
  payload: movie
});

export const getMovie = id => async dispatch => {
  try {
    const url = '/movies/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const movie = await response.json();
    if (response.ok) {
      dispatch({ type: SELECT_MOVIE, payload: movie });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getMovieSuggestion = id => async dispatch => {
  try {
    const url = '/movies/usermodeling/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const movies = await response.json();
    if (response.ok) {
      dispatch({ type: GET_SUGGESTIONS, payload: movies });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const addMovie = (image, newMovie) => async dispatch => {
  try {
    console.log('Adding movie:', newMovie);
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      dispatch(setAlert('Please login to add movies', 'error', 5000));
      return;
    }
    
    const url = '/movies';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMovie)
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const movie = await response.json();
      console.log('Movie created:', movie);
      dispatch(setAlert('Movie created successfully!', 'success', 5000));
      dispatch(getMovies());
      return { status: 'success', movie };
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      dispatch(setAlert('Failed to create movie', 'error', 5000));
      return { status: 'error', message: errorText };
    }
  } catch (error) {
    console.error('Add movie error:', error);
    dispatch(setAlert(error.message, 'error', 5000));
    return { status: 'error', message: error.message };
  }
};

export const updateMovie = (movieId, movie, image) => async dispatch => {
  console.log('in update movie',movieId, movie, image);
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/movies/' + movieId;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    });
    if (response.ok) {
      dispatch(onSelectMovie(null));
      dispatch(setAlert('Movie have been saved!', 'success', 5000));
      console.log('about to call uploadimage')
      if (image) dispatch(uploadMovieImage(movieId, image));
      dispatch(getMovies());
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const removeMovie = movieId => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/movies/' + movieId;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      dispatch(getMovies());
      dispatch(onSelectMovie(null));
      dispatch(setAlert('Movie have been Deleted!', 'success', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
