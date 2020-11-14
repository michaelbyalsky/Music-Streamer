import { Input } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { read } from "../../helpers/ajax";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import { fade, makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import SearchTicket from "./SearchTicket";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: "37.25%",
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
  searchLight: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgb(219, 219, 219)",
    "&:hover": {
      backgroundColor: "rgb(175, 175, 175)",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "0px",
    transition: "width 2s",
    "&:focus": {
      width: "100%",
    },
  },
}));

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const classes = useStyles();

  console.log(playlists);
  console.log(songs);
  console.log(albums);
  console.log(artists);

  const closeSearch = useCallback(() => {
    setSearchValue("");
    setArtists([]);
    setSongs([]);
    setAlbums([]);
    setPlaylists([]);
  }, []);

  const fetchTopSongs = (search) => {
    read(`/api/v1/search/songs?search=${search}`).then((data) => {
      setSongs(data);
    });
  };
  const fetchTopAlbums = (search) => {
    read(`/api/v1/search/albums?search=${search}`).then((data) => {
      setAlbums(data);
    });
  };
  const fetchTopArtists = (search) => {
    read(`/api/v1/search/artists?search=${search}`).then((data) => {
      setArtists(data);
    });
  };
  const fetchTopPlaylists = (search) => {
    read(`/api/v1/search/playlists?search=${search}`).then((data) => {
      setPlaylists(data);
    });
  };
  const search = (e) => {
    if (e.target.value === "") {
      closeSearch();
    }
    setSearchValue(e.target.value);
    fetchTopSongs(e.target.value);
    fetchTopAlbums(e.target.value);
    fetchTopArtists(e.target.value);
    fetchTopPlaylists(e.target.value);
  };

  const onSearchLoseFocus = () => {
    setTimeout(() => {
      setPlaylists([]);
      setSongs([]);
      setAlbums([]);
      setArtists([]);
      setSearchValue("");
    }, 500);
  };

  const songsResults =
    songs &&
    songs.length > 0 &&
    songs.map((song) => (
      <SearchTicket ticket={song} key={song.id} type="song" closeSearch={closeSearch} />
    ));

  const artistsResults =
    artists &&
    artists.length > 0 &&
    artists.map((artist) => (
      <SearchTicket ticket={artist} key={artist.id} type="artist" closeSearch={closeSearch} />
    ));

  const albumsResults =
    albums &&
    albums.length > 0 &&
    albums.map((album) => (
      <SearchTicket ticket={album} key={album.id} type="album" closeSearch={closeSearch} />
    ));

  const playlistsResults =
    playlists &&
    playlists.length > 0 &&
    playlists.map((playlist) => (
      <SearchTicket
      type="playlist"
        ticket={playlist}
        key={playlist.id}
        closeSearch={closeSearch}
      />
    ));

  const searchInput = (
    <div className={classes.searchLight}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        id="searchBar"
        placeholder="Search..."
        onChange={search}
        autoComplete="off"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onBlur={onSearchLoseFocus}
        value={searchValue}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );

  return (
    <div>
      <div>{searchInput}</div>

      {songsResults && songsResults.length > 0 && (
        <div>
          <h1>Top songs</h1>
          <div>{songsResults}</div>
        </div>
      )}
      {playlistsResults && playlistsResults.length > 0 && (
        <div>
          <h1>Top playlists</h1>
          <div>{playlistsResults}</div>
        </div>
      )}
      {artistsResults && artistsResults.length > 0 && (
        <div>
          <h1>Top artists</h1>
          <div>{artistsResults}</div>
        </div>
      )}
      {albumsResults && albumsResults.length > 0 && (
        <div>
          <h1>Top albums</h1>
          <div>{albumsResults}</div>
        </div>
      )}
    </div>
  );
};

export default Search;
