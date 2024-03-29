const axios = require('axios')
const User = require('../models/user')

module.exports.playSong = async (req, res) => {
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
}
module.exports.playAlbum = async (req, res) => {
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
}

module.exports.setDeviceId = async (req, res) => {
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
}

module.exports.addSongToQueue = async (req, res) => {
  try {
    const { spotifyAccessToken, deviceId } = req.user
    const { uri } = req.body
    const config = {
      method: 'post',
      url: `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${deviceId}`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await axios(config)
    return res.sendStatus(response.status)
  } catch (err) {
    res.status(err?.response.status || 500).json({ error: err.message })
  }
}
