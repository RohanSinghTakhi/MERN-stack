const express = require('express');
const mongoose = require('mongoose');
const connectToDatabase = require('./db'); // Import the function

const app = express();
const port = 5000;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use routes
app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/displayData'));

// Default route
app.get('/', (req, res) => res.send('Hello World!'));

// Connect to MongoDB and start the server
connectToDatabase().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => {
  console.error("Failed to start the server:", err.message);
});
