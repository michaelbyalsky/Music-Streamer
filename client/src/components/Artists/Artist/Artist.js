import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Artist.css'
import { Link } from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia';


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

export default function Artist({ artistData }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{variant:'subtitle1'}}
        title={`${artistData.artist_name}`}
      />
      <CardMedia
        className={classes.media}
        image={artistData.artist_img}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Link to={`/Artists/${artistData.artist_id}`}>
        <Button>Move To Artist</Button>
        </Link>
      </CardActions>
    </Card>
  );
}