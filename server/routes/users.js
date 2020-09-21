const express = require('express')
const usersRouter = express.Router()
const db = require('../modules/connections')

usersRouter
.post("/validation", (req, res, next) => {
    let sql = `CALL validation("${req.body.userName}", "${req.body.password}")`;
    db.query(sql, (err, result) => {
        if (err) {
            next(err)
        };
      res.send(result[0]);
    });
  });

  module.exports = usersRouter
  