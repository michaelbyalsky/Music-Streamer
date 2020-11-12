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
    const { search } = req.query;
    let size = 3;
    try {
      const albums = await client.search({
        index: "album",
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
      res.json(albums);
    } catch (err) {
      res.json(err.message);
    }
})


searchRouter.get("/albums", async (req, res) => {
  const { search } = req.query;
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
            title: {
              value: `*${search}`,
            },
          },
        },
      },
    });
    res.json(albums);
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
      const artists = client.search({
        index: "artist",
        body: {
          size,
          query: {
            wildcard: {
              name: {
                value: `*${search}*`,
              },
            },
          },
        },
      });
      res.json(artists);
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
      const playlists = client.search({
        index: "playlist",
        body: {
          size,
          query: {
            wildcard: {
              name: {
                value: `*${search}*`,
              },
            },
          },
        },
      });
      res.json(playlists)
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
//   searchRouter.get("/artist", async (req, res) => {
//     try {
//       const { body: count1 } = await client.count({ index: "artist" });
//       const allAlbums = await Artist.findAll({
//         include: [
//           {
//             model: Album,
//             attributes: ["name"],
//           },
//         ],
//       });
//       const body = allAlbums.flatMap((doc) => [
//         { index: { _index: "artists",  _type: "artist" } },
//         doc,
//       ]);
//       const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//       console.log(bulkResponse);
//       if (bulkResponse.errors) {
//         return res.json(bulkResponse.errors);
//       }
//       const { body: count } = await client.count({ index: "artist" });
//       console.log(count);
//       res.send(count);
//     } catch (e) {
//       res.json({ error: e.message });
//     }
//   });
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
