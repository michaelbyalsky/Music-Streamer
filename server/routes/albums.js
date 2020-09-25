const express = require('express');
const Sequelize = require('sequelize')
const { Album, Artist, Song } = require('../models');
const albumsRouter = express.Router()
const Op = Sequelize.Op;

albumsRouter
.get("/all", async (req, res, next) => {
  try {
    if (req.query.searchText) {
      console.log("intro");
    const result = await Album.findAll({
      attributes: ['id', 'artist_id', 'name', 'cover_img', 'createdAt', 'updatedAt'],
      where: {
        name: {
          [Op.like]: `%${req.query.searchText}%`
        } 
      },
      include: {
        model: Artist,
        attributes: ['name', 'artist_img', 'createdAt', 'updatedAt']
      }
    }) 
    res.json(result)
    } else {
      const result = await Album.findAll({
        attributes: ['id', 'artist_id', 'name', 'cover_img', 'createdAt', 'updatedAt'],
        include: {
          model: Artist,
          attributes: ['id', 'name', 'artist_img', 'createdAt', 'updatedAt'],
        },
      })
      res.json(result)
    }
  } catch(err) {
    console.log(err);
    res.status(400).send("data not found")
  } 
  
  });

  albumsRouter
  .get(`/:id`, async (req, res, next) => {
    const result = await Album.findOne({
      attributes: ['id', 'artist_id', 'name', 'cover_img', 'createdAt', 'updatedAt'],
      where: {
        id: req.params.id
      },
      include: {
        model: Artist,
        attributes: ['id', ['name', 'artist_name'], 'artist_img'], 
        include: {
          model: Song,
          attributes: [['id', 'song_id'], 'title', 'artist_id', 'youtube_link', 'album_id', 'length', 'track_number', 'lyrics', 'createdAt', 'updatedAt'] 
        }
      }
    }) 
    res.send(result)
  });

  albumsRouter
  .post("/addalbum", async (req, res, next) => {
    try {
      console.log(req.body);
      const result = await Album.create(req.body)
      res.send(result)
    } catch(err) {
      res.status(400).send("bad body")
    }
    
  });

  
  albumsRouter
  .put("/album", async (req, res, next) => {
    try {
      console.log(req.body);
      const result = await Album.create(req.body)
      res.send(result)
    } catch(err) {
      res.status(400).send("bad body")
    }
  });


  albumsRouter
  .delete("/album/:id", async (req, res, next) => {
    
  });
  
  module.exports = albumsRouter