import React, { useEffect, useState } from "react";
import SideBar from "../../SideBar/SideBar";
import { read } from "../../../helpers/ajax";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import SongsList from "./SongsList/SongsList";
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 1000,
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
    height: "250px",
  },
}));

export default function AlbumSongs({ match }) {
  const [albumData, setAlbumData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = () => {
    read(`/api/v1/albums/${match.params.id}`)
      .then((res) => {
        setAlbumData(res);
      })
      .catch((err) => {
        console.error(err);
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
                      src={albumData.coverImg}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {albumData.albumName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {albumData.artistName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {albumData.Songs.length} songs
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <span>{albumData.createdAt.slice(0, 4)}</span>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link
                        to={`/songs/${albumData.Songs[0].id}?Album=${albumData.Songs[0].albumId}`}
                      >
                        <Button variant="body2" style={{ cursor: "pointer" }}>
                          Play
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <div className={classes.paper}>
              {albumData.Songs.map((song, index) => {
                return (
                  <SongsList
                    key={song.title}
                    type="Album"
                    index={index}
                    song={song}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
