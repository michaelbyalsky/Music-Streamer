const express = require("express");
const songsRouter = express.Router();
const db = require("../modules/connections");

songsRouter.get("/all", (req, res, next) => {
  console.log("first");
  if (req.query.searchText) {
    console.log("hrer");
    let sql = `CALL get_songs_by_name("${req.query.searchText}")`;
    db.query(sql, (err, result) => {
      if (err) {
        next(err);
      }
      res.send(result[0]);
    });
  } else {
    let sql = `CALL get_songs()`;
    db.query(sql, (err, result) => {
      if (err) {
        next(err);
      }
      res.send(result[0]);
    });
  }
});

songsRouter.get(`/song/:id`, (req, res) => {
  let id = Number(req.params.id);
  console.log(id);
  let sql = `CALL get_song_by_id(${id})`;
  db.query(sql, (err, result) => {
    if (err) {
      next(err);
    }
    console.log(result);
    res.send(result[0]);
  });
});

songsRouter.post("/addsong", (req, res) => {
  console.log(req.body);
  let sql = `INSERT INTO songs SET ?`;
  let data = req.body;
  console.log(data);
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

songsRouter.put("/song", async (req, res) => {
  mysqlCon.query(
    "UPDATE songs SET song_name = ?, artist_id = ?, youtube_link = ?, length = ? WHERE song_id = ?",
    [
      req.body.song_name,
      req.body.artist_id,
      req.body.youtube_link,
      req.body.length,
      req.body.song_id,
    ],
    (error, results) => {
      if (error) {
        res.send(err.message);
        throw error;
      }
      res.send(results);
    }
  );
});

songsRouter.delete("/song/:id", async (req, res) => {
  mysqlCon.query(
    "DELETE FROM songs WHERE song_id = ?",
    [req.params.id],
    (error, results, fields) => {
      if (error) {
        res.send(err.message);
        throw error;
      }
      res.send(results);
    }
  );
});

module.exports = songsRouter;
