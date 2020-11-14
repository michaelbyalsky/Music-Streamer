const express = require("express");
const Sequelize = require("sequelize");
const artistsRouter = express.Router();
const { Artist, Album, Song, InteractionsArtists } = require("../../models");
const { Op } = require("sequelize");

artistsRouter.get("/all", async (req, res, next) => {
  try {
    if (req.query.searchText) {
      const result = await Artist.findAll({
        attributes: ["id", "name", "artistImg", "createdAt", "updatedAt"],
        where: {
          name: {
            [Op.like]: `%${req.query.searchText}%`,
          },
        },
        include: {
          model: Album,
          attributes: [
            "id",
            "artistId",
            "name",
            "coverImg",
            "createdAt",
            "updatedAt",
          ],
        },
        include: {
          model: InteractionsArtists
        }
      });
      res.json(result);
    } else {
      const result = await Artist.findAll({
        attributes: ["id", "name", "artistImg", "createdAt", "updatedAt"],
        include: {
          model: Album,
          attributes: [
            "id",
            "artistId",
            "name",
            "coverImg",
            "createdAt",
            "updatedAt",
          ],
        },
        include: {
          model: InteractionsArtists
        }
      });
      res.json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({message: "not found"});
  }
});

artistsRouter.get(`/top/:id`, async (req, res, next) => {
  const result = await Artist.findAll({
    limit: 20,
    include: {
      model: Song,
      attributes: [
        "id",
        "title",
        "artistId",
        "youtubeLink",
        "albumId",
        "length",
        "trackNumber",
        "lyrics",
        "createdAt",
        "updatedAt",
      ],
    },
    include: {
      model: InteractionsArtists,
      where: {
        userId: req.params.id,
        isLike: true
      },
    }
  });
  res.json(result);
});

artistsRouter.get(`/:id`, async (req, res, next) => {
  const result = await Artist.findOne({
    attributes: ["id", "name", "artistImg", "createdAt", "updatedAt"],
    include: {
      model: Song,
      attributes: [
        "id",
        "title",
        "artistId",
        "youtubeLink",
        "albumId",
        "length",
        "trackNumber",
        "lyrics",
        "createdAt",
        "updatedAt",
      ],
    },
  });
  res.json(result);
});

artistsRouter
.post('/interaction', async (req, res) => {
  console.log(req.body);
  try {
    const count = await InteractionsArtists.count({
      where: {
        userId: req.body.userId,
        artistId: req.body.artistId,
      },
    });
    if (count !== 0) {
      const result = await InteractionsArtists.findOne({
        where: {
          userId: req.body.userId,
          artistId: req.body.artistId,
        },
        raw: true
      });
      const updatedInteraction = await InteractionsArtists.update(
        {playCount: result.playCount + 1, isLike: req.body.isLike},
          {where: {
            userId: req.body.userId,
            artistId: req.body.artistId
          }},
      );
      res.json(updatedInteraction);
    } else {
      const newInteraction = await InteractionsArtists.create(req.body);
      res.json(newInteraction);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("bad");
  }
})

artistsRouter.post("/", async (req, res, next) => {
  try {
    const result = await Artist.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).send("bad body");
  }
});

artistsRouter.put("/artist", async (req, res, next) => {});

artistsRouter.delete("/artist/:id", async (req, res) => {});

module.exports = artistsRouter;
