const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const { findOneAndUpdate } = require('../models/user')
const { spotify } = require('../config/config')
const axios = require('axios')
const { response } = require('express')
const qs = require('qs')

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

router.get('/refreshtoken', async (req, res) => {
  const user = await User.findOne({ spotifyId: req.user?.spotifyId })
  const refreshToken = user.refreshToken
  const credentials = `${spotify.clientId}:${spotify.clientSecret}`
  console.log('********************')
  console.log(Buffer.from(credentials).toString('base64'))
  // const data = qs.stringify({
  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + Buffer.from(credentials).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    json: true,
  }

  axios(authOptions)
    .then((response) => {
      console.log('response.body')
      console.log(response.body)
    })
    .catch((e) => console.log(e))
    .finally(res.send(response))
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
