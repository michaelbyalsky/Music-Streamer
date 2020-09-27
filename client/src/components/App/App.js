import React,{useState, useEffect, useReducer} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
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
import Cookies from 'js-cookie' 
import Defaults from '../Defaults/Defaults'

 function App({ history }) {
  const [userName, setUserName] = useState('')
  const [loggedIn, setLoggedIn] = useState(null)
  // const [state, dispatch] = useReducer(appReducer, "")
  const [searchText, setSearchText] = useState([]); // search input text
  const [searchQuery, setSearchQuery] = useState([]); // search input text
  const [songData, setSongData] = useState(null);

  console.log(loggedIn);

  useEffect(() => {
    if (Cookies.get('token')){
      let name = Cookies.get('name')
      setLoggedIn(true)
      setUserName(name)
    } else {
      setLoggedIn(false)
    }
  }, []);

  return (
    <>
    <AuthApi.Provider 
    value={{
      userValue: [userName, setUserName], 
      searchTextValue: [searchText, setSearchText], 
      searchQueryValue: [searchQuery, setSearchQuery],
    playSongValue: [songData, setSongData],
    loggedInValue: [loggedIn, setLoggedIn]  
    }}>
  <Router>
  {loggedIn && 
    <NavBar/>
  }
    {loggedIn ? 
    <Switch>
    <Route exact path="/Home" component={Home} />
    <Route path="/Songs" exact component={Songs} />
    <Route path="/Register" exact component={Register} />
    <Route path="/Artists" exact component={Artists} />
    <Route path="/Albums" exact component={Albums} />
    <Route path="/Playlists" exact component={Playlists} />
    <Route path="/Developers" exact component={Developers} />
    <Route exact path="/Albums/:id?" component={AlbumSongs}/>
    <Route exact path="/Artists/:id?" component={ArtistSong}/>
    <Route exact path="/Playlists/:id?" component={playlistSongs}/>
    <Route exact path="/Songs/:id" component={SingleSong} />
    <Route exact path="/Defaults" component={Defaults} />
    <Route  path='*' exact component={NotFound} />
    </ Switch>
     :
     <Redirect to="/" />
      }  
      {!loggedIn &&
     <Switch>
     <Route exact path="/" >  
     <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
     </Route>
     <Route exact path="/register" component={Register} />
     </Switch>
 }
</Router>
</AuthApi.Provider>
</>
  );
}

export default App