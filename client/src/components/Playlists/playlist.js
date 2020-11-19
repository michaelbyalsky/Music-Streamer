import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { create } from "../../helpers/ajax";
import Cookies from "js-cookie";

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

export default function Playlist({
  playlistData,
  playlistsData,
  setPlaylistsData,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const onPlaylistLike = (playlist) => {
    let copyData = Array.from(playlistsData);
    let currentPlaylist;
    debugger;
    copyData.forEach((data) => {
      if (data.id === playlist.id) {
        debugger;
        currentPlaylist = data;
        if (data.InteractionsPlaylists.length === 0) {
          data.InteractionsPlaylists.push({ isLike: true });
        } else if (data.InteractionsPlaylists[0].isLike === true) {
          data.InteractionsPlaylists[0].isLike = false;
        } else {
          data.InteractionsPlaylists[0].isLike = true;
        }
      }
    });
    setPlaylistsData(copyData);
    let body = {
      userId: Number(Cookies.get("id")),
      playlistId: playlist.id,
      isLike: currentPlaylist.InteractionsPlaylists[0].isLike,
    };
    create(`/api/v1/playlists/interaction`, body);
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
        title={`${playlistData.name}`}
        subheader={
          playlistData.createdAt && playlistData.createdAt.slice(0, 10)
        }
      />
      <CardMedia
        className={classes.media}
        image={playlistData.coverImg}
        title={playlistData.name}
      />
      <CardActions disableSpacing>
        <IconButton
          onClick={() => onPlaylistLike(playlistData)}
          aria-label="add to favorites"
        >
          <FavoriteIcon
            color={
              playlistData.InteractionsPlaylists.length === 0
                ? "action"
                : playlistData.InteractionsPlaylists[0].isLike
                ? "error"
                : "action"
            }
          />
        </IconButton>
        <Link to={`/playlists/${playlistData.id}`}>
          <IconButton>
            <PlaylistPlayIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
