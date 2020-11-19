import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import "./Albums.css";
import Album from "./Album/Album";
import { read } from "../../helpers/ajax";

export default function Albums() {
  const [albumsData, setAlbumsData] = useState(null);

  useEffect(() => {
    read("/api/v1/albums/all")
      .then((result) => {
        setAlbumsData(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <div className="main">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="albumWrapper">
          {albumsData &&
            albumsData.map((albumData, i) => {
              return (
                <div key={i}>
                  <Album
                    albumsData={albumsData}
                    setAlbumsData={setAlbumsData}
                    albumData={albumData}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
