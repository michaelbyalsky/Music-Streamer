const express = require('express')
const interactionsRouter = express.Router()
const { Artist, Album, Song } = require('../models'); 
const { Op } = require('sequelize');
const interaction = require('../models/interaction');

//create or updates interactions using stored procedure
interactionsRouter.post("/addinteraction", async (req, res, next) => {
  try {
    await Interactions.count({
         where: {
           id: req.body.user_id,
           song_id: req.body.song_id
         }
       }).then(count => {
        if(count === 1) {
          Interactions.findOne({
            where: {
              id: req.body.user_id,
              'song_id': req.body.song_id
            }
          }).then(res => {
            const updated = res.play_count + 1
            interaction.update({
              play_count: updated
            }).then(res => {
              res.send
            })
          })
        }
       })
  } catch(err){
    res.status(400).send("bad")
  }  

  });
  
    module.exports = interactionsRouter