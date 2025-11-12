import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: 'transparent',
    borderRadius: 0,
    color: theme.palette.common.white,
    boxShadow: 'unset'
  },
  media: {
    height: 300
  },
  h5: {
    textTransform: 'capitalize'
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff6b35',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  cardContainer: {
    position: 'relative'
  }
}));

const MovieCardSimple = props => {
  const classes = useStyles();
  const { movie, ifupcoming } = props;

  if (ifupcoming) {
    return (
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={movie.image}
              title={movie.title}
            />
            <div className={classes.comingSoonBadge}>Coming Soon</div>
            <CardContent>
              <Typography
                className={classes.h5}
                gutterBottom
                variant="h5"
                component="h2"
                color="inherit">
                {movie.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={movie.image}
            title={movie.title}
          />
          <CardContent>
            <Typography
              className={classes.h5}
              gutterBottom
              variant="h5"
              component="h2"
              color="inherit">
              {movie.title}
            </Typography>
            <Box mt={2}>
              <Button 
                component={Link}
                to={`/movie/booking/${movie._id}`}
                variant="contained" 
                color="primary" 
                size="small"
                fullWidth
              >
                Book Now
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

MovieCardSimple.propTypes = {
  movie: PropTypes.object.isRequired
};
export default MovieCardSimple;
