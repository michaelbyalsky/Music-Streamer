import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Album.css";
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

export default function Album({ albumData, albumsData, setAlbumsData }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  console.log(albumData);

  const onAlbumLike = (album) => {
    let copyData = Array.from(albumsData);
    copyData.forEach((data) => {
      if (data.id === album.id) {
        albumData.InteractionsAlbums[0].isLike =
          albumData.InteractionsAlbums.length === 0
            ? true
            : albumData.InteractionsAlbums[0].isLike === true
            ? false
            : true;
      }
    });
    setAlbumsData(copyData);
    let body = {
      userId: Cookies.get("id"),
      albumId: album.id,
      isLike: albumData.InteractionsAlbums[0].isLike,
    };
    console.log(body);
    create(`/api/v1/albums/interaction`, body).then((response) => {
      console.log(response);
    });
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
        title={`${albumData.name}`}
        subheader={albumData.createdAt && albumData.createdAt.slice(0, 10)}
      />
      <CardMedia
        className={classes.media}
        image={albumData.coverImg}
        title={albumData.albumName}
      />
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => onAlbumLike(albumData)}
        >
          {albumData.InteractionsAlbums && (
            <FavoriteIcon
              color={
                albumData.InteractionsAlbums.length === 0
                  ? "action"
                  : albumData.InteractionsAlbums[0].isLike
                  ? "error"
                  : "action"
              }
            />
          )}
        </IconButton>
        <Link to={`/Albums/${albumData.id}`}>
          <IconButton>
            <QueueMusicIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
