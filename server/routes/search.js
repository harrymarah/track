const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')
const { spotify, client } = require('../config/config')
const getRefreshToken = require('../utils/getRefreshToken')

router.get('/', async (req, res) => {
  console.log('***********')
  console.log(req.user)
  console.log(req.session)
  console.log('***********')
  let results = {}
  const { accessToken } = req.user
  const { searchTerm, track, artist, album, playlist } = req.query
  const config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: searchTerm,
      include_external: 'audio',
      offset: 0,
    },
  }
  if (track === 'true') {
    config.params.type = 'track'
    config.params.limit = 10
    const { data } = await axios(config)
    results.tracks = data.tracks
  }
  if (artist === 'true') {
    config.params.type = 'artist'
    config.params.limit = 1
    const { data } = await axios(config)
    results.artists = data.artists
  }
  if (album === 'true') {
    config.params.type = 'album'
    config.params.limit = 5
    const { data } = await axios(config)
    results.albums = data.albums
  }
  if (playlist === 'true') {
    config.params.type = 'playlist'
    config.params.limit = 3
    const { data } = await axios(config)
    results.playlists = data.playlists
  }
  res.send(results)
})

module.exports = router
