require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mainApp = require("./src/routes/mains");
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(mainApp);
app.listen(PORT, () => {
  console.log(`This server running on Port ${PORT}`);
});
