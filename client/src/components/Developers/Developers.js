import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { create } from "../../helpers/ajax";
import Select from "@material-ui/core/Select";
import { read } from "../../helpers/ajax";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Grid from "@material-ui/core/Grid";
import AddArtist from './AddArtist/AddArtist'
import AddAlbum from './AddAlbum/AddAlbum'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    marginLeft: "2rem",
    width: "95%",
  },
  button: {
    marginTop: "1rem",
  }
}));

export default function Developers() {
  const classes = useStyles();
  const [openArtist, setOpenArtist] = useState(false);
  const [openAlbums, setOpenAlbums] = useState(false);
  const [artistsData, setArtistsData] = useState(null);
  const [albumsData, setAlbumsData] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const {
    register: addArtist,
    errors: errors2,
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onBlur",
  });
  const {
    register: addAlbum,
    errors: albumError,
    handleSubmit: SubmitAlbum,
  } = useForm({
    mode: "onBlur",
  });
  const onAddSong = (data) => {
    console.log(data);
    create('songs/addsong', data)
    .then(result => {
        console.log(result)
    })
  };

  const handleClickOpenArtists = () => {
    setOpenArtist(true);
  };

  const handleClickOpenAlbums = () => {
    setOpenAlbums(true);
  };


  const handleClose = () => {
    setOpenArtist(false);
    setOpenAlbums(false)
  };

  const onAddArtist = (data) => {
    console.log(data);
    create("artists/addartist", data)
      .then((result) => {
        console.log(result);
        setOpenArtist(false);
      })
      .then((res) => {
        read("artists/all").then((res) => {
          console.log(res);
          setArtistsData(res);
        });
      });
  };

  const onAddAlbum = (data) => {
    console.log(data);
    create("albums/addalbum", data)
      .then((result) => {
        console.log(result);
        setOpenAlbums(false);
      })
      .then((res) => {
        read("albums/all").then((res) => {
          console.log(res);
          setAlbumsData(res);
        });
      });
  };

  useEffect(() => {
    read("albums/all").then((res) => {
      console.log(res);
      setAlbumsData(res);
    });
    read("artists/all").then((res) => {
        console.log(res);
        setArtistsData(res);
      });
  }, []);



  console.log(artistsData);
  return (
    <>
      <div className="main">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="formWrapper">
          <form
            className={classes.root}
            onSubmit={handleSubmit(onAddSong)}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Song Name"
              error={errors.title ? true : false}
              type="text"
              label="Song Name"
              name="title"
              inputRef={register({ required: true })}
            />
            <TextField
              id="youtube_link"
              error={errors.youtube_link ? true : false}
              type="text"
              label="Yotube Link"
              name="youtube_link"
              inputRef={register({ required: true })}
            />
            <TextField
              id="lyrics"
              error={errors.lyrics ? true : false}
              type="text"
              label="Lyrics"
              fullWidth
              name="lyrics"
              inputRef={register({ required: true })}
            />
            <TextField
              id="created_at"
              type="date"
              label="Created At"
              name="created_at"
              variant="filled"
              inputRef={register({ required: true })}
              error={errors.created_at ? true : false}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container>
              {artistsData && (
                <Grid item>
                  <InputLabel htmlFor="selectArtist">Artist</InputLabel>
                  <Select
                    native
                    id="selectArtist"
                    name="artist_id"
                    placeholder="Artist"
                    inputRef={register({ required: true })}
                 
                  >
                    <option aria-label="None"></option>
                    {artistsData.map((artist, index) => {
                      return (
                        <option key={index} value={artist.artist_id}>
                          {artist.artist_name}
                        </option>
                      );
                    })}
                  </Select>
                </Grid>
              )}
              <Grid item>
                <IconButton onClick={handleClickOpenArtists}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container>
              {albumsData && (
                <Grid item>
                  <InputLabel htmlFor="selectAlbums">Album</InputLabel>
                  <Select
                    native
                    id="selectAlbums"
                    name="album_id"
                    placeholder="Albums"
                    inputRef={register({ required: true })}
                  >
                    <option aria-label="None"></option>
                    {albumsData.map((album, index) => {
                      return (
                        <option key={index} value={album.album_id}>
                          {album.album_name}
                        </option>
                      );
                    })}
                  </Select>
                </Grid>
              )}
              <Grid item>
                <IconButton onClick={handleClickOpenAlbums}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
          {openArtist && (
          <AddArtist 
          openArtist={openArtist} 
          handleSubmit2={handleSubmit2} 
          onAddArtist={onAddArtist} 
          artistsData={artistsData}
          addArtist={addArtist}
          handleClose={handleClose}
          />
          )
            }
      
        {openAlbums && (
          <AddAlbum
          openAlbums={openAlbums}
          handleClose={handleClose}
          SubmitAlbum={SubmitAlbum}
          onAddAlbum={onAddAlbum}
          addAlbum={addAlbum}
          artistsData={artistsData}
          />
        )}
         
        </div>
      </div>
    </>
  );
}
