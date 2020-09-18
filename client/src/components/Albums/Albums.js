import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar'
import './Albums.css'
import NavBar from '../NavBar/NavBar'
import Album from './Album/Album'
import { read } from '../../helpers/ajax'


export default function Albums() {
  const [albumsData, setAlbumsData] = useState(null);
  const [searchText, setSearchText] = useState([]); // search input text

  useEffect(() => {
    read(`/albums/getalbums?searchText=${searchText}`)
    .then(result => {
      console.log(result);
      setAlbumsData(result)
    })
  }, [searchText]);


  useEffect(() => {
    read('albums/getalbums')
    .then(result => {
      console.log(result);
      setAlbumsData(result)
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
      {albumsData &&
        albumsData.map((albumData) => {
        return <Album albumData={albumData} />;
        })}
        </div>
    </div>
  </>
  );
}