import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@material-ui/core';
import {
  Movie as MovieIcon,
  Theaters as TheatersIcon,
  EventSeat as EventSeatIcon,
  MonetizationOn as MonetizationOnIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMovies } from '../../store/actions/movies';
import { getCinemas } from '../../store/actions/cinemas';
import { getReservations } from '../../store/actions/reservations';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    flexGrow: 1
  },
  statCard: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white'
  },
  revenueCard: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white'
  },
  bookingCard: {
    background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
    color: 'white'
  },
  cinemaCard: {
    background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)',
    color: 'white'
  },
  quickAction: {
    margin: theme.spacing(1)
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold'
  }
}));

const Dashboard = ({ movies, cinemas, reservations, getMovies, getCinemas, getReservations }) => {
  const classes = useStyles();
  
  useEffect(() => {
    if (!movies.length) getMovies();
    if (!cinemas.length) getCinemas();
    if (!reservations.length) getReservations();
  }, [movies, cinemas, reservations, getMovies, getCinemas, getReservations]);
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalCinemas: 0,
    todayBookings: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    // Calculate real stats from props
    const calculateStats = () => {
      const totalMovies = movies?.length || 0;
      const totalCinemas = cinemas?.length || 0;
      const todayBookings = reservations?.filter(r => 
        new Date(r.date).toDateString() === new Date().toDateString()
      ).length || 0;
      const monthlyRevenue = reservations?.reduce((sum, r) => sum + (r.total || 0), 0) || 0;
      
      setStats({
        totalMovies,
        totalCinemas,
        todayBookings,
        monthlyRevenue
      });
    };
    
    calculateStats();
  }, [movies, cinemas, reservations]);

  const [recentBookings] = useState([
    { id: 1, movie: 'Avengers: Endgame', cinema: 'PVR Mall', time: '7:00 PM', status: 'confirmed' },
    { id: 2, movie: 'Spider-Man', cinema: 'INOX Theatre', time: '9:30 PM', status: 'pending' },
    { id: 3, movie: 'The Batman', cinema: 'Cinepolis', time: '6:00 PM', status: 'confirmed' }
  ]);

  const quickActions = [
    { title: 'Create New Movie', link: '/admin/create-movie', icon: <MovieIcon />, color: 'primary' },
    { title: 'Create New Cinema', link: '/admin/create-cinema', icon: <TheatersIcon />, color: 'primary' },
    { title: 'Manage Movies', link: '/admin/movies', icon: <MovieIcon />, color: 'secondary' },
    { title: 'Manage Cinemas', link: '/admin/cinemas', icon: <TheatersIcon />, color: 'default' }
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Theatre Owner Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Welcome back! Here's what's happening with your theatres today.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={`${classes.card} ${classes.statCard}`}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{stats.totalMovies}</Typography>
                  <Typography variant="body2">Total Movies</Typography>
                </Box>
                <MovieIcon style={{ fontSize: 40, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className={`${classes.card} ${classes.cinemaCard}`}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{stats.totalCinemas}</Typography>
                  <Typography variant="body2">Active Cinemas</Typography>
                </Box>
                <TheatersIcon style={{ fontSize: 40, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className={`${classes.card} ${classes.bookingCard}`}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{stats.todayBookings}</Typography>
                  <Typography variant="body2">Today's Bookings</Typography>
                </Box>
                <EventSeatIcon style={{ fontSize: 40, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className={`${classes.card} ${classes.revenueCard}`}>
            <CardContent className={classes.cardContent}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">₹{stats.monthlyRevenue.toLocaleString()}</Typography>
                  <Typography variant="body2">Monthly Revenue</Typography>
                </Box>
                <MonetizationOnIcon style={{ fontSize: 40, opacity: 0.7 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1.5rem' }}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Button
                    component={Link}
                    to={action.link}
                    variant="outlined"
                    color={action.color}
                    fullWidth
                    startIcon={action.icon}
                    className={classes.quickAction}
                  >
                    {action.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '1.5rem' }}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Recent Bookings
            </Typography>
            <List>
              {recentBookings.map((booking) => (
                <ListItem key={booking.id} divider>
                  <ListItemIcon>
                    <EventSeatIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={booking.movie}
                    secondary={`${booking.cinema} • ${booking.time}`}
                  />
                  <Chip
                    label={booking.status}
                    color={booking.status === 'confirmed' ? 'primary' : 'default'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
            <Box mt={2}>
              <Button
                component={Link}
                to="/admin/reservations"
                variant="outlined"
                fullWidth
              >
                View All Bookings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ movieState, cinemaState, reservationState }) => ({
  movies: movieState.movies,
  cinemas: cinemaState.cinemas,
  reservations: reservationState.reservations
});

const mapDispatchToProps = { getMovies, getCinemas, getReservations };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
