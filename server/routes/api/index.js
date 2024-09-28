const router = require("express").Router();
const noteRoutes = require("./noteRoutes");
const userRoutes = require("./userRoutes");

router.use("/notes", noteRoutes);
router.use("/user", userRoutes);

router.use((req, res) => {
  console.log(`api level- API request to: ${req.path}`);
  return res.status(404).json({ error: "Wrong route!" });
});

module.exports = router;
