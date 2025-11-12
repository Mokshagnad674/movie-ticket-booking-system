import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import useStyles from './styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.copyright} variant="body1">
        &copy; Movie Store 2024
      </Typography>
      <Typography variant="caption">
        Your Ultimate Movie Booking Experience
      </Typography>
    </div>
  );
}
