const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const { spotify, client } = require('../config/config')
const ExpressError = require('../utils/ExpressError')

router.get('/get-album-tracks', async (req, res) => {
  try {
    const { spotifyAccessToken } = req.user
    const { albumId } = req.query
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
      params: {
        limit: 50,
      },
    }
    const { data } = await axios(config)
    const trackList = data.items.map((track) => ({
      trackName: track.name,
      trackUri: track.uri,
    }))
    res.send({ trackList })
  } catch (err) {
    console.log(err)
  }
})
router.get('/get-playlist-tracks', async (req, res) => {
  try {
    const { spotifyAccessToken } = req.user
    const { playlistId } = req.query
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.items.track(album(artists),name,uri)`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    }
    const { data } = await axios(config)
    const playlistTracks = data.tracks.items.map((track) => ({
      trackName: track.track.name,
      artists: track.track.album.artists,
      uri: track.track.uri,
    }))

    res.send(playlistTracks)
  } catch (err) {
    console.log(err)
  }
})
router.get('/get-artist-top-tracks', async (req, res) => {
  try {
    const { spotifyAccessToken } = req.user
    const { artistId } = req.query
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=GB`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    }
    const { data } = await axios(config)
    const tracks = data.tracks.map((track) => {
      return {
        name: track.name,
        artist: track.artists,
        album: track.album.name,
        uri: track.uri,
      }
    })
    res.send(tracks)
  } catch (err) {
    console.log(err)
  }
})

router.get('/get-artist-albums', async (req, res) => {
  try {
    const { spotifyAccessToken } = req.user
    const { artistId } = req.query
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/artists/${artistId}/albums`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
      params: {
        limit: 10,
      },
    }
    const { data } = await axios(config)
    const albums = data.items.map((album) => {
      return {
        id: album.id,
        name: album.name,
        artists: album.artists,
        type: album.album_type,
        images: album.images,
        uri: album.uri,
      }
    })
    res.send(albums)
  } catch (err) {
    console.log(err)
  }
})

router.get('/get-users-playlists', async (req, res) => {
  const { spotifyAccessToken } = req.user
  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/me/playlists`,
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
    params: {
      limit: 50,
    },
  }
  const { data } = await axios(config)
  const playlists = data.items.map((playlist) => {
    return {
      name: playlist.name,
      images: playlist.images,
      owner: playlist.owner,
      tracks: playlist.tracks,
      uri: playlist.uri,
      id: playlist.id,
    }
  })
  res.send(playlists)
})

router.get('/get-users-tracks', async (req, res) => {
  const spotifyAccessToken =
    'BQA5tE4z9F-bBqgl3BKVEVyx9qqkkbRLx-TiXndhHu0aAnWeNEpLiZ-pUIBjRcQNfPaOlj5M3f3W9FopmmcBmMIMjJpxmlgZOrDQU0SzAiBYYeUoykaOg1FCJ45yRP6FAyZ4dgRrAPpZ_6Ev63Et6aT5WvKNReRG7pgxD-MU9BuwNmrrQzeNfyonDkBoAbeeq2OOZxZ8hDb9IbMMkvkMmZ5i4RW-VwU00cwmlKz9y8z7hbgXq9F3nhFUhTprbM1cAfbsrX4HE7QJ1IrCdMulfNQbw52hjVB4t5BjvxWFMDWHNt0'
  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/me/tracks`,
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
    params: {
      limit: 50,
    },
  }
  const { data } = await axios(config)
  const names = data.items.map(({ track }) => {
    return track.name
  })
  res.send(names)
})

module.exports = router
