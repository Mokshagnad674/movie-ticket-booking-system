// ==========================
// Movie Ticket Server
// ==========================
const express = require('express');
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

// Connect to MongoDB
require('./db/mongoose');

// ==========================
// Routes
// ==========================
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const cinemaRouter = require('./routes/cinema');
const showtimeRouter = require('./routes/showtime');
const reservationRouter = require('./routes/reservation');
const invitationsRouter = require('./routes/invitations');

// ==========================
// Express app setup
// ==========================
const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3001;




// ==========================
// CORS Middleware
// ==========================
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ==========================
// Serve uploaded files
// ==========================
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ==========================
// Register Routes
// ==========================
app.use(userRouter);
app.use(movieRouter);
app.use(cinemaRouter);
app.use(showtimeRouter);
app.use(reservationRouter);
app.use(invitationsRouter);

// Serve frontend build files (only if build exists)
const buildPath = path.join(__dirname, "../../client/build");
if (require('fs').existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(buildPath, "index.html"))
  );
} else {
  app.get("*", (req, res) => {
    res.json({ message: "Movie Ticket Booking API is running!" });
  });
}


// ==========================
// Socket.io setup
// ==========================
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

const seatLock = require('./realtime/seatLock');

io.on('connection', (socket) => {
  socket.on('join', ({ showtimeId, username }) => {
    socket.join(showtimeId);
    socket.data.username = username || socket.id;
    io.to(socket.id).emit('locksSnapshot', {
      showtimeId,
      locks: seatLock.snapshot(showtimeId),
    });
  });

  socket.on('lockSeat', ({ showtimeId, row, col }) => {
    const seatKey = `${row}-${col}`;
    const res = seatLock.lock(showtimeId, seatKey, socket.data.username);
    if (res.ok) {
      io.to(showtimeId).emit('seatLocked', {
        seatKey,
        by: socket.data.username,
      });
    } else {
      io.to(socket.id).emit('seatLockFailed', { seatKey });
    }
  });

  socket.on('unlockSeat', ({ showtimeId, row, col }) => {
    const seatKey = `${row}-${col}`;
    const res = seatLock.unlock(showtimeId, seatKey, socket.data.username);
    if (res.ok) {
      io.to(showtimeId).emit('seatUnlocked', {
        seatKey,
        by: socket.data.username,
      });
    }
  });

  socket.on('bookedSeats', ({ showtimeId, seats }) => {
    io.to(showtimeId).emit('seatsBooked', { seats });
  });
});

// ==========================
// Start server
// ==========================
server.listen(PORT, () =>
  console.log(`Server running on PORT: ${PORT}`)
);
