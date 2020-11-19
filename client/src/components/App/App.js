import React, { useState, useEffect, useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Songs from "../Songs/Songs";
import Artists from "../Artists/Artists";
import Albums from "../Albums/Albums";
import Playlists from "../Playlists/Playlists";
import Developers from "../Developers/Developers";
import AlbumSongs from "../Albums/AlbumSong/AlbumSongs";
import SingleSong from "../SingleSong/SingleSong";
import NotFound from "../NotFound/NotFound";
import ArtistSong from "../Artists/Artist/ArtistSongs/ArtistSong";
import playlistSongs from "../Playlists/PlaylistSongs";
import NavBar from "../NavBar/NavBar";
import AuthApi from "../../helpers/context";
import Cookies from "js-cookie";
import Defaults from "../Defaults/Defaults";
import Search from "../Search/Search";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    if (Cookies.get("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  return (
    <>
      <AuthApi.Provider
        value={{
          playSongValue: [songData, setSongData],
          loggedInValue: [loggedIn, setLoggedIn],
        }}
      >
        <Router>
          {Cookies.get("token") && <NavBar />}
          {Cookies.get("token") ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Songs" exact component={Songs} />
              <Route path="/Register" exact component={Register} />
              <Route path="/Artists" exact component={Artists} />
              <Route path="/Albums" exact component={Albums} />
              <Route path="/Playlists" exact component={Playlists} />
              <Route path="/Developers" exact component={Developers} />
              <Route exact path="/Albums/:id?" component={AlbumSongs} />
              <Route exact path="/Artists/:id?" component={ArtistSong} />
              <Route exact path="/Playlists/:id?" component={playlistSongs} />
              <Route exact path="/Songs/:id" component={SingleSong} />
              <Route exact path="/Defaults" component={Defaults} />
              <Route exact path="/Search" component={Search} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          ) : (
            <Redirect to="/login" />
          )}
          {!loggedIn && (
            <Switch>
              <Route exact path="/login">
                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </Route>
              <Route exact path="/register" component={Register} />
            </Switch>
          )}
        </Router>
      </AuthApi.Provider>
    </>
  );
}

export default App;
