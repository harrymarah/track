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
  const { spotifyId } = req.user
  const user = await User.findOne({ spotifyId: spotifyId })
  if (user) {
    const accessToken = generateToken(user, auth.accessTokenSecret, '1h')
    const refreshToken = generateToken(user, auth.refreshTokenSecret, '1d')
    user.clientAccessToken = accessToken
    user.clientRefreshToken = refreshToken
    user.save()
    return res.json({
      username: spotifyId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    })
  }
})

function generateToken(user, secret, expiresIn) {
  return jwt.sign(user.toJSON(), secret, { expiresIn: expiresIn })
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
  const user = await User.findOneAndUpdate(
    { spotifyId: req.user.spotifyId },
    { accessToken: null, refreshToken: null, accessTokenExpiresIn: null }
  )
  req.logout((e) => {
    if (e) return next(e)
    res.json({ message: 'ok' }).cookie('isLoggedIn', 'false', {
      httpOnly: true,
      secure: false,
      sameSite: false,
    })
  })
})

module.exports = router
