import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { read } from "../../helpers/ajax";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import SongsList from "../Albums/AlbumSong/SongsList/SongsList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "70%",
    height: "45%"
  },
  img: {
    margin: "auto",
    display: "block",
    width: "300px",
    height: "200px",
  },
}));

export default function AlbumSongs({ match, history }) {
  const [searchText, setSearchText] = useState(""); // search input text
  const [playlistData, setPlaylistData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = () => {
    read(`/playlists/playlist/${match.params.id}`).then((res) => {
      console.log(res);
      res.length !== 0 ? setPlaylistData(res) : setPlaylistData(null);
    });
  };

  console.log(match.params.id);

  return (
    <>
      <NavBar />
      <div className="main">
        <SideBar />
        {playlistData ? (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={playlistData[0].cover_img}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs con ntainer direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {playlistData[0].album_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {playlistData[0].artist_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {playlistData.length} songs
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <span>{playlistData[0].created_at.slice(0, 4)}</span>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="body2" style={{ cursor: "pointer" }}>
                        Play
                      </Button>
                      <Button variant="body2" style={{ cursor: "pointer" }}>
                        Add to library
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <div className={classes.paper}>
              {playlistData.map((song, index) => {
               return <SongsList index={index} song={song} />;
              })}
            </div>
          </div>
        ) : (
            <h1>this playlist is empty</h1>
        )}
      </div>
    </>
  );
}
