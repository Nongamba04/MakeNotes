const express = require("express");
const bodyParser = require("body-parser");
const noteModel = require("../models/db");

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.post("/api/notes", async (req, res) => {
  try {
    const note = new noteModel(req.body); // Use singular form for clarity
    await note.save(); // Save the note to the database
    res.status(201).send(note); // Return the created note with a 201 status
  } catch (error) {
    res.status(400).send({ error: error.message }); // Return a 400 status for bad requests
  }
});

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await noteModel.find(); // Retrieve all notes from the database
    res.status(200).json(notes); // Send the notes with a 200 status code
  } catch (error) {
    res.status(500).send({ error: error.message }); // Send a more descriptive error message
  }
});

app.put("/api/notes", async (req, res) => {
  try {
    const { id, title, text } = req.body; // Destructure id, title, and text from req.body

    if (!id) {
      return res.status(400).send({ error: "Note id is required" });
    }

    const note = await noteModel.findById(id);

    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }

    note.title = title;
    note.text = text;
    await note.save();
    res.status(200).send(note); // Return updated note with a 200 status code
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.delete("/api/notes/:id", async (req,res)=> {
    try {
      const {id} = req.params

      if (!id) {
        return res.status(400).send({ error: "Note id is required" });
      }
      
     const result = await noteModel.findByIdAndDelete(id)

     if(!result){
      return res.status(404).send({ error: "Note not found" });
     }
     res.status(200).send({ message: "Note successfully deleted" });
    }
    catch(err){
      res.status(400).send({ error: err.message });
    }
})

module.exports = app;
