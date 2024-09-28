const router = require("express").Router();
const protect = require("../../middleware/authMiddleware");

const {
  getNotes,
  addNote,
  editNote,
  deleteNote,
} = require("../../controllers/noteController");

router.route("/").get(protect, getNotes).post(protect, addNote);
router.route("/:_id").put(protect, editNote).delete(protect, deleteNote);


// router.route("/").get(getNotes).post(addNote);
// router.route("/:_id").put(editNote).delete(deleteNote);

module.exports = router;
