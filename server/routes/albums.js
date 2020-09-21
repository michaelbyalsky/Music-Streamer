const express = require('express')
const albumsRouter = express.Router()
const db = require('../modules/connections')

albumsRouter
.get("/all", (req, res, next) => {
    if (req.query.searchText) {

      let sql = `CALL get_albums_by_name("${req.query.searchText}")`
      db.query(sql, (err, result) => {
        if (err) {
            next(err)
        };
            res.send(result[0]);
      });
    } else {
      let sql = `CALL get_albums()`            
      db.query(sql, (err, result) => {
        if (err) {
            next(err)
        };
        res.send(result[0]);
      });
    }
  });

  albumsRouter
  .get(`/:id`, (req, res, next) => {
    let id = Number(req.params.id);
    let sql = `CALL get_album_by_id(${id}) 
                `;
    db.query(sql, (err, result) => {
        if (err) {
            next(err)
        };
      res.send(result[0]);
    });
  });

  albumsRouter
  .post("/addalbum", (req, res, next) => {
    let sql = `INSERT INTO albums SET ?`;
    let data = req.body;
    db.query(sql, data, (err, result) => {
        if (err) {
            next(err)
        };
      res.json(result);
    });
  });

  
  albumsRouter
  .put("/album", async (req, res, next) => {
    mysqlCon.query(
      "UPDATE albums SET album_name = ?, artist_id = ?, cover_img = ? WHERE album_id = ?",
      [req.body.album_name, req.body.artist_id, req.body.cover_img],
      (error, results) => {
        if (err) {
            next(err)
        };
        res.send(results);
      }
    );
  });


  albumsRouter
  .delete("/album/:id", async (req, res, next) => {
    mysqlCon.query(
      "DELETE FROM albums WHERE album_id = ?",
      [req.params.id],
      (error, results) => {
        if (err) {
            next(err)
        };
        res.send(results);
      }
    );
  });
  
  module.exports = albumsRouter