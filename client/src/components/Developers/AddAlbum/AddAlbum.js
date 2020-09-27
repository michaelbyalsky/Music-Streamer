import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

export default function AddArtist({
  openAlbums,
  handleClose,
  SubmitAlbum,
  onAddAlbum,
  addAlbum,
  artistsData,
}) {
  return (
    <Dialog
      open={openAlbums}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form
        onSubmit={SubmitAlbum(onAddAlbum)}
        noValidate
        autoComplete="off"
      >
        <DialogTitle id="form-dialog-title">Add Album</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={addAlbum}
            autoFocus
            margin="dense"
            id="name"
            label="Album Name"
            name="album_name"
            type="text"
            fullWidth
          />
          <TextField
            inputRef={addAlbum}
            autoFocus
            margin="dense"
            id="name"
            label="Cover Img"
            name="cover_img"
            type="text"
            fullWidth
          />
          {artistsData && (
            <Grid item>
              <InputLabel htmlFor="selectArtist">Artist</InputLabel>
              <Select
                native
                id="selectArtist"
                placeholder="Artist"
                inputRef={addAlbum({ required: true })}
                name="id"
              >
                <option aria-label="None"></option>
                {artistsData.map((artist, index) => {
                  return (
                    <option key={index} value={artist.id}>
                      {artist.name}
                    </option>
                  );
                })}
              </Select>
            </Grid>
          )}
          <InputLabel htmlFor="created_at">Created At</InputLabel>
          <TextField
            inputRef={addAlbum}
            autoFocus
            margin="dense"
            id="created_at"
            name="created_at"
            type="date"
            fullWidth
          />
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
  );
}
