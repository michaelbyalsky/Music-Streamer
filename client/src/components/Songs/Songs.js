import React, { useState, useEffect } from "react";
import Song from "../Song/Song";
import './Songs.css'
import SideBar from '../SideBar/SideBar'
import { read } from '../../helpers/ajax'

export default function Songs() {
  const [songsData, setSongsData] = useState(null);

  useEffect(() => {
    read('/api/v1/songs/all')
    .then(result => {
      console.log(result);
      setSongsData(result)
    }).catch(err => {
      console.error(err)
    })
  }, []);

  return (
    <>
   
      <div className="main">
      <div className="sideBar" > 
      <SideBar />
      </div>
      <div className="songsWrapper">
        {songsData &&
          songsData.map((songData) => {
            return <div key={songData.song_name}><Song songsData={songsData} songData={songData} setSongsData={setSongsData} /></div>;
          })}
          </div>
      </div>
    </>
  );
}
