const express = require('express')
const router = express.Router()
const passport = require('passport')
const axios = require('axios')
const qs = require('qs')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')
const { spotify, client, auth } = require('../config/config')
const getRefreshToken = require('../utils/getRefreshToken')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middleware/authenticateToken')

router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-read-collaborative',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'streaming',
    ],
  })
)

router.get('/loggedin', (req, res) => {
  console.log(req)
  res.send(req.user)
})

router.get('/token', async (req, res) => {
  if (!req.user) return res.sendStatus(401)
  try {
    const { spotifyId } = req.user
    const user = await User.findOne({ spotifyId: spotifyId })
    if (user) {
      const accessToken = generateToken(
        user.spotifyId,
        auth.accessTokenSecret,
        '1h'
      )
      const refreshToken = generateToken(
        user.spotifyId,
        auth.refreshTokenSecret,
        '1d'
      )
      user.clientAccessToken = accessToken
      user.clientRefreshToken = refreshToken
      user.save()
      return res.json({
        username: spotifyId,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    }
  } catch (err) {
    res.status(err?.response.status || 500).json({ error: err.message })
  }
})

router.get('/spotifytoken', authenticateToken, async (req, res) => {
  if (!req.user) return res.sendStatus(401)
  try {
    const { spotifyId } = req.user
    const user = await User.findOne({ spotifyId: spotifyId })
    console.log(user.spotifyAccessToken)
    res.json({
      spotifyAccessToken: user.spotifyAccessToken,
    })
  } catch (err) {
    res.status(err?.response.status || 500).json({ error: err.message })
  }
})

function generateToken(payload, secret, expiresIn) {
  return jwt.sign({ username: payload }, secret, { expiresIn: expiresIn })
}

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: `${client.url}/login`,
  }),
  (req, res) => {
    res.redirect(`${client.url}`)
  }
)

router.post('/logout', async (req, res, next) => {
  const user = req.user
  if (user) {
    user.spotifyAccessToken = null
    user.spotifyRefreshToken = null
    user.accessTokenExpiresIn = null
    user.clientAccessToken = null
    user.clientRefreshToken = null
    user.deviceId = null
    user.save()
  }
  req.logout((e) => {
    if (e) return next(e)
    res.status(200).json({
      logout: 'successful',
    })
  })
})

module.exports = router
