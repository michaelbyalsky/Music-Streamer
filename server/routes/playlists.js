const express = require("express");
const playlistsRouter = express.Router();
const { Playlist, Song, Artist, Album, List_of_songs, Interactions_Playlists } = require("../models");

playlistsRouter.get("/top_playlist", async (req, res) => {
  try {
    const result = await Playlist.findAll({
      limit: 20,
    });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

playlistsRouter.get(`/top/:id`, async (req, res, next) => {
  const result = await Playlist.findAll({
    attributes: [
      "id",
      "artist_id",
      "name",
      "cover_img",
      "createdAt",
      "updatedAt",
    ],
    include: {
      model: Interactions_Playlists,
      where: {
        user_id: req.params.id,
      },
    }
  });
  console.log(result);
  res.send(result);
});

playlistsRouter.get(`/:id`, async (req, res) => {
  try {
    const result = await Playlist.findOne({
      raw: true,
      nest: true,
      where: {
        id: req.params.id,
      },
      // attributes: ['id', 'name', 'cover_img', 'createdAt', 'updatedAt'],
      include: {
        model: List_of_songs,
        include: {
          model: Song,
        },
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

playlistsRouter
.post('/interaction', async (req, res) => {
  console.log(req.body);
  try {
    const count = await Interactions_Playlists.count({
      where: {
        user_id: req.body.user_id,
        album_id: req.body.song_id,
      },
    });
    console.log(count);
    if (count !== 0) {
      const result = await Interactions_Playlists.findOne({
        where: {
          user_id: req.body.user_id,
          album_id: req.body.song_id,
        },
        raw: true
      });
      const updatedInteraction = await Interactions_Playlists.update(
        {play_count: result.play_count + 1},
          {where: {
            user_id: req.body.user_id,
            album_id: req.body.song_id
          }},
      );
      res.send(updatedInteraction);
    } else {
      console.log(req.body);
      const newInteraction = await Interactions_Playlists.create(req.body);
      res.send(newInteraction);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("bad");
  }
})

playlistsRouter.post("/addsong", async (req, res) => {
  try {
    const result = await Playlist.create(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

playlistsRouter.post("/add", async (req, res) => {
  try {
    const result = await List_of_songs.create(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

playlistsRouter.put("/playlist", async (req, res, next) => {});

playlistsRouter.delete("/playlist/:id", async (req, res) => {});

module.exports = playlistsRouter;
