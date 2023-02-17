const express = require('express')
const router = express.Router()
const passport = require('passport')
const axios = require('axios')
const qs = require('qs')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')
const { spotify, client, auth } = require('../config/config')
const { isAuth } = require('../middleware/isAuth')

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

router.get('/verifyuser', isAuth, (req, res) => {
  return res.json({
    authenticated: req.isAuthenticated(),
    username: req.user.spotifyId,
  })
})

router.get('/spotifytoken', isAuth, async (req, res) => {
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

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: `${client.url}/login`,
  }),
  (req, res) => {
    res.cookie('isAuthenticated', req.isAuthenticated(), {
      httpOnly: false,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
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
  req.session.destroy()
  res.clearCookie('isAuthenticated')
  req.logout((e) => {
    if (e) return next(e)
    res.status(200).json({
      logout: 'successful',
    })
  })
})

module.exports = router
