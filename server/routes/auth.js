const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')

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
  const user = await User.findOne({ spotifyId: req.user?.spotifyId })
  if (user) {
    return res.json({
      access_token: user.accessToken,
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
