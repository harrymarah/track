const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const { spotify, client } = require('../config/config')
const ExpressError = require('../utils/ExpressError')

router.get('/get-album-tracks', async (req, res) => {
  try {
    const spotifyAccessToken =
      'BQDZu4uhPAynMycYTtZAuELbUk_LyoBewMkSkOTO4elUflTMmMKMtQvDnPvUNBpCFW4cyAdgHApRXrM4OjRA1HbRltQ_FgdmpTg2BcFPJ8J9Uq3AV3HTtCY8MVVPDMJo0Rfnj45zoj8p2Oqal76BAx9DmhnZTLrXU1Jp0URcEmGUdK3bu_mkpaxN1nfKh4u2TsvZC6Z_CWMBzw'
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
    res.send(trackList)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
