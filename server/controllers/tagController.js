import Note from "../models/noteModel";

// Add a tag to an existing note
const addTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;

    const updateNote = await Note.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $addToSet: { tags: tag } },
      { new: true }
    );

    if (!updateNote) {
      return res.status(400).json({ message: "Note not found!" });
    }

    res.status(200).json(updateNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a tag from an existing note
const removeTag = async (req, res) => {
  try {
    const { _id } = req.params;
    const { tag } = req.body;

    const updateNote = await Note.findOneAndUpdate(
      { _id, user: req.user._id },
      { $pull: { tags: tag } },
      { new: true }
    );

    if (!updateNote) {
      return res.status(400).json({ message: "Note not found!" });
    }

    res.status(200).json(updateNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addTag, removeTag };