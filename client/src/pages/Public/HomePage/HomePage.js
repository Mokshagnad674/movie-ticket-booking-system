import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Box, Grid } from '@material-ui/core';
import {
  getMovies,
  getShowtimes,
  getMovieSuggestion
} from '../../../store/actions';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import MovieCardSimple from '../components/MovieCardSimple/MovieCardSimple';
import { Typography, Container } from '@material-ui/core';
import styles from './styles';

class HomePage extends Component {
  componentDidMount() {
    const {
      movies,
      showtimes,
      suggested,
      getMovies,
      getShowtimes,
      getMovieSuggestion,
      user
    } = this.props;
    console.log('HomePage mounted, movies:', movies);
    getMovies(); // Always fetch movies
    console.log('Fetching movies...');
    if (!showtimes || showtimes.length === 0) getShowtimes();
    if (user) {
      if (!suggested || suggested.length === 0) getMovieSuggestion(user.username);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user && this.props.user) {
      this.props.getMovieSuggestion(this.props.user.username);
    }
  }

  render() {
    const {
      classes,
      randomMovie,
      comingSoon,
      nowShowing,
      suggested
    } = this.props;
    return (
      <Fragment>
        <MovieBanner movie={randomMovie} height="85vh" />
        <Box height={60} />
        <Container maxWidth="lg" style={{marginTop: '40px'}}>
          <Typography variant="h4" style={{color: 'white', marginBottom: '30px', textAlign: 'center'}}>
            All Movies
          </Typography>
          {this.props.movies && this.props.movies.length > 0 ? (
            <Grid container spacing={3}>
              {this.props.movies.map((movie, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                  <MovieCardSimple movie={movie} index={index} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div style={{textAlign: 'center', padding: '50px', color: 'white'}}>
              <h3>Loading movies...</h3>
            </div>
          )}
        </Container>
        {false && (
          <Grid container style={{ height: 500 }}>
            <Grid item xs={7} style={{ background: '#131334' }}></Grid>
            <Grid item xs={5} style={{ background: '#010025' }}></Grid>
          </Grid>
        )}
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  latestMovies: PropTypes.array.isRequired
};

const mapStateToProps = ({ movieState, showtimeState, authState }) => ({
  movies: movieState.movies,
  randomMovie: movieState.randomMovie,
  latestMovies: movieState.latestMovies,
  comingSoon: movieState.comingSoon,
  nowShowing: movieState.nowShowing,
  showtimes: showtimeState.showtimes,
  suggested: movieState.suggested,
  user: authState.user
});

const mapDispatchToProps = { getMovies, getShowtimes, getMovieSuggestion };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));
