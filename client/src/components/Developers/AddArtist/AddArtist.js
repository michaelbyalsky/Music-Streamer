import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddArtist({
  openArtist,
  handleSubmit2,
  onAddArtist,
  addArtist,
  handleClose,
}) {
  return (
    <Dialog
      open={openArtist}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form
        // className={classes.root}
        onSubmit={handleSubmit2(onAddArtist)}
        noValidate
        autoComplete="off"
      >
        <DialogTitle id="form-dialog-title">Add Artist</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={addArtist}
            autoFocus
            margin="dense"
            id="name"
            label="Artist Name"
            name="name"
            type="text"
            fullWidth
          />
          <TextField
            inputRef={addArtist}
            autoFocus
            margin="dense"
            id="name"
            label="Artist image"
            name="artistImg"
            type="text"
            fullWidth
          />
          <TextField
            inputRef={addArtist}
            autoFocus
            margin="dense"
            id="name"
            label="Date of birth"
            name="createdAt"
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
