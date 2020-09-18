const express = require('express')
const usersRouter = express.Router()
const db = require('../modules/connections')

usersRouter
.post("/getuser", (req, res, next) => {
    console.log(req.body)
  console.log(req.body);
    let sql = `CALL validation("${req.body.userName}", "${req.body.password}")`;
    db.query(sql, (err, result) => {
        if (err) {
            next(err)
        };
      console.log(result[0]);
      res.send(result[0]);
    });
  });

  module.exports = usersRouter
  