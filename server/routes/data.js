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
    // const spotifyAccessToken =
    //   'BQD_vo71EKKBY8JlSjHRR1zGa9gKTjMvcSf9HIe2CNqIgMbc2w5Hse1AXqnLQ4uF5ChII1tJ0ohDbNACj0fqwWbZjiVcgNNgnBVYB4-Iq1aBAI4DAgg8smn-nSnbWEimcmT8lJLFee7ndcwZxee15ESp2e_SspWrR4GCNUXfDkP4uLN1O-ZVC0nqkZiX0YEza48mlTJYt13OVjM'
    // const playlistId = '1Fy5p1KbV1XBE16GKF9jOS'
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

module.exports = router
