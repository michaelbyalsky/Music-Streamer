const express = require("express");
const bodyParser = require("body-parser");
const users = require('./routes/users')
const verifyToken = require('./routes/verifyToken')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", users)

app.use(verifyToken)

app.use("/api", require("./api"))



//error handling
const errorHandler = (err, req, res, next) => {
    console.log({error: err.message});
    res.status(err.status).send({error: {message: err.message, type: err.type}})
}

app.use(errorHandler)

module.exports = app
