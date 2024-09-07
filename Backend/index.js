const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const noteRouter = require("./app/routes/note_routes");

const app = express();

// Tackling CORS with detailed headers
const corsOptions = {
  origin: 'https://make-notes-mu.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Additional CORS headers middleware with logging
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://make-notes-mu.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  console.log(`CORS headers set for ${req.method} request to ${req.url}`);
  
  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add JSON body parser to handle JSON data

// MongoDB connection string
const uri = "mongodb://nghackercoc3:Nongamba21122004@db-shard-00-00.djjbr.mongodb.net:27017,db-shard-00-01.djjbr.mongodb.net:27017,db-shard-00-02.djjbr.mongodb.net:27017/?ssl=true&replicaSet=atlas-glom09-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DB";

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(noteRouter);

// Test Route for Debugging CORS
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working correctly.' });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
