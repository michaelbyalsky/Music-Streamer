import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import Playlist from './playlist'
import { read } from '../../helpers/ajax'


export default function Playlists() {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [searchText, setSearchText] = useState([]); // search input text

  // useEffect(() => {
  //   read(`/albums/getalbums?searchText=${searchText}`)
  //   .then(result => {
  //     console.log(result);
  //     setPlaylistsData(result)
  //   })
  // }, [searchText]);


  useEffect(() => {
    read('playlists/top_playlist')
    .then(result => {
      console.log(result);
      setPlaylistsData(result)
    })
    .catch(err => {
      console.log(err.message);
    })
  }, []);
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
    <div className="albumWrapper">
      {playlistsData &&
        playlistsData.map((playlistData) => {
        return <Playlist playlistData={playlistData} />;
        })}
        </div>
    </div>
  </>
  );
}