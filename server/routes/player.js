const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const { spotify, client } = require('../config/config')
const ExpressError = require('../utils/ExpressError')

router.put('/playsong', async (req, res) => {
  console.log('request recieved')
  try {
    const { deviceId, uri } = req.body
    const { accessToken } = req.user
    const data = JSON.stringify({
      uris: [uri],
      position_ms: 0,
    })
    const config = {
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }
    const response = await axios(config)
    return res.sendStatus(response.status)
  } catch (e) {
    console.error(e)
  }
})

router.post('/device-id', async (req, res) => {
  const { deviceId } = req.body
  const user = await User.findOneAndUpdate(
    // { spotifyId: req.user.spotifyId },
    { spotifyId: 'harrymarah' },
    { deviceId: deviceId }
  )
  res.sendStatus(200)
})

module.exports = router
