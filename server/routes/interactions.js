const express = require('express')
const interactionsRouter = express.Router()
const db = require('../modules/connections')

//create or updates interactions using stored procedure
interactionsRouter.post("/addinteraction", (req, res, next) => {
    let sql = `CALL handle_interaction(${Number(req.body.user_id)}, ${req.body.song_id}, ${req.body.is_liked})`;
    db.query(sql, (err, result) => {
        if (err) {
            next(err)
        };
      res.json(result);
    });
  });
  
    module.exports = interactionsRouter