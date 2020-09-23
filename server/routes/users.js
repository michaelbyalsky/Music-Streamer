const express = require('express')
const usersRouter = express.Router()
const db = require('../modules/connections')
const { registerValidation, loginValidation } = require('./validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

usersRouter
.post("/validation", async (req, res, next) => {
  const validation = loginValidation(req.body)
    if(validation.error) {
      return res.status(400).send(validation.error.details[0].message)
    }
    db.query(`CALL check_duplicates('${req.body.email}')`, (err, result) => {
      if (err) {
          res.send(err)
      };
    if (result[0][0].boo === 0) {
      res.status(400).send("email not found")
    }
  });
  let sql = `CALL validation("${req.body.email}")`;
  db.query(sql, async (err, result) => {
    if (err) {
      next(err)
    };
    const validPass = await bcrypt.compare(req.body.password, result[0][0].user_password)
    if (!validPass) {
      res.status(400).send("invalidPassword")
    } else {
      const token = jwt.sign({_id: result[0][0].user_id}, process.env.TOKEN_SECRET)
      res.header('auth-token', token).send(token)
    }
  });
});


  usersRouter
  .post("/register", async (req, res, next) => {
    const validation = registerValidation(req.body)
    if(validation.error) {
      return res.status(400).send(validation.error.details[0].message)
    }
    db.query(`CALL check_duplicates('${req.body.email}')`, (err, result) => {
      if (err) {
          res.send(err)
      };
    if (result[0][0].boo === 1) {
      res.status(400).send("this email already exist")
    }
  });
      //hash
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
    let sql = `CALL register("${req.body.userName}", "${req.body.email}", ${req.body.birthDate}, "${hashedPassword}")`;
    db.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        };
      res.send(result[0]);
    });
    });
  

  module.exports = usersRouter
  