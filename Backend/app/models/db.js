const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema(
    {
        title: { type: String},
        text: {type: String}
    }
)

const Note = mongoose.model("Note",NoteSchema)

module.exports = Note