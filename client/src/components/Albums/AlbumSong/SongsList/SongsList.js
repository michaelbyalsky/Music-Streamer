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


export default function SongsList({song, index}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);


  const location = useLocation();
  const type = location.pathname.split('/')[1].slice(0, -1);
  console.log(type);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
      <List dense className={classes.root}>
        {/* const labelId = `checkbox-list-secondary-label-${value}`; */}
          <ListItem button>
              <Link to={`/songs/${song.song_id}?${type}=${song.album_id}`}>
            <IconButton>
              <PlayCircleOutlineIcon/>
            </IconButton>
            </Link>
            <ListItemText id={index} primary={`${index + 1}. ${song.title} `} />
            <ListItemSecondaryAction>
            </ListItemSecondaryAction>
          </ListItem>
        
      
    
    </List>
  );
}