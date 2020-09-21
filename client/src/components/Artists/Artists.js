import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar'
// import './Albums.css'
import NavBar from '../NavBar/NavBar'
import Artist from './Artist/Artist'
import { read } from '../../helpers/ajax'


export default function Albums() {
  const [artistsData, setArtistsData] = useState(null);
  const [searchText, setSearchText] = useState([]); // search input text

  useEffect(() => {
    read('artists/all')
    .then(result => {
      setArtistsData(result)
    })
  }, []);
  return (
    <>

    <div className="main">
    <div className="sideBar" > 
    <SideBar />
    </div>
    <div className="albumWrapper">
      {artistsData &&
        artistsData.map((artistData, index) => {
        return <Artist key={index} artistData={artistData} />;
        })}
        </div>
    </div>
  </>
  );
}