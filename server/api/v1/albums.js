const express = require("express");
const Sequelize = require("sequelize");
const { Album, Artist, Song, InteractionsAlbums } = require("../../models");
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
          model: InteractionsAlbums,
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
        include: {
          model: InteractionsAlbums,
        },
      });
      res.json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("data not found");
  }
});

albumsRouter.post("/interaction", async (req, res) => {
  console.log(req.body);
  try {
    const count = await InteractionsAlbums.count({
      where: {
        userId: req.body.userId,
        albumId: req.body.userId,
      },
    });
    if (count !== 0) {
      const result = await InteractionsAlbums.findOne({
        where: {
          userId: req.body.userId,
          albumId: req.body.albumId,
        },
        raw: true,
      });
      const updatedInteraction = await InteractionsAlbums.update(
        { playCount: result.playCount + 1, isLike: req.body.isLike },
        {
          where: {
            userId: req.body.userId,
            albumId: req.body.albumId,
          },
        }
      );
    } else {
      const newInteraction = await InteractionsAlbums.create(req.body);
      res.json(newInteraction);
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
  res.json(result);
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
      model: InteractionsAlbums,
      where: {
        user_id: req.params.id,
      },
    },
  });
  res.json(result);
});

albumsRouter.post("/addalbum", async (req, res, next) => {
  try {
    const result = await Album.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).send("bad body");
  }
});

albumsRouter.put("/album", async (req, res, next) => {
  try {
    const result = await Album.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).send("bad body");
  }
});

albumsRouter.delete("/album/:id", async (req, res, next) => {});

module.exports = albumsRouter;
