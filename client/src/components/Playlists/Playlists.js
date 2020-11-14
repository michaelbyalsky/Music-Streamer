import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Playlist from "./playlist";
import { read } from "../../helpers/ajax";

export default function Playlists() {
  const [playlistsData, setPlaylistsData] = useState(null);

  useEffect(() => {
    read("/api/v1/playlists/top_playlist")
      .then((result) => {
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
              return <Playlist key={index} playlistsData={playlistsData} setPlaylistsData={setPlaylistsData} playlistData={playlistData} />;
            })}
        </div>
      </div>
    </>
  );
}
