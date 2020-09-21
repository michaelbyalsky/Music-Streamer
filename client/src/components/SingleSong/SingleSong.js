import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CardHeader from "@material-ui/core/CardHeader";
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
import { create, read } from "../../helpers/ajax";
import SideBar from "../SideBar/SideBar";
import { useParams, useLocation } from "react-router-dom";
import SingleSongLists from "./SingleSongList";
import Container from "@material-ui/core/Container";
import YouTube from 'react-youtube';
import AuthApi from '../../helpers/context'

const queryString = require("query-string");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto auto",
    '@media (min-width: 780px)' : {
      display: "grid",
    gridTemplateColumns: "78% 22%",
    justifyContent: "center",
    height: "400px",
    }
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
    '@media (max-width: 780px)' : {
      display: 'flex',
    overflow: "hidden", 
    overflowX: "scroll",
    },
    '@media (min-width: 780px)' : {
      height: "100%",
    overflow: "hidden", 
    overflowY: "scroll",
    }
  },
}));

export default function SingleSong({ match }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [relatedData, setRelatedData] = useState(null);
  const [nextSong, setNextSong] = useState(1)
  const { playSongValue } = React.useContext(AuthApi)
  const [songData, setSongData] = playSongValue
  const params = useParams();
  const location = useLocation();

  const parsed = queryString.parse(location.search);

  useEffect(() => {
    fetchSong();
    fetchRelated();
    console.log('rendered')
  }, []);

  useEffect(() => {
    fetchRelated();
    console.log('changed');
  }, [songData])

  const fetchSong = () => {
    read(`/songs/song/${match.params.id}`).then((res) => {
      console.log(res);
      setSongData(res[0]);
    });
  };

  const fetchRelated = () => {
    let type = Object.keys(parsed)[0];
    let url;
    console.log(type);
    switch (type) {
      case "Album":
        url = `/albums/${parsed[type]}`;
        break;
      case "Artist":
        url = `/artists/${parsed[type]}`;
        break;
      case "Playlist":
        url = `/playlists/${parsed[type]}`;
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
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }

  const onSongChoose = (data, index) => {
    setSongData(data)
    if(index === relatedData.length - 1){
      setNextSong(0)
    } else {
      setNextSong(index + 1)
    }
  }

  const onEnd = (event) => {
    setSongData(relatedData[nextSong])
    console.log(nextSong);
    console.log(relatedData.length);
    if(nextSong === relatedData.length - 1){
      setNextSong(0)
    } else {
      setNextSong(nextSong + 1)
    }
  }

  const opts = {
    // height:,
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  return (
    <>
      <div className="main">
        <SideBar />
        {songData && (
          <div className={classes.root}>
            
            <div className={classes.songContainer}>
              <Container maxWidth="sm">
                <CardHeader
                  avatar={
                    <Avatar
                      src={songData.cover_img}
                      aria-label="recipe"
                      className={classes.avatar}
                    ></Avatar>
                  }
                  title={`${songData.title}`}
                  subheader={
                    songData.created_at && songData.created_at.slice(0, 10)
                  }
                />
                <div>
                <YouTube videoId={songData.youtube_link.split("embed/")[1].split("?list")[0]} opts={opts} onReady={(e) => onReady(e)} onEnd={(e) => onEnd(e)} />
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
              {relatedData &&
            <div className={classes.singleSongList}>
                {relatedData.map((data, index) => {
                  return (
                    <div key={index}>
                      <SingleSongLists index={index} data={data} onSongChoose={onSongChoose}/>
                    </div>
                  );
                })}
            </div>}
          </div>
        )}
      </div>
    </>
  );
}
