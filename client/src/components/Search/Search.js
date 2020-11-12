import { Input } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import { read } from '../../helpers/ajax'
const Search = () => {
    const [inputItems, setInputItems] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [songs, setSongs] = useState([])
    const [albums, setAlbums] = useState([])
    const [artists, setArtists] = useState([])

    const fetchTopSongs = () => {
        read('/api/v1/search/songs').then((data) => {
            setSongs(data)
        })
    }
    const fetchTopAlbums = () => {
        read('/api/v1/search/albums').then((data) => {
            setAlbums(data)
        })
    }
    const fetchTopArtists = () => {
        read('/api/v1/songs/all').then((data) => {
            setArtists(data)
        })
    }
    const fetchTopPlaylists = () => {
        read('/api/v1/search/playlists').then((data) => {
            setPlaylists(data)
        })
    }


    useEffect(() => {
        Promise.all([fetchTopSongs(), fetchTopAlbums(), fetchTopArtists(), fetchTopPlaylists()]).then((value) => {
            console.log(value);
        })
    }, [])
    return <div>search</div>
}


export default Search
