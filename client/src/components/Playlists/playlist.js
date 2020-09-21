import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 330,
  },
  media: {
    height: "200px",
    width: 330,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Album({ playlistData }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{variant:'subtitle1'}}
        title={`${playlistData.playlist_name}`}
        subheader={playlistData.created_at && playlistData.created_at.slice(0, 10)}
      />
      <CardMedia
        className={classes.media}
        image={playlistData.cover_img}
        title={playlistData.album_name}
      />
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        <Link to={`/playlists/${playlistData.playlist_id}`}>
        <IconButton><PlaylistPlayIcon/></IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}