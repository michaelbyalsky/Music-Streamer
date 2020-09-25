import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import SideBar from "../../SideBar/SideBar";
import { read } from "../../../helpers/ajax";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import SongsList from "./SongsList/SongsList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1000
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "70%",
  },
  img: {
    margin: "auto",
    display: "block",
    width: "auto",
    height: "auto",
  },
}));

export default function AlbumSongs({ match }) {
  const [albumData, setAlbumData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = () => {
    read(`/albums/${match.params.id}`).then((res) => {
      console.log(res);
      setAlbumData(res);
    });
  };

  return (
    <>
      <div className="main">
        <SideBar />
        {albumData && (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={10}>
                <Grid item xs={12} sm={6} lg={4} xs={3}>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={albumData.cover_img}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs con ntainer direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {albumData.album_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {albumData.artist_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {albumData.length} songs
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <span>{albumData.createdAt.slice(0, 4)}</span>
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
              {albumData.Artist.Songs.map((song, index) => {
               return <SongsList key={song.title} type="Album" index={index} song={song} />;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
