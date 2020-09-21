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
import { create, read } from '../../helpers/ajax'

export default function AddPlayList({
    handleClose,
    openPlaylist,
    setOpenPlaylist,
    songId
}) {
    const [playlistsData, setPlaylistsData] = useState(null);
    const [openAddPlaylist, setOpenAddPlaylist] = React.useState(false);

    useEffect(() => {
        read('playlists/top_playlist')
        .then(result => {
          console.log(result);
          setPlaylistsData(result)
        })
        .catch(err => {
          console.log(err.message);
        })
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
        console.log(data);
        create("playlists/add", data)
          .then((result) => {
            console.log(result);
            setOpenAddPlaylist(false)
          })
          .then((res) => {
            read("playlists/top_playlist").then((res) => {
              console.log(res);
              setPlaylistsData(res)
            });
          });
      };

      const onAddSong = (data) => {
        data.song_id = songId
        console.log(data);
        create('Playlists/addsong', data)
        .then(result => {
            console.log(result)
            setOpenPlaylist(false);

        })
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
                <InputLabel htmlFor="selectPlaylist">Choose playlist</InputLabel>
                <Select
                  native
                  id="selectArtist"
                  placeholder="Playlist"
                  inputRef={addToPlaylist({ required: true })}
                  name="playlist_id"
                >
                  <option aria-label="None"></option>
                  {playlistsData.map((playlist) => {
                    return (
                      <option value={playlist.playlist_id}>
                        {playlist.playlist_name}
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
   
    {openAddPlaylist &&
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
                 name="playlist_name"
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
                 name="cover_img"
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
    }
    </>
  );
}
