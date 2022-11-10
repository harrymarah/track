const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const { spotify, client } = require('../config/config')
const ExpressError = require('../utils/ExpressError')

router.put('/playsong', async (req, res) => {
  console.log('request recieved')
  try {
    console.log(req.body)
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

module.exports = router
