const express = require('express')
const router = express.Router()
const passport = require('passport')
const axios = require('axios')
const qs = require('qs')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')
const { spotify, client } = require('../config/config')
const getRefreshToken = require('../utils/getRefreshToken')

router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-read-collaborative',
    ],
  })
)

router.get('/token', async (req, res) => {
  if (!req.user) return res.json({ access_token: null })
  const user = await User.findOne({ spotifyId: req.user.spotifyId })
  if (user) {
    const expiresIn = new Date(user.accessTokenExpiresIn)
    // request a new access token 5 minutes (300000ms) before the current token expires
    if (Date.now() > expiresIn.getTime() - 300000) {
      getRefreshToken(req.user)
    }
    return res.json({
      access_token: user.accessToken,
      expires_in: user.accessTokenExpiresIn,
    })
  }
})

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
  const user = await User.findOneAndUpdate(
    { spotifyId: req.user.spotifyId },
    { accessToken: null, refreshToken: null, accessTokenExpiresIn: null }
  )
  req.logout((e) => {
    if (e) return next(e)
    res.json({ message: 'ok' })
  })
})

module.exports = router
