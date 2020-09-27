import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Song.css'
import { create } from '../../helpers/ajax'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddToPlayList from './AddToPlaylist'
import Cookies from 'js-cookie'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 330,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

export default function RecipeReviewCard({ songsData, setSongsData, songData }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openPlaylist, setOpenPlaylist] = React.useState(false);
 


  const onSongLike = (song) => {
    let copyData = Array.from(songsData)
    copyData.forEach(data => {
      if (data.id === song.id) {
        data.Interactions[0].is_like = song.Interactions[0].is_like === null ? true : !song.Interactions[0].is_like
      }
    })
    setSongsData(copyData)
    let body = {
      user_id: Cookies.get("id"),
      song_id: song.id,
      is_like: song.Interactions[0].is_like === null ? true : !song.Interactions[0].is_like
    }
    console.log(body);
    create(`/interactions/addinteraction`, body)
    .then(response => {
      console.log(response);
    }) 
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleClose = () => {
    setOpenPlaylist(false);
  };



  return (
    <div>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={songData.cover_img} aria-label="recipe" className={classes.avatar}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{variant:'subtitle1'}}
        title={`${songData.title}`}
        subheader={songData.created_at && songData.created_at.slice(0, 10)}
      />
      <div className="video-con">
      <iframe src={songData.youtube_link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => onSongLike(songData)}>
          {songData.Interactions[0] &&
          <FavoriteIcon color={songData.Interactions[0].is_like ? "error" : "action"} />
          }
          {!songData.Interactions[0] &&
          <FavoriteIcon color="action" />
          }
          </IconButton>
        <IconButton onClick={() => setOpenPlaylist(true)}>
          <PlaylistAddIcon />
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
    
          <Typography paragraph>
            {songData.lyrics}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    {openPlaylist && (
          <AddToPlayList
          songId={songData.unique_id}
          openPlaylist={openPlaylist}
          handleClose={handleClose}
          setOpenPlaylist={setOpenPlaylist}
          />
        )}
    </div>
  );
}