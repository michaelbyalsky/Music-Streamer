const express = require("express");
const interactionsRouter = express.Router();
const { Artist, Album, Song, Interaction } = require("../models");
const { Op } = require("sequelize");
const interaction = require("../models/interaction");

//create or updates interactions using stored procedure
interactionsRouter.post("/addinteraction", async (req, res, next) => {
  console.log(req.body);
  try {
    const count = await Interaction.count({
      where: {
        user_id: req.body.user_id,
        song_id: req.body.song_id,
      },
    });
    console.log(count);
    if (count !== 0) {
      const result = await Interaction.findOne({
        where: {
          user_id: req.body.user_id,
          song_id: req.body.song_id,
        },
        raw: true
      });
      const updatedInteraction = await Interaction.update(
        {play_count: result.play_count + 1},
          {where: {
            user_id: req.body.user_id,
            song_id: req.body.song_id
          }},
      );
      res.send(updatedInteraction);
    } else {
      console.log(req.body);
      const newInteraction = await Interaction.create(req.body);
      res.send(newInteraction);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("bad");
  }
});

module.exports = interactionsRouter;
