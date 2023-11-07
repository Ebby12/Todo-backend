const express = require("express");
const app = express();
require("dotenv").config(".env");

var cors = require("cors"); //cross origin security
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working test api");
});

// Middlewares
app.use(express.json()); // Call app.use() and pass it express.json() so that we can parse the request body that contain JSON objects.
app.use(express.urlencoded({ extended: false })); // Call app.use() and pass it express.urlencoded() so that we can parse the request body with urlencoded values.

const myRoutes = require("./routes");
app.use("/", myRoutes);

app.use((req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "No route found for the requested URL",
  });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

module.exports = app;
