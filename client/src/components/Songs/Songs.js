import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Song from "../Song/Song";
import NavBar from "../NavBar/NavBar";
import './Songs.css'
import SideBar from '../SideBar/SideBar'
import { read } from '../../helpers/ajax'

export default function Songs() {
  const [songsData, setSongsData] = useState(null);
  const [searchText, setSearchText] = useState([]); // search input text

  useEffect(() => {
    read('songs/getsongs')
    .then(result => {
      console.log(result);
      setSongsData(result)
    })
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
      <div className="songsWrapper">
        {songsData &&
          songsData.map((songData) => {
            return <Song songsData={songsData} songData={songData} setSongsData={setSongsData} />;
          })}
          </div>
      </div>
    </>
  );
}
