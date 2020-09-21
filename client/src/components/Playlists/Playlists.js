import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Playlist from "./playlist";
import { read } from "../../helpers/ajax";

export default function Playlists() {
  const [playlistsData, setPlaylistsData] = useState(null);

  useEffect(() => {
    read("playlists/top_playlist")
      .then((result) => {
        console.log(result);
        setPlaylistsData(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <div className="main">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="albumWrapper">
          {playlistsData &&
            playlistsData.map((playlistData, index) => {
              return <Playlist key={index} playlistData={playlistData} />;
            })}
        </div>
      </div>
    </>
  );
}
