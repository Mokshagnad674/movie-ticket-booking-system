import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { addCinema } from '../../store/actions';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  card: {
    marginBottom: theme.spacing(3)
  },
  seatGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(1)
  },
  seat: {
    width: 30,
    height: 30,
    border: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    backgroundColor: '#f5f5f5'
  }
}));

const CreateCinema = ({ addCinema }) => {
  const classes = useStyles();
  const history = useHistory();
  const [cinemaData, setCinemaData] = useState({
    name: '',
    city: '',
    ticketPrice: '',
    rows: 10,
    seatsPerRow: 12,
    image: ''
  });

  const cities = ['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune', 'kolkata', 'ahmedabad'];

  const handleInputChange = (field) => (event) => {
    setCinemaData({
      ...cinemaData,
      [field]: event.target.value
    });
  };

  const generateSeats = () => {
    const seats = [];
    for (let i = 0; i < cinemaData.rows; i++) {
      const row = new Array(cinemaData.seatsPerRow).fill(0);
      seats.push(row);
    }
    return seats;
  };

  const handleSubmit = async () => {
    try {
      const seats = generateSeats();
      const cinemaPayload = {
        name: cinemaData.name.toLowerCase(),
        city: cinemaData.city,
        ticketPrice: parseFloat(cinemaData.ticketPrice),
        seats: seats,
        seatsAvailable: cinemaData.rows * cinemaData.seatsPerRow,
        image: cinemaData.image || 'https://images.unsplash.com/photo-1489599904472-84978f312f2e?w=400&h=200&fit=crop'
      };
      
      console.log('Creating cinema:', cinemaPayload);
      await addCinema(cinemaPayload);
      history.push('/admin/cinemas');
    } catch (error) {
      console.error('Error creating cinema:', error);
    }
  };

  const totalSeats = cinemaData.rows * cinemaData.seatsPerRow;

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Create New Cinema
      </Typography>
      
      <Card className={classes.card}>
        <CardHeader title="Cinema Information" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cinema Name"
                value={cinemaData.name}
                onChange={handleInputChange('name')}
                variant="outlined"
                required
                placeholder="e.g., PVR Cinemas, INOX Theatre"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>City</InputLabel>
                <Select
                  value={cinemaData.city}
                  onChange={handleInputChange('city')}
                  label="City"
                  required
                >
                  {cities.map(city => (
                    <MenuItem key={city} value={city}>
                      {city.charAt(0).toUpperCase() + city.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ticket Price (₹)"
                type="number"
                value={cinemaData.ticketPrice}
                onChange={handleInputChange('ticketPrice')}
                variant="outlined"
                required
                placeholder="250"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cinema Image URL (optional)"
                value={cinemaData.image}
                onChange={handleInputChange('image')}
                variant="outlined"
                placeholder="https://example.com/cinema.jpg"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className={classes.card}>
        <CardHeader title="Seating Configuration" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Rows"
                type="number"
                value={cinemaData.rows}
                onChange={handleInputChange('rows')}
                variant="outlined"
                inputProps={{ min: 5, max: 20 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Seats per Row"
                type="number"
                value={cinemaData.seatsPerRow}
                onChange={handleInputChange('seatsPerRow')}
                variant="outlined"
                inputProps={{ min: 8, max: 20 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Total Seats: {totalSeats}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Seating Layout Preview:
              </Typography>
              <div className={classes.seatGrid} style={{ gridTemplateColumns: `repeat(${cinemaData.seatsPerRow}, 1fr)` }}>
                {Array.from({ length: totalSeats }, (_, index) => {
                  const row = Math.floor(index / cinemaData.seatsPerRow);
                  const seat = (index % cinemaData.seatsPerRow) + 1;
                  return (
                    <div key={index} className={classes.seat}>
                      {String.fromCharCode(65 + row)}{seat}
                    </div>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button 
          variant="outlined" 
          size="large"
          onClick={() => history.push('/admin/cinemas')}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={handleSubmit}
        >
          Create Cinema
        </Button>
      </Box>
    </div>
  );
};

export default connect(null, { addCinema })(CreateCinema);