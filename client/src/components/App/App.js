import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Register from '../Register/Register'
import Login from '../Login/Login'
import Home from '../Home/Home'
import Songs from '../Songs/Songs'
import Artists from '../Artists/Artists'
import Albums from '../Albums/Albums'
import Playlists from '../Playlists/Playlists'
import Developers from '../Developers/Developers'
import AlbumSongs from '../Albums/AlbumSong/AlbumSongs'
import SingleSong from '../SingleSong/SingleSong'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar' 
import NotFound from '../NotFound/NotFound'
import Artist from "../Artists/Artist/Artist";
import ArtistSong from '../Artists/Artist/ArtistSongs/ArtistSong'
import playlistSongs from '../Playlists/PlaylistSongs'

export default function App() {
  return (
    <>
  <Router>
    <Switch>
    <Route path="/Home" exact component={Home} />
    <Route path="/Songs" exact component={Songs} />
    <Route path="/Register" exact component={Register} />
    <Route path="/" exact component={Login} />
    <Route path="/Artists" exact component={Artists} />
    <Route path="/Albums" exact component={Albums} />
    <Route path="/Playlists" exact component={Playlists} />
    <Route path="/Developers" exact component={Developers} />
    <Route exact path="/Albums/:id?" component={AlbumSongs}/>
    <Route exact path="/Artists/:id?" component={ArtistSong}/>
    <Route exact path="/Playlists/:id?" component={playlistSongs}/>
    <Route exact path="/Songs/:id" component={SingleSong} />
    <Route path='*' exact={true} component={NotFound} />
    </ Switch>
</Router>
</>
  );
}
