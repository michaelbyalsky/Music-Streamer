import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import "./NavBar.css";
import AuthApi from "../../helpers/context";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { read } from "../../helpers/ajax";
import List from "@material-ui/core/List";
import Popover from '@material-ui/core/Popover'
import PlayCircleFilledRounded from '@material-ui/icons/PlayCircleFilledRounded'
import { Link, useLocation, useHistory, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  pop: {
    width: "30%"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  powerSection: {},
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function NavBar(props) {
  const { userValue, searchQueryValue, searchTextValue, playSongValue } = React.useContext(
    AuthApi
  );
  const [songData, setSongData] = playSongValue
  const [userName, setUserName] = userValue;
  const [searchText, setSearchText] = searchQueryValue;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchResult, setSearchResult] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    localStorage.clear();
    history.push("/")
    window.location.reload();
    };

  useEffect(() => {
    if(searchText.length === 0) {
      setAnchorEl(null);
    } 
    read(`/songs/all?searchText=${searchText}`).then((result) => {
      setSearchResult(result);
    });
  }, [searchText]);

  useEffect(() => {
    setTimeout(() => {    
      handleClose()
    }, 100);
    }, [location])

const handleSearch = (e) => {
  setSearchText(e.target.value)
  setAnchorEl(e.currentTarget)
}

const onSongChoose = (chosenSong) => {
  if(location.pathname === '/') {
    history.push(`/Songs/${chosenSong.unique_id}?Artist=${chosenSong.artist_id}`)
  } else {
    history.push(`/Songs/${chosenSong.unique_id}?Artist=${chosenSong.artist_id}`)
    setSongData(chosenSong)
  }
  setSearchText('')
}





  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            ZionMusic
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              autoFocus={true}
              value={searchText}
              onChange={(e) => handleSearch(e)}
              onKeyUp={e => setAnchorEl(e.currentTarget)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            {searchResult && (
              <Popover
              disableAutoFocus 
              className={classes.pop}
              onKeyDown={handleClose}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {searchResult.map((song, i) => {
                  return (
                    <div key={i}>
                    <ListItem >
                    <IconButton variant="h6" onClick={() => onSongChoose(song)} >
                      <PlayCircleFilledRounded/>
                    </IconButton>
                      {song.title}
                      </ListItem>
                      </div>
                  );
                })}
              </Popover>
            )}
          </div>
          <Grid item xs={6}>
          </Grid>
          {userName &&
          <MenuItem>
            <Typography color="initial">{`Hello ${userName}`}</Typography>
          </MenuItem>
}
          <IconButton color="action" onClick={onLogout} className={classes.title} variant="h6" noWrap>
          <ExitToAppIcon/>
          </IconButton>
    
        </Toolbar>
      </AppBar>
    </div>
  );
}
