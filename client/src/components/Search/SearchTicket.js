import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";
import "./SearchTicket.css";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  blueGrey: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  },
}));

function SearchTicket({ ticket, closeSearch, type }) {
  const classes = useStyles();

  console.log(ticket);

  return (
    <div>
      {type === "song" && (
        <Link
          to={`/songs/${ticket.id}?Artist=${ticket.artistId}`}
          style={{ textDecoration: "none" }}
        >
          <div className="SearchTicket" onClick={closeSearch}>
            <div className="ticketName">{ticket.name}</div>
            <div className="ticketRating"></div>
          </div>
          <Divider />
        </Link>
      )}
      {type === "artist" && (
        <Link to={`/Artists/${ticket.id}`} style={{ textDecoration: "none" }}>
          <div className="SearchTicket" onClick={closeSearch}>
            <div className="ticketName">{ticket.name}</div>
            <div className="ticketRating"></div>
          </div>
          <Divider />
        </Link>
      )}
      {type === "album" && (
        <Link to={`/Albums/${ticket.id}`} style={{ textDecoration: "none" }}>
          {" "}
          <div className="SearchTicket" onClick={closeSearch}>
            <div className="ticketName">{ticket.name}</div>
            <div className="ticketRating"></div>
          </div>
          <Divider />
        </Link>
      )}
      {type === "playlist" && (
        <Link to={`/Playlists/${ticket.id}`} style={{ textDecoration: "none" }}>
          <div className="SearchTicket" onClick={closeSearch}>
            <div className="ticketName">{ticket.name}</div>
            <div className="ticketRating"></div>
          </div>
          <Divider />
        </Link>
      )}
    </div>
  );
}

export default SearchTicket;
