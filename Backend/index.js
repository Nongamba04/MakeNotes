const express = require("express");
const bodyParser = require("body-parser");
//Cors Is a middleware used to fix the cors policy error
const cors = require("cors");
const mongoose = require("mongoose");
const noteRouter = require("./app/routes/note_routes");

const app = express();
//Tackling cors
const corsOptions = {
  origin: "*",
  methods: "GET , POST, PUT, DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
// Unfortunately, Express can’t process URL encoded forms on its own. But you did install that body-parser package…
app.use(bodyParser.urlencoded({ extended: true }));
// MongoDB connection string
const uri =
  "mongodb://nghackercoc3:Nongamba21122004@db-shard-00-00.djjbr.mongodb.net:27017,db-shard-00-01.djjbr.mongodb.net:27017,db-shard-00-02.djjbr.mongodb.net:27017/?ssl=true&replicaSet=atlas-glom09-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DB";

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

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
