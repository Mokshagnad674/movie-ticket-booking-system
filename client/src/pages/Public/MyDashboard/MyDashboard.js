import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';
import { getMovies, getReservations, getCinemas } from '../../../store/actions';
import { MyReservationTable } from './components';
import Account from '../../TheatreOwner/Account';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  }
}));

function MyDashboard(props) {
  const {
    user,
    reservations,
    movies,
    cinemas,
    getMovies,
    getReservations,
    getCinemas
  } = props;

  useEffect(() => {
    getMovies();
    getReservations();
    getCinemas();
  }, [getMovies, getReservations, getCinemas]);

  const classes = useStyles(props);

  const myReservations = reservations.filter(
    reservation => reservation.username === user.username
  );

  console.log(myReservations);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            variant="h2"
            color="inherit">
            Recent Bookings
          </Typography>
        </Grid>
        
        {myReservations.length > 0 ? (
          <Grid item xs={12}>
            <MyReservationTable
              reservations={myReservations}
              movies={movies}
              cinemas={cinemas}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              margin: '20px 0'
            }}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                No Bookings Yet
              </Typography>
              <Typography variant="body1" color="textSecondary">
                You haven't made any movie bookings yet. Start exploring movies and book your first ticket!
              </Typography>
            </div>
          </Grid>
        )}
        
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            My Account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Account />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({
  authState,
  movieState,
  reservationState,
  cinemaState
}) => ({
  user: authState.user,
  movies: movieState.movies,
  reservations: reservationState.reservations,
  cinemas: cinemaState.cinemas
});

const mapDispatchToProps = { getMovies, getReservations, getCinemas };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDashboard);
