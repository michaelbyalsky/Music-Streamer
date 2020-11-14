const express = require("express");
const songsRouter = express.Router();
const { Song, Album, Artist, Interaction } = require("../../models");

songsRouter.get("/all", async (req, res, next) => {
  try {
    const result = await Song.findAll({
      include: {
        model: Artist,
      },
      include: {
        model: Album,
      },
      include: {
         model: Interaction,
         required: false,
      }
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

songsRouter.get(`/:id`, async (req, res) => {
  try {
    const result = await Song.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Artist,
        include: {
          model: Album,
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

songsRouter.get(`/top/:id`, async (req, res) => {
  try {
    const result = await Song.findAll({
      include: {
        model: Artist,
        include: {
          model: Album,
        },
      },
      include: {
        model: Interaction,
        where: {
          userId: req.params.id,
          isLike: true

        }
      }
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

songsRouter.post("/addsong", async (req, res) => {
  try {
    const result = await Song.create(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

songsRouter.put("/song", async (req, res) => {});

songsRouter.delete("/song/:id", async (req, res) => {});

module.exports = songsRouter;
