const express = require("express");
const playlistsRouter = express.Router();
const { Playlist, Song, Artist, Album, List_of_songs } = require("../models");

playlistsRouter.get("/top_playlist", async (req, res) => {
  try {
    const result = await Playlist.findAll({
      limit: 20
    })
    res.send(result)
  }catch(err) {
    console.log(err);
  }
});

playlistsRouter.get(`/:id`, async (req, res) => {
  try {
    const result = await Playlist.findOne({
      where: {
        id: req.params.id
      },
      // attributes: ['id', 'name', 'cover_img', 'createdAt', 'updatedAt'],
      include: {
        model: List_of_songs,
        include: {
          model: Song,
        } 
      }
    });
    res.json(result);
  } catch(err) {
    console.log(err);
    res.status(400).send(err)
  }
});

playlistsRouter.post("/addsong", async (req, res) => {
  try {
    const result = await Playlist.create(req.body)
    res.send(result)
  } catch(err){
    console.log(err);
    res.status(400).send(err)
  } 
});

playlistsRouter.post("/add", async (req, res) => {
  try {
    const result = await List_of_songs.create(req.body)
    res.send(result)
  } catch(err){
    console.log(err);
    res.status(400).send(err)
  } 
});

playlistsRouter.put("/playlist", async (req, res, next) => {});

playlistsRouter.delete("/playlist/:id", async (req, res) => {});

module.exports = playlistsRouter;
