import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography, IconButton, Box } from '@material-ui/core';
import { AccessTime as AccessTimeIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { Paper } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2)
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
  title: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  description: {
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
  updateIcon: {
    color: theme.palette.text.secondary
  },
  updateText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  deleteButton: {
    color: theme.palette.error.main,
    marginLeft: 'auto'
  }
}));

function MovieCard(props) {
  const classes = useStyles(props);
  const { className, movie, onDelete } = props;

  const rootClassName = classNames(classes.root, className);
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper}>
        <img 
          alt="movie" 
          className={classes.image} 
          src={movie.image || 'https://via.placeholder.com/300x450/333/FFF?text=No+Image'}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/333/FFF?text=No+Image';
          }}
        />
      </div>
      <div className={classes.details}>
        <Typography className={classes.title} variant="h4">
          {movie.title}
        </Typography>
        <Typography className={classes.description} variant="body1">
          {movie.description}
        </Typography>
      </div>
      <Box className={classes.stats}>
        <AccessTimeIcon className={classes.updateIcon} />
        <Typography className={classes.updateText} variant="body2">
          {movie.duration} minutes
        </Typography>
        {onDelete && (
          <IconButton 
            className={classes.deleteButton}
            onClick={() => onDelete(movie._id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default MovieCard;
