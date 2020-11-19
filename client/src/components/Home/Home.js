import React, { useState, useEffect } from "react";
import Song from "../Song/Song";
import "./Home.css";
import SideBar from "../SideBar/SideBar";
import { read } from "../../helpers/ajax";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Album from "../Albums/Album/Album";
import Artist from "../Artists/Artist/Artist";
import Playlist from "../Playlists/playlist";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import mixpanel from "mixpanel-browser";

export default function Home() {
  const history = useHistory();
  const [songsData, setSongsData] = useState(null);
  const [albumsData, setAlbumsData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
  };

  const getSongs = () => {
    read("/api/v1/songs/all")
      .then((result) => {
        setSongsData(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAlbums = () => {
    read("/api/v1/albums/all")
      .then((result) => {
        setAlbumsData(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getArtists = () => {
    read("/api/v1/artists/all")
      .then((result) => {
        setArtistsData(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPlaylists = () => {
    read("/api/v1/playlists/top_playlist")
      .then((result) => {
        setPlaylistsData(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    mixpanel.init("dca95b214ba0460f962ec440eeea5fc8");
    mixpanel.track("App Launched");
    getAlbums();
    getSongs();
    getArtists();
    getPlaylists();
  }, []);

  return (
    <>
      <div className="main">
        <div className="sideBar">
          <SideBar />
        </div>
        <div>
          <div className="">
            <h2>Specialy For You</h2>
            {songsData && (
              <Carousel responsive={responsive}>
                {songsData.map((songData) => {
                  return (
                    <div>
                      <Song
                        songsData={songsData}
                        songData={songData}
                        setSongsData={setSongsData}
                      />
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
          <div className="">
            <h2>Your Favorite Albums</h2>
            {albumsData && (
              <Carousel responsive={responsive}>
                {albumsData.map((albumData) => {
                  return (
                    <div>
                      <Album
                        albumsData={albumsData}
                        setAlbumsData={setAlbumsData}
                        albumData={albumData}
                      />
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
          <div className="">
            <h2>Your Favorite Artists</h2>
            {artistsData && (
              <Carousel responsive={responsive}>
                {artistsData.map((artistData) => {
                  return (
                    <div>
                      <Artist
                        artistsData={artistsData}
                        setArtistsData={setArtistsData}
                        artistData={artistData}
                      />
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
          <div className="">
            <h2>Your Favorite Playlists</h2>
            {playlistsData && (
              <Carousel responsive={responsive}>
                {playlistsData.map((playlistData) => {
                  return (
                    <div>
                      <Playlist
                        playlistsData={playlistsData}
                        setPlaylistsData={setPlaylistsData}
                        playlistData={playlistData}
                      />
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
