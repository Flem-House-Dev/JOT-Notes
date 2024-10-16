const Note = require("../models/noteModel");

// Get all notes
// const getNotes = async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.user._id }).sort({ date: -1 });

//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const getNotes = async (req, res) => {
  try {
    const { tags } = req.query;
    const query = { user: req.user._id };

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    const notes = await Note.find(query).sort({ date: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a note
// const addNote = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const note = await Note.create({
//       title,
//       content,
//       user: req.user._id,
//     });

//     res.status(201).json(note);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const addNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a note by id (ensure the note belongs to the user)
const editNote = async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params._id, user: req.user._id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(400).json({ message: "Note not found!" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const result = await Note.deleteOne({
      _id: req.params._id,
      user: req.user._id,
    });

    if (!result.deletedCount) {
      return res.status(400).json({ message: "Note not found!" });
    }

    res.status(200).json({ message: "Note deleted!" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getNotes, addNote, editNote, deleteNote };
