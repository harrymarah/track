const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const { spotify, client } = require('../config/config')
const ExpressError = require('../utils/ExpressError')

router.get('/get-album-tracks', async (req, res) => {
  console.log('route hit')
  try {
    const spotifyAccessToken =
      'BQDAK7gzRoFWgwgsdnJwQCIsQhLCNRafZgcjGRxFDYeDaDjTR6Lrh0bEW653_wKbYATp4YPjqp-v6pgf0m1_szp2A2CVcxpKwDR-DIitRdHz2iUX_ZVb9PsNPWhTNuC0k7G6SmwswEOvn-KE8bMiVwkQMw-ojuZyoFvjFhI13KCO2zbhH8pDzs08FhyMotaZg_cwTe5CI20P2A'
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

module.exports = router
