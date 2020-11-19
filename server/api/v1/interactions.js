const express = require("express");
const interactionsRouter = express.Router();
const { Artist, Album, Song, Interaction } = require("../../models");
const { Op } = require("sequelize");

//create or updates interactions using stored procedure
interactionsRouter.post("/addinteraction", async (req, res, next) => {
  try {
    const count = await Interaction.count({
      where: {
        userId: req.body.userId,
        songId: req.body.songId,
      },
    });
    if (count !== 0) {
      const result = await Interaction.findOne({
        where: {
          userId: req.body.userId,
          songId: req.body.songId,
        },
        raw: true,
      });
      const updatedInteraction = await Interaction.update(
        { playCount: result.playCount + 1, isLike: req.body.isLike },
        {
          where: {
            userId: req.body.userId,
            songId: req.body.songId,
          },
        }
      );
      res.json(updatedInteraction);
    } else {
      const newInteraction = await Interaction.create(req.body);
      res.json(newInteraction);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("bad");
  }
});

module.exports = interactionsRouter;
