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
import { create } from '../../helpers/ajax'
import Cookies from 'js-cookie'

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

export default function Playlist({ playlistData }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onPlaylistLike = (playlist) => {
    // let copyData = Array.from(albumsData)
    // copyData.forEach(data => {
    //   if (data.id === album.id) {
    //     console.log(data);
    //     console.log(album);
    //     data.Interactions_Albums.is_like = album.Interactions_Albums === undefined ? true : !album.Interactions_Albums[0].is_like
    //   }
    // })
    // setAlbumsData(copyData)
    let body = {
      user_id: Cookies.get("id"),
      playlist_id: Playlist.id,
      is_like: playlist.Interactions_Playlists === [] ? true : !playlist.Interactions_Playlists.is_like
    }
    console.log(body);
    create(`/api/v1/playlists/interaction`, body)
    .then(response => {
      console.log(response);
    }) 
  }


  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{variant:'subtitle1'}}
        title={`${playlistData.name}`}
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
        <Link to={`/playlists/${playlistData.id}`}>
        <IconButton onClick={() => onPlaylistLike(playlistData)}>
          <PlaylistPlayIcon/>
        </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}