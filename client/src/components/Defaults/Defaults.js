import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SideBar from "../SideBar/SideBar";
import { read } from '../../helpers/ajax'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import Artist from '../Artists/Artist/Artist';
import Song from '../Song/Song';
import Album from '../Albums/Album/Album';
import Playlist from '../Playlists/playlist';

const useStyles = makeStyles({
  main: {
    display: "grid",
    gridTemplateColumns: "5% 95%",
  },
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory()
  const [songsData, setSongsData] = useState(null);
  const [albumsData, setAlbumsData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkValidation = () => {
    const token = Cookies.get('token')
    if(!token) {
      history.push('./')
    }
    return  
  }

  const getSongs = () => {
    read('songs/top')
    .then(result => {
      setSongsData(result)
    })
  }

  const getAlbums = () => {
    read('albums/top')
    .then(result => {
      setAlbumsData(result)
    })
  }

  const getArtists = () => {
    read('artists/top')
    .then(result => {
      setArtistsData(result)
    }) 
  }

  const getPlaylists = () => {
    read('playlists/top_playlist')
    .then(result => {
      setPlaylistsData(result)
    }) 
  }

  useEffect(() => {
    checkValidation();
  }, []);

  return (
    <div className={classes.main}>
      <SideBar />
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
      <div className="albumWrapper">
      {songsData &&
        songsData.map((songData, i) => {
        return <div key={i}><Song songData={songData} /></div>;
        })}
        </div>
      <div className="albumWrapper">
      {albumsData &&
        albumsData.map((albumData, i) => {
        return <div key={i}><Album albumData={albumData} albumsData={albumsData} setAlbumsData={setAlbumsData} /></div>;
        })}
        </div>
      <div className="albumWrapper">
      {artistsData &&
        artistsData.map((artistData, i) => {
        return <div key={i}><Artist artistData={artistData} /></div>;
        })}
        </div>
      <div className="albumWrapper">
      {playlistsData &&
        playlistsData.map((playlistData, i) => {
        return <div key={i}><Playlist playlistData={playlistData} /></div>;
        })}
        </div>
    </div>
  );
}
