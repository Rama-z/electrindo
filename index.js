require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./src/config/postgres");
const mainApp = require("./src/routes/main");
const PORT = process.env.PORT;

database
  .connect()
  .then(() => {
    console.log("Database Connected");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan("dev"));
    app.use(cors());
    app.set("views", path.join(__dirname, "src/views"));
    app.set("view engine", "ejs");
    app.use(mainApp);
    app.listen(PORT, () => {
      console.log(`This server running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
