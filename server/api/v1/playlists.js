const express = require("express");
const playlistsRouter = express.Router();
const {
  Playlist,
  Song,
  Artist,
  Album,
  ListOfSongs,
  InteractionsPlaylists,
  Interaction,
} = require("../../models");

playlistsRouter.get("/top_playlist", async (req, res) => {
  try {
    const result = await Playlist.findAll({
      include: {
        model: InteractionsPlaylists,
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

playlistsRouter.get(`/top/:id`, async (req, res, next) => {
  const result = await Playlist.findAll({
    include: {
      model: InteractionsPlaylists,
      where: {
        userId: req.params.id,
        isLike: true,
      },
    },
  });
  res.json(result);
});

playlistsRouter.get(`/:id`, async (req, res) => {
  try {
    const result = await Playlist.findOne({
      where: {
        id: req.params.id,
      },
      // attributes: ['id', 'name', 'cover_img', 'createdAt', 'updatedAt'],
      include: {
        model: ListOfSongs,
        include: {
          model: Song,
          include: {
            model: Interaction,
          },
        },
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

playlistsRouter.post("/interaction", async (req, res) => {
  try {
    const count = await InteractionsPlaylists.count({
      where: {
        userId: req.body.userId,
        playlistId: req.body.playlistId,
      },
    });
    if (count !== 0) {
      const result = await InteractionsPlaylists.findOne({
        where: {
          userId: req.body.userId,
          playlistId: req.body.playlistId,
        },
        raw: true,
      });
      const updatedInteraction = await InteractionsPlaylists.update(
        { playCount: result.playCount + 1 },
        {
          where: {
            userId: req.body.userId,
            playlistId: req.body.playlistId,
          },
        }
      );
      res.json(updatedInteraction);
    } else {
      const newInteraction = await InteractionsPlaylists.create(req.body);
      res.json(newInteraction);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("bad");
  }
});

playlistsRouter.post("/add", async (req, res) => {
  try {
    const result = await Playlist.create(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

playlistsRouter.post("/addsong", async (req, res) => {
  const data = {
    songId: req.body.songId,
    playlistId: Number(req.body.playlistId),
  };
  try {
    const result = await ListOfSongs.create(data);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

playlistsRouter.put("/playlist", async (req, res, next) => {});

playlistsRouter.delete("/playlist/:id", async (req, res) => {});

module.exports = playlistsRouter;
