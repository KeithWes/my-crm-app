const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Port setting
const PORT = process.env.PORT || 3000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes here
// app.get('/api/route', (req, res) => { ... });

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Socket.io setup
const server = http.createServer(app);
const io = socketIo(server);

// Example socket.io handling
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
