import React, { useState, useEffect } from "react";
import Song from "../Song/Song";
import './Home.css'
import SideBar from '../SideBar/SideBar'
import { read } from '../../helpers/ajax'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Album from '../Albums/Album/Album'
import Artist from '../Artists/Artist/Artist'
import Playlist from '../Playlists/playlist'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Home() {
  const history = useHistory()
  const [songsData, setSongsData] = useState(null);
  const [albumsData, setAlbumsData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
  };

  const checkValidation = () => {
    const token = Cookies.get('token')
    console.log(token);
    if(!token) {
      console.log('hello');
      history.push('./')
    }
    return  
  }

  const getSongs = () => {
    read('songs/all')
    .then(result => {
      setSongsData(result)
    })
  }

  const getAlbums = () => {
    read('albums/all')
    .then(result => {
      console.log(result);
      setAlbumsData(result)
    })  
  }

  const getArtists = () => {
    read('artists/all')
    .then(result => {
      setArtistsData(result)
    }) 
  }

  const getPlaylists = () => {
    read('playlists/top_playlist')
    .then(result => {
      setPlaylistsData(result)
    }) 
  }

  useEffect(() => {
    checkValidation();
    getAlbums();
    getSongs();
    getArtists();
    getPlaylists();
  }, []);



  return (
    <>
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
              return <div><Album albumsData={albumsData} setAlbumsData={setAlbumsData} albumData={albumData} /></div>;
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
