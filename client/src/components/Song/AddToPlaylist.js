import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import { create, read } from "../../helpers/ajax";

export default function AddPlayList({
  handleClose,
  openPlaylist,
  setOpenPlaylist,
  songId,
}) {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [openAddPlaylist, setOpenAddPlaylist] = React.useState(false);

  useEffect(() => {
    read("/api/v1/playlists/top_playlist")
      .then((result) => {
        setPlaylistsData(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const {
    register: addToPlaylist,
    errors: songError,
    handleSubmit: submitSong,
  } = useForm({
    mode: "onBlur",
  });

  const {
    register: addPlaylist,
    errors: playlistError,
    handleSubmit: submitPlaylist,
  } = useForm({
    mode: "onBlur",
  });

  const onAddPlaylist = (data) => {
  
    console.table(data);
    create("/api/v1/playlists/add", data)
      .then((result) => {
        setOpenAddPlaylist(false);
      })
      .then((res) => {
        read("/api/v1/playlists/top_playlist").then((res) => {
          setPlaylistsData(res);
        });
      }).catch(err => {
        console.error(err)
      });
  };

  const onAddSong = (data) => {
    let body = {
      playlistId: data.playlistId,
      songId: songId
    }
    console.table(body);
    create("/api/v1/Playlists/addsong", body)
      .then((result) => {
        handleClose();
        setOpenPlaylist(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Dialog
        open={openPlaylist}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form
          // className={classes.root}
          onSubmit={submitSong(onAddSong)}
          noValidate
          autoComplete="off"
        >
          <DialogTitle id="form-dialog-title">Add to Playlist</DialogTitle>
          <DialogContent>
            {playlistsData && (
              <Grid item>
                <InputLabel htmlFor="selectPlaylist">
                  Choose playlist
                </InputLabel>
                <Select
                  native
                  id="selectArtist"
                  placeholder="Playlist"
                  inputRef={addToPlaylist({ required: true })}
                  name="playlistId"
                >
                  <option aria-label="None"></option>
                  {playlistsData.map((playlist) => {
                    return (
                      <option value={playlist.id}>
                        {playlist.name}
                      </option>
                    );
                  })}
                </Select>
              </Grid>
            )}
            <IconButton onClick={() => setOpenAddPlaylist(true)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {openAddPlaylist && (
        <Dialog
          open={openAddPlaylist}
          onClose={() => setOpenAddPlaylist(false)}
          aria-labelledby="form-dialog-title"
        >
          <form
            // className={classes.root}
            onSubmit={submitPlaylist(onAddPlaylist)}
            noValidate
            autoComplete="off"
          >
            <DialogTitle id="form-dialog-title">Add Playlist</DialogTitle>
            <DialogContent>
              <TextField
                id="playlist_name"
                type="text"
                label="Playlist name"
                name="name"
                variant="filled"
                inputRef={addPlaylist({ required: true })}
                error={playlistError.playlist_name ? true : false}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="cover_img"
                type="text"
                label="Playlist img"
                name="coverImg"
                variant="filled"
                inputRef={addPlaylist({ required: true })}
                error={playlistError.created_at ? true : false}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenAddPlaylist(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
}
