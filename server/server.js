const path = require("path");
require("dotenv").config({ path: "../.env" });
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes/api");

console.log(".ENV TEST VAR: ", process.env.TEST_VAR);
// console.log("NODE_ENV: ", process.env.NODE_ENV);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);

if (process.env.NODE_ENV === 'production') {
  console.log("NODE_ENV: ", process.env.NODE_ENV);
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });