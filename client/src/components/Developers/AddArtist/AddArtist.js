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

export default function AddArtist({openArtist, 
    handleSubmit2, 
    onAddArtist, 
    addArtist,
    handleClose}){


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
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                  </DialogContentText>
                  <TextField
                    inputRef={addArtist}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Artist Name"
                    name="artist_name"
                    type="text"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
)
}