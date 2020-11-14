const express = require("express");
const Sequelize = require("sequelize");
const searchRouter = express.Router();
const { Artist, Album, Song, Playlist } = require("../../models");
const { Op } = require("sequelize");
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: process.env.SEARCH_ID,
  },
  auth: {
    username: process.env.SEARCH_USER,
    password: process.env.SEARCH_PASS,
  },
});

searchRouter.get("/", async (req, res) => {
  try {
    const allData = await client.search({
      index: "spotify",
      body: {
        query: {
          match_all: {},
        },
      },
    });
    res.json(allData);
  } catch (err) {
    res.json(err);
  }
});

searchRouter.get("/songs", async (req, res) => {
    const { search, all } = req.query;
    let size = 3;
    if (all === "all") {
      size = undefined;
    }
    try {
      const songs = await client.search({
        index: "song",
        body: {
          size,
          query: {
            wildcard: {
              title: {
                value: `*${search}`,
              },
            },
          },
        },
      });
      let results = songs.body.hits.hits.map((song) => {
        return {id: song._source.id, name: song._source.title, artistId: song._source.artistId}
    })
      res.json(results);
    } catch (err) {
      res.json(err.message);
    }
})


searchRouter.get("/albums", async (req, res) => {
  const { search, all } = req.query;
  let size = 3;
  if (all === "all") {
    size = undefined;
  }
  try {
    const albums = await client.search({
      index: "album",
      body: {
          size,
        query: {
          wildcard: {
            name: {
              value: `*${search}`,
            },
          },
        },
      },
    });
    let results = albums.body.hits.hits.map((album) => {
        return {id: album._source.id, name: album._source.name}
    })
    res.json(results);
  } catch (err) {
    res.json(err.message);
  }
});


searchRouter.get("/artists", async (req, res) => {
    const { all, search } = req.query;
    let size = 3;
    if (all === "all") {
      size = undefined;
    }
    try {
      const artists = await client.search({
        index: "artist",
        body: {
            size,
          query: {
            wildcard: {
              name: {
                value: `*${search}`,
              },
            },
          },
        },
      });
      let results = artists.body.hits.hits.map((artist) => {
        return {id: artist._source.id, name: artist._source.name}
    })
      res.json(results);
    } catch (err) {
      res.json(err);
    }
  });

  searchRouter.get("/playlists", async (req, res) => {
    const { all, search } = req.query;
    let size = 3;
    if (all === "all") {
      size = undefined;
    }
    try {
      const playlists = await client.search({
        index: "playlist",
        body: {
            size,
          query: {
            wildcard: {
              name: {
                value: `*${search}`,
              },
            },
          },
        },
      });
      let results = playlists.body.hits.hits.map((playlist) => {
        return {id: playlist._source.id, name: playlist._source.name}
    })
      res.json(results)
    } catch (err) {
      console.error(err);
    }
  });


//   searchRouter.get("/songs", async (req, res) => {
//     try {
//       const { body: count1 } = await client.count({ index: "spotify" });
//       console.log(count1);
//       const allSongs = await Song.findAll({
//         include: [
//           {
//             model: Artist,
//             attributes: ["name"],
//           },
//           {
//             model: Album,
//             attributes: ["name"],
//           },
//         ],
//       });
//       console.log(allSongs);
//       const body = allSongs.flatMap((doc) => [
//         { index: { _index: "spotify",  _type: "song" } },
//         doc,
//       ]);
//       console.log(body);
//       const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//       if (bulkResponse.errors) {
//         return res.json(bulkResponse.errors);
//       }
//       const { body: count } = await client.count({ index: "spotify" });
//       res.send(count);
//     } catch (e) {
//       res.json({ error: e.message });
//     }
//   });

//   searchRouter.get("/albums", async (req, res) => {
//     try {
//       const { body: count1 } = await client.count({ index: "album" });
//       const allAlbums = await Album.findAll({
//         include: [
//           {
//             model: Artist,
//             attributes: ["name"],
//           },
//         ],
//       });
//       const body = allAlbums.flatMap((doc) => [
//         { index: { _index: "album",  _type: "album" } },
//         doc,
//       ]);
//       const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//       console.log(bulkResponse);
//       if (bulkResponse.errors) {
//         return res.json(bulkResponse.errors);
//       }
//       const { body: count } = await client.count({ index: "spotify" });
//       console.log(count);
//       res.send(count);
//     } catch (e) {
//       res.json({ error: e.message });
//     }
//   });
  searchRouter.get("/artist-create", async (req, res) => {
    try {
      const { body: count1 } = await client.count({ index: "artist" });
      const allArtists = await Artist.findAll({
        include: [
          {
            model: Album,
            attributes: ["name"],
          },
        ],
      });
      const body = allArtists.flatMap((doc) => [
          { index: { _index: "artist",  _type: "artist" } },
          doc,
        ]);
      const { body: bulkResponse } = await client.bulk({ refresh: true, body });
      console.log(bulkResponse);
      if (bulkResponse.errors) {
        return res.json(bulkResponse.errors);
      }
      const { body: count } = await client.count({ index: "artist" });
      console.log(count);
      res.send(count);
    } catch (e) {
      res.json({ error: e.message });
    }
  });
//   searchRouter.get("/playlists", async (req, res) => {
//     try {
//       const { body: count1 } = await client.count({ index: "playlist" });
//       const allPlaylists = await Playlist.findAll({});
//       const body = allPlaylists.flatMap((doc) => [
//         { index: { _index: "playlist",  _type: "playlist" } },
//         doc,
//       ]);
//       const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//       console.log(bulkResponse);
//       if (bulkResponse.errors) {
//         return res.json(bulkResponse.errors);
//       }
//       const { body: count } = await client.count({ index: "playlist" });
//       console.log(count);
//       res.send(count);
//     } catch (e) {
//       res.json({ error: e.message });
//     }
//   });

module.exports = searchRouter;
