import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';
import { MovieToolbar, MovieCard } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import AddMovie from './components/AddMovie/AddMovie';
import { getMovies, onSelectMovie, removeMovie } from '../../../store/actions';
import { match } from '../../../utils';

class MovieList extends Component {
  state = { search: '' };
  componentDidMount() {
    const { movies, getMovies } = this.props;
    if (!movies.length) getMovies();
  }

  handleDeleteMovie = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await this.props.removeMovie(movieId);
        this.props.getMovies(); // Refresh the list
      } catch (error) {
        alert('Failed to delete movie');
      }
    }
  };

  renderMovies() {
    const { classes } = this.props;
    const movies = match(this.state.search, this.props.movies, 'title');

    if (!movies.length) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <Grid container spacing={3}>
        {movies.map(movie => (
          <Grid
            item
            key={movie._id}
            lg={4}
            md={6}
            xs={12}
            onClick={() => this.props.onSelectMovie(movie)}>
            <MovieCard movie={movie} onDelete={this.handleDeleteMovie} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes, selectedMovie } = this.props;
    return (
      <div className={classes.root}>
        <MovieToolbar
          search={this.state.search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
        />
        <div className={classes.content}>{this.renderMovies()}</div>
        <ResponsiveDialog
          id="Edit-movie"
          open={Boolean(selectedMovie)}
          handleClose={() => this.props.onSelectMovie(null)}>
          <AddMovie edit={selectedMovie} />
        </ResponsiveDialog>
      </div>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieState }) => ({
  movies: movieState.movies,
  latestMovies: movieState.latestMovies,
  comingSoon: movieState.comingSoon,
  nowShowing: movieState.nowShowing,
  selectedMovie: movieState.selectedMovie
});

const mapDispatchToProps = { getMovies, onSelectMovie, removeMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MovieList));
