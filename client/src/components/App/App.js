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
import { read } from '../../helpers/ajax'
import AuthApi from '../../helpers/context'
import {ProtectedRoute} from '../protectedRoute'
import Cookies from 'js-cookie' 

export default function App() {
  const [userName, setUserName] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  // const [state, dispatch] = useReducer(appReducer, "")
  const [searchText, setSearchText] = useState([]); // search input text
  const [searchQuery, setSearchQuery] = useState([]); // search input text
  const [songData, setSongData] = useState(null);

  console.log(loggedIn);

  useEffect(() => {
    if (Cookies.get('token')){
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
    playSongValue: [songData, setSongData],
    loggedInValue: [loggedIn, setLoggedIn]  
    }}>
  <Router>
  {loggedIn && 
    <NavBar/>
  }
    {loggedIn ? 
      <Switch>
    {/* <ProtectedRoute
    exact
    path='/Home'
    component={Home}
    />     */}
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
    <Route  path='*' exact component={NotFound} />
    </ Switch>
     :
     <Switch>
     <Route exact path="/" >
     <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
     </Route>
     </Switch>
}  
</Router>
</AuthApi.Provider>
</>
  );
}
