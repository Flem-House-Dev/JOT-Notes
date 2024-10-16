const router = require("express").Router();
const protect = require("../../middleware/authMiddleware");

const {
  getNotes,
  addNote,
  editNote,
  deleteNote,
} = require("../../controllers/noteController");

const { addTag, removeTag } = require("../../controllers/tagController");

router.route("/").get(protect, getNotes).post(protect, addNote);
router.route("/:_id").put(protect, editNote).delete(protect, deleteNote);

router.route("/:_id/tag").put(protect, addTag).delete(protect, removeTag);


// router.route("/").get(getNotes).post(addNote);
// router.route("/:_id").put(editNote).delete(deleteNote);

module.exports = router;
