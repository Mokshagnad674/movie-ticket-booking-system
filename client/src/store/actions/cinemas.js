import { GET_CINEMAS, GET_CINEMA } from '../types';
import { setAlert } from './alert';

export const uploadCinemaImage = (id, image) => async dispatch => {
  try {
    const data = new FormData();
    data.append('file', image);
    const url = '/cinemas/photo/' + id;
    const response = await fetch(url, {
      method: 'POST',
      body: data
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert('Image Uploaded', 'success', 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getCinemas = () => async dispatch => {
  try {
    const url = '/cinemas';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const cinemas = await response.json();
    if (response.ok) {
      dispatch({ type: GET_CINEMAS, payload: cinemas });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const addCinema = (newCinema) => async dispatch => {
  try {
    console.log('Adding cinema:', newCinema);
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      dispatch(setAlert('Please login to add cinemas', 'error', 5000));
      return;
    }
    
    const url = '/cinemas';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCinema)
    });
    
    if (response.ok) {
      const cinema = await response.json();
      console.log('Cinema created:', cinema);
      dispatch(setAlert('Cinema created successfully!', 'success', 5000));
      dispatch(getCinemas());
      return { status: 'success', cinema };
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      dispatch(setAlert('Failed to create cinema', 'error', 5000));
      return { status: 'error', message: errorText };
    }
  } catch (error) {
    console.error('Add cinema error:', error);
    dispatch(setAlert(error.message, 'error', 5000));
    return { status: 'error', message: error.message };
  }
};

export const getCinema = id => async dispatch => {
  try {
    const url = '/cinemas/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const cinema = await response.json();
    if (response.ok) {
      dispatch({ type: GET_CINEMA, payload: cinema });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const createCinemas = (image, newCinema) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/cinemas';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCinema)
    });
    const cinema = await response.json();
    if (response.ok) {
      dispatch(setAlert('Cinema Created', 'success', 5000));
      if (image) dispatch(uploadCinemaImage(cinema._id, image));
      dispatch(getCinemas());
      return { status: 'success', message: 'Cinema Created' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Cinema have not been saved, try again.'
    };
  }
};

export const updateCinemas = (image, cinema, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/cinemas/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cinema)
    });
    if (response.ok) {
      dispatch(setAlert('Cinema Updated', 'success', 5000));
      if (image) dispatch(uploadCinemaImage(id, image));
      return { status: 'success', message: 'Cinema Updated' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Cinema have not been updated, try again.'
    };
  }
};

export const removeCinemas = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/cinemas/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      dispatch(setAlert('Cinema Deleted', 'success', 5000));
      return { status: 'success', message: 'Cinema Removed' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Cinema have not been deleted, try again.'
    };
  }
};

export const getCinemasUserModeling = username => async dispatch => {
  try {
    const url = '/cinemas/usermodeling/' + username;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const cinemas = await response.json();
    if (response.ok) {
      dispatch({ type: GET_CINEMAS, payload: cinemas });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
