import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SideBar from "../SideBar/SideBar";
import { read } from "../../helpers/ajax";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import Artist from "../Artists/Artist/Artist";
import Song from "../Song/Song";
import Album from "../Albums/Album/Album";
import Playlist from "../Playlists/playlist";

const useStyles = makeStyles({
  main: {
    display: "grid",
    gridTemplateColumns: "5% 95%",
  },
  root: {
    flexGrow: 1,
  },
  content: {
    marginTop: "1rem",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gridAutoRows: "auto",
    gridGap: "1rem"
  }
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();
  const [songsData, setSongsData] = useState(null);
  const [albumsData, setAlbumsData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkValidation = () => {
    const token = Cookies.get("token");
    if (!token) {
      return history.push("./");
    }
    setUserId(Cookies.get("id"));
  };

  const getSongs = () => {
    read(`songs/top/${userId}`).then((result) => {
      if (!Array.isArray(result)) {
        let temp = []
        temp.push(result);
        console.log(temp);
        setSongsData(temp)  
      } else {
        setSongsData(result);
      }
      setArtistsData(null)
      setAlbumsData(null)
      setPlaylistsData(null)
    });
  };

  const getAlbums = () => {
    read(`albums/top/${userId}`).then((result) => {
      console.log(result);
      if (!Array.isArray(result)) {
        let temp = []
        temp.push(result);
        console.log(temp);
        setAlbumsData(temp)  
      } else {
        setAlbumsData(result);
      }
      setArtistsData(null)
      setSongsData(null)
      setPlaylistsData(null)
    });
  };

  const getArtists = () => {
    read(`artists/top/${userId}`).then((result) => {
      if (!Array.isArray(result)) {
        let temp = []
        temp.push(result);
        console.log(temp);
        setArtistsData(temp)  
      } else {
        setArtistsData(result);
      }
      setAlbumsData(null)
      setSongsData(null)
      setPlaylistsData(null)
    });
  };

  const getPlaylists = () => {
    read(`playlists/top/${userId}`).then((result) => {
      if (!Array.isArray(result)) {
        let temp = []
        temp.push(result);
        console.log(temp);
        setPlaylistsData(temp)  
      } else {
        setPlaylistsData(result);
      }
      setArtistsData(null)
      setSongsData(null)
      setAlbumsData(null)
    });
  };

  useEffect(() => {
    checkValidation();
  }, []);

  return (
    <div className={classes.main}>
      <SideBar />
      <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Songs" onClick={getSongs} />
          <Tab label="Albums" onClick={getAlbums} />
          <Tab label="Artists" onClick={getArtists} />
          <Tab label="Playlists" onClick={getPlaylists} />
        </Tabs>
      </Paper>
      <div className={classes.content}>
        {songsData &&
      <div className={classes.card}>
          {songsData.map((songData, i) => {
            return (
              <div key={i}>
                <Song songData={songData} />
              </div>
            );
          })}
      </div>
}
        {albumsData &&
      <div className={classes.card}>
          {albumsData.map((albumData, i) => {
            return (
              <div key={i}>
                <Album
                  albumData={albumData}
                  albumsData={albumsData}
                  setAlbumsData={setAlbumsData}
                />
              </div>
            );
          })}
      </div>
      }
        {artistsData &&
      <div className={classes.card}>
          {artistsData.map((artistData, i) => {
            return (
              <div key={i}>
                <Artist artistData={artistData} />
              </div>
            );
          })}
      </div>
}
        {playlistsData &&
      <div className={classes.card}>
          {playlistsData.map((playlistData, i) => {
            return (
              <div key={i}>
                <Playlist playlistData={playlistData} />
              </div>
            );
          })}
      </div>
}
      </div>
      </div>
    </div>
  );
}
