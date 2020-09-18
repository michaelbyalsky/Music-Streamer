const express = require('express')
const artistsRouter = express.Router()
const db = require('../modules/connections')

artistsRouter
    .get("/getartists", (req, res, next) => {
    let sql = `Call get_artists()`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            next(err)
        };
      res.send(result[0]);
    });
  });
  

  artistsRouter
.get(`/artist/:id`, (req, res, next) => {
    let id = req.params.id;
    let sql = `call get_artist_by_id(${id})`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            next(err)
        };
      res.send(result[0]);
    });
  });

  artistsRouter
  .post("/addartist", (req, res, next) => {
    console.log(req.body);
    let sql = `INSERT INTO artists SET ?`;
    let data = req.body;
    console.log(data);
    db.query(sql, data, (err, result) => {
        if (err) {
            next(err)
        };
      console.log(result);
      res.json(result);
    });
  });

  artistsRouter
  .put("/artist", async (req, res, next) => {
    mysqlCon.query(
      "UPDATE artists SET artist_name = ? WHERE artist_id = ?",
      [req.body.artist_name, req.body.artist_id],
      (error, results) => {
        if (err) {
            next(err)
        };
        res.send(results);
      }
    );
  });
  
  artistsRouter
  .delete("/artist/:id", async (req, res) => {
    mysqlCon.query(
      "DELETE FROM artists WHERE artist_id = ?",
      [req.params.id],
      (err, results) => {
        if (err) {
            next(err)
        };
        res.send(results);
      }
    );
  });
  
  module.exports = artistsRouter
  
  