const mongoose = require('mongoose');
const express = require('express');
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

// Routes
app.use('/api', require('./routes/CreateUser')); // Single import for both routes

// Default route
app.get('/', (req, res) => res.send('Hello World!'));

// Connect to MongoDB
const uri = "mongodb+srv://GOfood:Manjit%40970@cluster0.folbobx.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
.then(() => {
  console.log("Connected to MongoDB successfully");
  // Start the server
  app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => {
  console.error("Failed to connect to MongoDB:", err);
});
