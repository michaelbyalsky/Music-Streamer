import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Song from "../Song/Song";
import NavBar from "../NavBar/NavBar";
import './Home.css'
import SideBar from '../SideBar/SideBar'
import { read } from '../../helpers/ajax'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Album from '../Albums/Album/Album'
import Artist from '../Artists/Artist/Artist'
import Playlist from '../Playlists/playlist'

export default function Home() {
  const [songsData, setSongsData] = useState(null);
  const [searchText, setSearchText] = useState([]); // search input text
  const [albumsData, setAlbumsData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
  };

  const getSongs = () => {
    read('songs/getsongs')
    .then(result => {
      console.log(result);
      setSongsData(result)
    })
  }

  const getAlbums = () => {
    read('albums/getalbums')
    .then(result => {
      console.log(result);
      setAlbumsData(result)
    }) 
  }

  const getArtists = () => {
    read('artists/getartists')
    .then(result => {
      console.log(result);
      setArtistsData(result)
    }) 
  }

  const getPlaylists = () => {
    read('playlists/top_playlist')
    .then(result => {
      console.log(result);
      setPlaylistsData(result)
    }) 
  }

  useEffect(() => {
    getAlbums();
    getSongs();
    getArtists();
    getPlaylists();
  }, []);

  useEffect(() => {
    read(`songs/getsongs?searchText=${searchText}`)
    .then(result => {
      console.log(result);
      setSongsData(result)
    })
  }, [searchText]);

  return (
    <>
      <NavBar  
      searchText={searchText}
      setSearchText={setSearchText}
      />
      <div className="main">
      <div className="sideBar" > 
      <SideBar />
      </div>
      <div>
      <div className="">
      <h2>Specialy For You</h2>
        {songsData &&
        <Carousel responsive={responsive}>
          {songsData.map((songData) => {
              return <div><Song songsData={songsData} songData={songData} setSongsData={setSongsData} /></div>;
            })}
            </Carousel>
         }
         </div>
         <div className="">
             <h2>Your Favorite Albums</h2>
        {albumsData &&
        <Carousel responsive={responsive}>
          {albumsData.map((albumData) => {
              return <div><Album albumData={albumData} /></div>;
            })}
            </Carousel>
         }
         </div>
         <div className="">
             <h2>Your Favorite Artists</h2>
        {artistsData &&
        <Carousel responsive={responsive}>
          {artistsData.map((artistData) => {
              return <div><Artist artistData={artistData} /></div>;
            })}
            </Carousel>
         }
         </div>
         <div className="">
             <h2>Your Favorite Playlists</h2>
        {playlistsData &&
        <Carousel responsive={responsive}>
          {playlistsData.map((playlistData) => {
              return <div><Playlist playlistData={playlistData} /></div>;
            })}
            </Carousel>
         }
         </div>
         </div>
      </div>
    </>
  );
}
