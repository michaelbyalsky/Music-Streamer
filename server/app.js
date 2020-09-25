const express = require("express");
const bodyParser = require("body-parser");
const songs = require('./routes/songs')
const albums = require('./routes/albums')
const artists = require('./routes/artists')
const playlists = require('./routes/playlists')
const users = require('./routes/users')
const interactions = require('./routes/interactions')
const verifyToken = require('./routes/verifyToken')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", users)

app.use(verifyToken)

app.use("/songs", songs)
app.use("/albums", albums)
app.use("/artists", artists)
app.use("/playlists", playlists)
app.use("/interactions", interactions)

//error handling
const errorHandler = (err, req, res, next) => {
    console.log({error: err.message});
    res.status(err.status).send({error: {message: err.message, type: err.type}})
}

app.use(errorHandler)

module.exports = app
