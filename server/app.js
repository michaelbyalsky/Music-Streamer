const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const verifyToken = require("./routes/verifyToken");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", users);

// app.use(verifyToken)

app.use("/api", verifyToken, require("./api"));

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

//error handling
const errorHandler = (err, req, res, next) => {
  res
    .status(err.status)
    .send({ error: { message: err.message, type: err.type } });
};

app.use(errorHandler);

module.exports = app;
