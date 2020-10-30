const express = require("express");
const Sequelize = require("sequelize");
const { Album, Artist, Song, Interactions_Albums } = require("../../models");
const albumsRouter = express.Router();
const Op = Sequelize.Op;

albumsRouter.get("/all", async (req, res, next) => {
  try {
    if (req.query.searchText) {
      const result = await Album.findAll({
        attributes: [
          "id",
          "artistId",
          "name",
          "coverImg",
          "createdAt",
          "updatedAt",
        ],
        where: {
          name: {
            [Op.like]: `%${req.query.searchText}%`,
          },
        },
        include: {
          model: Artist,
          attributes: ["name", "artistImg", "createdAt", "updatedAt"],
        },
        include: {
          model: Interactions_Albums,
        },
      });
      res.json(result);
    } else {
      const result = await Album.findAll({
        attributes: [
          "id",
          "artist_id",
          "name",
          "coverImg",
          "createdAt",
          "updatedAt",
        ],
        include: {
          model: Artist,
          attributes: ["id", "name", "artist_img", "createdAt", "updatedAt"],
        },
        // include: {
        //   model: Interactions_Albums,
        // },
      });
      res.json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("data not found");
  }
});

albumsRouter.post("/interaction", async (req, res) => {
  try {
    const count = await Interactions_Albums.count({
      where: {
        user_id: req.body.user_id,
        album_id: req.body.album_id,
      },
    });
    if (count !== 0) {
      const result = await Interactions_Albums.findOne({
        where: {
          user_id: req.body.user_id,
          album_id: req.body.album_id,
        },
        raw: true,
      });
      const updatedInteraction = await Interactions_Albums.update(
        { play_count: result.play_count + 1 },
        {
          where: {
            user_id: req.body.user_id,
            album_id: req.body.album_id,
          },
        }
      );
    } else {
      const newInteraction = await Interactions_Albums.create(req.body);
      res.send(newInteraction);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("bad");
  }
});

albumsRouter.get(`/:id`, async (req, res, next) => {
  const result = await Album.findOne({
    attributes: [
      "id",
      "artistId",
      "name",
      "coverImg",
      "createdAt",
      "updatedAt",
    ],
    where: {
      id: req.params.id,
    },
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
      include: {
        model: Artist,
        attributes: ["id", "name", "artistImg"],
      },
    },
  });
  res.send(result);
});

albumsRouter.get(`/top/:id`, async (req, res, next) => {
  const result = await Album.findAll({
    attributes: [
      "id",
      "artistId",
      "name",
      "coverImg",
      "createdAt",
      "updatedAt",
    ],
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
      include: {
        model: Artist,
        attributes: ["id", "name", "artistImg"],
      },
    },
    include: {
      model: Interactions_Albums,
      where: {
        user_id: req.params.id,
      },
    },
  });
  res.send(result);
});

albumsRouter.post("/addalbum", async (req, res, next) => {
  try {
    const result = await Album.create(req.body);
    res.send(result);
  } catch (err) {
    res.status(400).send("bad body");
  }
});

albumsRouter.put("/album", async (req, res, next) => {
  try {
    const result = await Album.create(req.body);
    res.send(result);
  } catch (err) {
    res.status(400).send("bad body");
  }
});

albumsRouter.delete("/album/:id", async (req, res, next) => {});

module.exports = albumsRouter;
