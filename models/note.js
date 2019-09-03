const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: [true, "OwnerId is required"]
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  text: {
    type: String,
    required: [true, "Text is required"]
  }
});

module.exports = mongoose.model("Note", noteSchema);
