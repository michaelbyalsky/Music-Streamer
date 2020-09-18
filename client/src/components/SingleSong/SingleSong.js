import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import './Song.css'
import { create, read } from "../../helpers/ajax";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { Grid } from "@material-ui/core";
import { useParams, useLocation } from "react-router-dom";
import SingleSongLists from "./SingleSongList";
import "./SingleSong.css";
import Container from "@material-ui/core/Container";

const queryString = require("query-string");

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    display: "grid",
    gridTemplateColumns: "78% 22%",
    justifyContent: "center",
    height: "400px",
  },
  media: {
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  singleSongList: {
    height: "100%",
    overflow: "hidden", 
    overflowY: "scroll"
  },
}));

export default function SingleSong({ match }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [songData, setSongData] = useState(null);
  const [relatedData, setRelatedData] = useState(null);

  const params = useParams();
  const location = useLocation();

  const parsed = queryString.parse(location.search);
  console.log(parsed);

  useEffect(() => {
    fetchSong();
    fetchRelated();
  }, []);

  const fetchSong = () => {
    read(`/songs/song/${match.params.id}`).then((res) => {
      console.log(res);
      setSongData(res[0]);
    });
  };

  const fetchRelated = () => {
    let type = Object.keys(parsed)[0];
    let url;
    debugger
    switch (type) {
      case "album":
        url = `/albums/album/${parsed[type]}`;
        break;
      case "artist":
        url = `/artists/artist/${parsed[type]}`;
        break;
      case "playlist":
        url = `/playlists/playlist/${parsed[type]}`;
    }
    console.log(url);
    read(url).then((res) => {
      console.log(res);
      setRelatedData(res);
    });
  };

  const onSongLike = (song) => {
    song.is_liked = song.is_liked === null ? true : !song.is_liked;
    setSongData(song);
    console.log(song);
    let body = {
      user_id: localStorage.getItem("id"),
      song_id: song.song_id,
      is_liked: song.is_liked,
    };
    create(`/interactions/addinteraction`, body).then((response) => {
      console.log(response);
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <NavBar />
      <div className="main">
        <SideBar />
        {songData && (
          <div className={classes.root}>
            <div className="songContainer">
              <Container maxWidth="sm">
                <CardHeader
                  avatar={
                    <Avatar
                      src={songData.cover_img}
                      aria-label="recipe"
                      className={classes.avatar}
                    ></Avatar>
                  }
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  title={`${songData.title}`}
                  subheader={
                    songData.created_at && songData.created_at.slice(0, 10)
                  }
                />
                <div>
                  <iframe
                    height="250px"
                    width="500px"
                    src={songData.youtube_link}
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => onSongLike(songData)}
                  >
                    <FavoriteIcon
                      color={songData.is_liked ? "error" : "action"}
                    />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>lyrics:</Typography>

                    <Typography paragraph>{songData.lyrics}</Typography>
                  </CardContent>
                </Collapse>
              </Container>
            </div>
            <div className={classes.singleSongList}>
              {relatedData &&
                relatedData.map((data, index) => {
                  return (
                    <div key={index}>
                      <SingleSongLists data={data} />
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
