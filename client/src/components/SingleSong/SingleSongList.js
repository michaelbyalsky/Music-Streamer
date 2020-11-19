import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  player: {
    pointerEvents: "none",
  },
}));

export default function AlignItemsList({ type, data, onSongChoose, index }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <IconButton
        type="button"
        alignItems="flex-start"
        onClick={() => onSongChoose(data, index)}
      >
        <ListItemText
          primary={type === "Playlist" ? data.Song.title : data.title}
          secondary={
            <React.Fragment>
              <iframe
                className={classes.player}
                height="100px"
                width="200px"
                src={
                  type === "Playlist" ? data.Song.youtubeLink : data.youtubeLink
                }
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </React.Fragment>
          }
        />
      </IconButton>
      <Divider variant="inset" component="li" />
    </List>
  );
}
