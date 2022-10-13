const express = require('express')
const router = express.Router()
const passport = require('passport')
const axios = require('axios')
const qs = require('qs')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')
const { spotify } = require('../config/config')
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
  const user = await User.findOne({ spotifyId: req.user?.spotifyId })
  //refactor this nested if to make more sense
  if (user) {
    const expiresIn = new Date(user.accessTokenExpiresIn)
    if (Date.now() > expiresIn - 300000) {
      console.log('getting refresh token')
      getRefreshToken(req.user)
    }
    return res.json({
      access_token: user.accessToken,
      expires_in: user.accessTokenExpiresIn,
    })
  } else {
    return res.json({ access_token: null })
  }
})

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/')
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
