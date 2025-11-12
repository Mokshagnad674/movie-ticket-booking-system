import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles, Button, Dialog, DialogTitle, DialogContent, Grid, Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '../../../../components';
import { EventSeat, AttachMoney } from '@material-ui/icons';
import { connect } from 'react-redux';
import { getMovies, getShowtimes } from '../../../../store/actions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  imageWrapper: {
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: { padding: theme.spacing(3) },
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  city: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  eventIcon: {
    color: theme.palette.text.secondary
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

function CinemaCard(props) {
  const classes = useStyles(props);
  const { className, cinema, movies, showtimes, getMovies, getShowtimes } = props;
  const [open, setOpen] = useState(false);
  const [cinemaMovies, setCinemaMovies] = useState([]);
  
  useEffect(() => {
    if (!movies.length) getMovies();
    if (!showtimes.length) getShowtimes();
  }, [movies, showtimes, getMovies, getShowtimes]);

  useEffect(() => {
    if (cinema && showtimes.length && movies.length) {
      const cinemaShowtimes = showtimes.filter(st => st.cinemaId === cinema._id);
      const movieIds = [...new Set(cinemaShowtimes.map(st => st.movieId))];
      const filteredMovies = movies.filter(movie => movieIds.includes(movie._id));
      setCinemaMovies(filteredMovies);
    }
  }, [cinema, showtimes, movies]);

  const cinemaImage = cinema?.image || 'https://source.unsplash.com/featured/?cinema';
  const rootClassName = classNames(classes.root, className);
  
  return (
    <>
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img
            alt="cinema"
            className={classes.image}
            src={cinemaImage}
            onClick={() => setOpen(true)}
          />
        </div>
        <div className={classes.details}>
          <Typography className={classes.name} variant="h4">
            {cinema.name}
          </Typography>
          <Typography className={classes.city} variant="body1">
            {cinema.city}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            style={{ marginTop: 16 }}
            onClick={() => setOpen(true)}
          >
            View Movies
          </Button>
        </div>
        <div className={classes.stats}>
          <AttachMoney className={classes.eventIcon} />
          <Typography className={classes.eventText} variant="body2">
            ₹{cinema.ticketPrice} per ticket
          </Typography>
        </div>
        <div className={classes.stats}>
          <EventSeat className={classes.eventIcon} />
          <Typography className={classes.eventText} variant="body2">
            {cinema.seatsAvailable} seats Available
          </Typography>
        </div>
      </Paper>
      
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{cinema.name} - Available Movies</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {cinemaMovies.map(movie => (
              <Grid item xs={12} sm={6} key={movie._id}>
                <Box display="flex" p={2} border={1} borderColor="grey.300" borderRadius={4}>
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    style={{ width: 80, height: 120, objectFit: 'cover' }}
                  />
                  <Box ml={2} flex={1}>
                    <Typography variant="h6">{movie.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {movie.genre} • {movie.duration} min
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: 8 }}>
                      {movie.description.substring(0, 80)}...
                    </Typography>
                    <Button 
                      component={Link}
                      to={`/movie/booking/${movie._id}`}
                      variant="contained" 
                      color="primary" 
                      size="small"
                      style={{ marginTop: 8 }}
                      onClick={() => setOpen(false)}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

const mapStateToProps = ({ movieState, showtimeState }) => ({
  movies: movieState.movies,
  showtimes: showtimeState.showtimes
});

export default connect(mapStateToProps, { getMovies, getShowtimes })(CinemaCard);
