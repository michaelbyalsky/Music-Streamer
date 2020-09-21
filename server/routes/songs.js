const express = require("express");
const songsRouter = express.Router();
const db = require("../modules/connections");

songsRouter.get("/all", (req, res, next) => {
  if (req.query.searchText) {
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

songsRouter.get(`/:id`, (req, res) => {
  let id = Number(req.params.id);
  let sql = `CALL get_song_by_id(${id})`;
  db.query(sql, (err, result) => {
    if (err) {
      next(err);
    }
    res.send(result[0]);
  });
});

songsRouter.post("/addsong", (req, res) => {
  let sql = `INSERT INTO songs SET ?`;
  let data = req.body;
  db.query(sql, data, (err, result) => {
    if (err) throw err;
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
