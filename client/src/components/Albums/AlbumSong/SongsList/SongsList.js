import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Link, useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function SongsList({song, index, type}) {
  const classes = useStyles();

  return (
      <List dense className={classes.root}>
          <ListItem button>
            {type === 'Album' &&
              <Link to={`/songs/${song.id}?${type}=${song.album_id}`}>
            <IconButton>
              <PlayCircleOutlineIcon/>
            </IconButton>
            </Link>
            }
            {type === 'Artist' &&
              <Link to={`/songs/${song.id}?${type}=${song.artist_id}`}>
            <IconButton>
              <PlayCircleOutlineIcon/>
            </IconButton>
            </Link>
            }
            {type === 'Playlist' &&
              <Link to={`/songs/${song.id}?${type}=${song.playlist_id}`}>
            <IconButton>
              <PlayCircleOutlineIcon/>
            </IconButton>
            </Link>
            }
            <ListItemText id={index} primary={`${index + 1}. ${song.title} `} />
            <ListItemSecondaryAction>
            </ListItemSecondaryAction>
          </ListItem>
        
      
    
    </List>
  );
}