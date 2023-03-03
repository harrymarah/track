const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const { spotify, client } = require('../config/config')
const ExpressError = require('../utils/ExpressError')
const { isAuth } = require('../middleware/isAuth')

router.put('/playsong', isAuth, async (req, res) => {
  try {
    const { uri } = req.body
    const { spotifyAccessToken, deviceId } = req.user
    const data = JSON.stringify({
      uris: typeof uri === 'string' ? [uri] : [...uri],
      position_ms: 0,
    })
    const config = {
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }
    const response = await axios(config)
    return res.sendStatus(response.status)
  } catch (err) {
    res.status(err?.response.status || 500).json({ error: err.message })
  }
})

router.put('/playalbum', isAuth, async (req, res) => {
  try {
    const { uri } = req.body
    const { spotifyAccessToken, deviceId } = req.user
    const data = JSON.stringify({
      context_uri: uri,
      position_ms: 0,
    })
    const config = {
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }
    const response = await axios(config)
    return res.sendStatus(response.status)
  } catch (err) {
    res.status(err?.response.status || 500).json({ error: err.message })
  }
})

router.post('/device-id', isAuth, async (req, res) => {
  try {
    const { deviceId } = req.body
    const user = await User.findOneAndUpdate(
      { spotifyId: req.user.spotifyId },
      { deviceId: deviceId }
    )
    res.sendStatus(200)
  } catch (err) {
    res.status(err?.response.status || 500).json({ error: err.message })
  }
})

router.get('/get-state', (req, res) => {})
router.put('/transfer-playback', (req, res) => {})
router.get('/currently-playing', (req, res) => {})
router.get('/pause-song', (req, res) => {})
router.get('/play-song', (req, res) => {})
router.post('/next-song', (req, res) => {})
router.post('/prev-song', (req, res) => {})
router.put('/song-position', (req, res) => {})

module.exports = router
