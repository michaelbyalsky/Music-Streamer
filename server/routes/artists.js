const express = require('express')
const Sequelize = require('sequelize')
const artistsRouter = express.Router()
const { Artist, Album, Song } = require('../models'); 
const { Op } = require('sequelize')

artistsRouter
    .get("/all", async (req, res, next) => {
      try {
        if (req.query.searchText) {
          console.log("intro");
        const result = await Artist.findAll({
          attributes: ['id', 'name', 'artist_img', 'createdAt', 'updatedAt'],
          where: {
            name: {
              [Op.like]: `%${req.query.searchText}%`
            } 
          },
          include: {
            model: Album,
            attributes: ['id', 'artist_id', 'name', 'cover_img', 'createdAt', 'updatedAt']
          }
        }) 
        res.json(result)
        } else {
          const result = await Artist.findAll({
            attributes: ['id', 'name', 'artist_img', 'createdAt', 'updatedAt'],
            include: {
              model: Album,
            attributes: ['id', 'artist_id', 'name', 'cover_img', 'createdAt', 'updatedAt']
            },
          })
          res.json(result)
        }
      } catch(err) {
        console.log(err);
        res.status(400).send("data not found")
      } 
  });
  

  artistsRouter
.get(`/:id`, async (req, res, next) => {
  const result = await Artist.findOne({
    attributes: ['id', 'name', 'artist_img', 'createdAt', 'updatedAt'],
    where: {
      id: req.params.id
    },
    include: {
      model: Song,
      attributes: ['id', 'title', 'artist_id', 'youtube_link', 'album_id', 'length', 'track_number', 'lyrics', 'createdAt', 'updatedAt'] 
    }
  }) 
  res.send(result)
  });

  artistsRouter
  .post("/", async (req, res, next) => {
    try {
      console.log(req.body);
      const result = await Artist.create(req.body)
      res.send(result)
    } catch(err) {
      res.status(400).send("bad body")
    }
  });

  artistsRouter
  .put("/artist", async (req, res, next) => {
   
  });
  
  artistsRouter
  .delete("/artist/:id", async (req, res) => {
    
  });
  
  module.exports = artistsRouter
  
  