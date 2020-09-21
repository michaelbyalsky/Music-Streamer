import React,{useState, useEffect, useReducer} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
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
import NotFound from '../NotFound/NotFound'
import ArtistSong from '../Artists/Artist/ArtistSongs/ArtistSong'
import playlistSongs from '../Playlists/PlaylistSongs'
import NavBar from '../NavBar/NavBar' 
import AuthApi from '../../helpers/context'

export default function App() {
  const [userName, setUserName] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  // const [state, dispatch] = useReducer(appReducer, "")
  const [searchText, setSearchText] = useState([]); // search input text
  const [searchQuery, setSearchQuery] = useState([]); // search input text
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    let rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue){
      let name = localStorage.getItem('name')
      setLoggedIn(true)
      setUserName(name)
    }
  }, []);

  return (
    <>
    <AuthApi.Provider 
    value={{
    userValue: [userName, setUserName], 
    searchTextValue: [searchText, setSearchText], 
    searchQueryValue: [searchQuery, setSearchQuery],
    playSongValue: [songData, setSongData]
    }}>
  <Router>
    <NavBar/>
    {loggedIn ? 
      <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Songs" exact component={Songs} />
    <Route path="/Register" exact component={Register} />
    <Route path="/Artists" exact component={Artists} />
    <Route path="/Albums" exact component={Albums} />
    <Route path="/Playlists" exact component={Playlists} />
    <Route path="/Developers" exact component={Developers} />
    <Route exact path="/Albums/:id?" component={AlbumSongs}/>
    <Route exact path="/Artists/:id?" component={ArtistSong}/>
    <Route exact path="/Playlists/:id?" component={playlistSongs}/>
    <Route  path="/Songs/:id" exact component={SingleSong} />
    <Route path='*' component={NotFound} />
    </ Switch>
     :
     <Switch>
     <Route exact path="/" >
     <Login setLoggedIn={setLoggedIn} />
     </Route>
     </Switch>
}  
</Router>
</AuthApi.Provider>
</>
  );
}
