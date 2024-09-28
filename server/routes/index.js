const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  console.log(`top level- API request to: ${req.originalUrl}`);
  return res.json({ error: "Wrong route!" });
});

module.exports = router;
