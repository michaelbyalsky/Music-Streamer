const express = require('express')
const playlistsRouter = express.Router()
const db = require('../modules/connections')

playlistsRouter.get("/top_playlist", (req, res) => {
    let sql = `CALL top_20_playlists()`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  });
  
  playlistsRouter.get(`/:id`, (req, res) => {
    let id = req.params.id;
    let sql = `call get_playlist_by_id(${id})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  });

  playlistsRouter.post("/addsong", (req, res) => {
    let sql = `CALL add_to_playlist(${req.body.song_id}, ${req.body.playlist_id})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  playlistsRouter.post("/add", (req, res) => {
    let sql = `CALL create_playlist('${req.body.playlist_name}', '${req.body.cover_img}')`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  playlistsRouter.put("/playlist", async (req, res, next) => {
    mysqlCon.query(
      "UPDATE playlists SET playlist_name = ?, cover_img = ? WHERE playlist_id = ?",
      [req.body.playlist_name, req.body.cover_img, req.body.playlist_id],
      (error, results) => {
        if (err) {
            next(err)
        };
        res.send(results);
      }
    );
  });

  playlistsRouter.delete("/playlist/:id", async (req, res) => {
    mysqlCon.query(
      "DELETE FROM playlists WHERE playlist_id = ?",
      [req.params.id],
      (error, results) => {
        if (error) {
          res.send(err.message);
          throw error;
        }
        res.send(results);
      }
    );
  });

  module.exports = playlistsRouter
  
  
  