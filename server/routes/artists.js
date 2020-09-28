const express = require("express");
const Sequelize = require("sequelize");
const artistsRouter = express.Router();
const { Artist, Album, Song, Interactions_Artists } = require("../models");
const { Op } = require("sequelize");

artistsRouter.get("/all", async (req, res, next) => {
  try {
    if (req.query.searchText) {
      console.log("intro");
      const result = await Artist.findAll({
        attributes: ["id", "name", "artist_img", "createdAt", "updatedAt"],
        where: {
          name: {
            [Op.like]: `%${req.query.searchText}%`,
          },
        },
        include: {
          model: Album,
          attributes: [
            "id",
            "artist_id",
            "name",
            "cover_img",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.json(result);
    } else {
      const result = await Artist.findAll({
        attributes: ["id", "name", "artist_img", "createdAt", "updatedAt"],
        include: {
          model: Album,
          attributes: [
            "id",
            "artist_id",
            "name",
            "cover_img",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("data not found");
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
        "artist_id",
        "youtube_link",
        "album_id",
        "length",
        "track_number",
        "lyrics",
        "createdAt",
        "updatedAt",
      ],
    },
    include: {
      model: Interactions_Artists,
      where: {
        user_id: req.params.id,
      },
    }
  });
  console.log(result);
  res.send(result);
});

artistsRouter.get(`/:id`, async (req, res, next) => {
  const result = await Artist.findOne({
    attributes: ["id", "name", "artist_img", "createdAt", "updatedAt"],
    include: {
      model: Song,
      attributes: [
        "id",
        "title",
        "artist_id",
        "youtube_link",
        "album_id",
        "length",
        "track_number",
        "lyrics",
        "createdAt",
        "updatedAt",
      ],
    },
  });
  console.log(result);
  res.send(result);
});

artistsRouter
.post('/interaction', async (req, res) => {
  console.log(req.body);
  try {
    const count = await Interactions_Artists.count({
      where: {
        user_id: req.body.user_id,
        album_id: req.body.song_id,
      },
    });
    console.log(count);
    if (count !== 0) {
      const result = await Interactions_Artists.findOne({
        where: {
          user_id: req.body.user_id,
          album_id: req.body.song_id,
        },
        raw: true
      });
      const updatedInteraction = await Interactions_Artists.update(
        {play_count: result.play_count + 1},
          {where: {
            user_id: req.body.user_id,
            album_id: req.body.song_id
          }},
      );
      res.send(updatedInteraction);
    } else {
      console.log(req.body);
      const newInteraction = await Interactions_Artists.create(req.body);
      res.send(newInteraction);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("bad");
  }
})

artistsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await Artist.create(req.body);
    res.send(result);
  } catch (err) {
    res.status(400).send("bad body");
  }
});

artistsRouter.put("/artist", async (req, res, next) => {});

artistsRouter.delete("/artist/:id", async (req, res) => {});

module.exports = artistsRouter;
