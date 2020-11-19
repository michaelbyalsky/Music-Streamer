import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Artist.css";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import Cookies from "js-cookie";
import { create } from "../../../helpers/ajax";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 330,
  },
  media: {
    height: "200px",
    width: 330,
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
}));

export default function Artist({ artistData, artistsData, setArtistsData }) {
  const classes = useStyles();

  const onArtistLike = (artist) => {
    let copyData = Array.from(artistsData);
    let currentArtist;
    copyData.forEach((data) => {
      if (data.id === artist.id) {
        currentArtist = data;
        if (data.InteractionsArtists.length === 0) {
          data.InteractionsArtists.push({ isLike: true });
        } else if (data.InteractionsArtists[0].isLike === true) {
          data.InteractionsArtists[0].isLike = false;
        } else {
          data.InteractionsArtists[0].isLike = true;
        }
      }
    });
    setArtistsData(copyData);
    let body = {
      userId: Number(Cookies.get("id")),
      artistId: artist.id,
      isLike: currentArtist.InteractionsArtists[0].isLike,
    };
    create(`/api/v1/artists/interaction`, body);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{ variant: "subtitle1" }}
        title={`${artistData.name}`}
      />
      <CardMedia className={classes.media} image={artistData.artistImg} />
      <CardActions disableSpacing>
        <IconButton
          onClick={() => onArtistLike(artistData)}
          aria-label="add to favorites"
        >
          <FavoriteIcon
            color={
              artistData.InteractionsArtists.length === 0
                ? "action"
                : artistData.InteractionsArtists[0].isLike
                ? "error"
                : "action"
            }
          />
        </IconButton>
        <Link to={`/Artists/${artistData.id}`}>
          <IconButton>
            <QueueMusicIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
