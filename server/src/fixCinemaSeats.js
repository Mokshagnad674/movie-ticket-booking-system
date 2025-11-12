const mongoose = require('mongoose');
const Cinema = require('./models/cinema');
require('dotenv').config();

function generateSeatsMatrix(totalSeats) {
  const seatsPerRow = 10;
  const rows = Math.ceil(totalSeats / seatsPerRow);
  const seatsMatrix = [];
  
  for (let row = 0; row < rows; row++) {
    const seatsInRow = Math.min(seatsPerRow, totalSeats - (row * seatsPerRow));
    const rowSeats = new Array(seatsInRow).fill(0); // 0 = available
    seatsMatrix.push(rowSeats);
  }
  
  return seatsMatrix;
}

async function fixCinemaSeats() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const cinemas = await Cinema.find({});
    
    for (const cinema of cinemas) {
      const totalSeats = cinema.seatsAvailable;
      const newSeatsMatrix = generateSeatsMatrix(totalSeats);
      
      await Cinema.updateOne(
        { _id: cinema._id },
        { $set: { seats: newSeatsMatrix } }
      );
      
      console.log(`Fixed seats for ${cinema.name} - ${totalSeats} seats in ${newSeatsMatrix.length} rows`);
    }

    console.log('All cinema seats fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing cinema seats:', error);
    process.exit(1);
  }
}

fixCinemaSeats();