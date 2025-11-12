import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bannerTitle: {
    fontSize: theme.spacing(1.4),
    textTransform: 'uppercase',
    color: 'rgb(93, 93, 97)',
    marginBottom: theme.spacing(1)
  },
  bannerContent: {
    fontSize: theme.spacing(2),
    textTransform: 'capitalize',
    color: theme.palette.common.white
  },
  [theme.breakpoints.down('sm')]: {
    hideOnSmall: {
      display: 'none'
    }
  }
}));

export default function BookingCheckout(props) {
  const classes = useStyles(props);
  const {
    user,
    ticketPrice,
    selectedSeats,
    seatsAvailable,
    onBookSeats
  } = props;
  
  const [paymentMethod, setPaymentMethod] = useState('counter');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  const handleBooking = () => {
    if (paymentMethod === 'counter') {
      onBookSeats();
    } else {
      setShowPaymentDialog(true);
    }
  };

  return (
    <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
      <Grid container>
        <Grid item xs={8} md={10}>
          <Grid container spacing={3} style={{ padding: 20 }}>
            {user && user.name && (
              <Grid item className={classes.hideOnSmall}>
                <Typography className={classes.bannerTitle}>Name</Typography>
                <Typography className={classes.bannerContent}>
                  {user.name}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography className={classes.bannerTitle}>Tickets</Typography>
              {selectedSeats > 0 ? (
                <Typography className={classes.bannerContent}>
                  {selectedSeats} tickets
                </Typography>
              ) : (
                <Typography className={classes.bannerContent}>0</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography className={classes.bannerTitle}>Price</Typography>
              <Typography className={classes.bannerContent}>
                {ticketPrice * selectedSeats} &euro;
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" style={{color: 'rgb(93, 93, 97)', fontSize: '12px'}}>Payment Method</FormLabel>
                <RadioGroup
                  row
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel 
                    value="counter" 
                    control={<Radio size="small" style={{color: 'rgb(120, 205, 4)'}} />} 
                    label={<Typography style={{color: 'white', fontSize: '14px'}}>Pay at Counter</Typography>} 
                  />
                  <FormControlLabel 
                    value="online" 
                    control={<Radio size="small" style={{color: 'rgb(120, 205, 4)'}} />} 
                    label={<Typography style={{color: 'white', fontSize: '14px'}}>Pay Online</Typography>} 
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          style={{
            color: 'rgb(120, 205, 4)',
            background: 'black',
            display: 'flex'
          }}>
          <Button
            color="inherit"
            fullWidth
            disabled={seatsAvailable <= 0}
            onClick={handleBooking}>
            {paymentMethod === 'counter' ? 'Book & Pay at Counter' : 'Pay Online'}
          </Button>
        </Grid>
      </Grid>
      
      <Dialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)}>
        <DialogTitle>Online Payment</DialogTitle>
        <DialogContent>
          <Typography>Online payment integration coming soon!</Typography>
          <Typography variant="body2" color="textSecondary">
            For now, please select "Pay at Counter" option.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
