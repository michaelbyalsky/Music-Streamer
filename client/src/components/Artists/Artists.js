import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar'
// import './Albums.css'
import NavBar from '../NavBar/NavBar'
import Artist from './Artist/Artist'
import { read } from '../../helpers/ajax'


export default function Albums() {
  const [artistsData, setArtistsData] = useState(null);
  const [searchText, setSearchText] = useState([]); // search input text

  // useEffect(() => {
  //   read(`/artisyts/getalbums?searchText=${searchText}`)
  //   .then(result => {
  //     console.log(result);
  //     setArtistsData(result)
  //   })
  // }, [searchText]);


  useEffect(() => {
    read('artists/getartists')
    .then(result => {
      console.log(result);
      setArtistsData(result)
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
      {artistsData &&
        artistsData.map((artistData) => {
        return <Artist artistData={artistData} />;
        })}
        </div>
    </div>
  </>
  );
}