const express = require('express')
const router = express.Router()
const passport = require('passport')
const { spotify, client, auth } = require('../config/config')
const { isAuth } = require('../middleware')
const {
  verifyUser,
  sendSpotifyToken,
  logUserOut,
} = require('../controller/auth')

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
      'user-library-read',
      'user-top-read',
      'user-library-modify',
      'playlist-read-private',
      'playlist-modify-private',
      'playlist-modify-public',
    ],
    showDialog: true,
  })
)

router.get(
  '/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: `${client.url}/login`,
  }),
  (req, res) => {
    try {
      res.cookie('isAuthenticated', req.isAuthenticated(), {
        httpOnly: false,
        sameSite: 'None',
        secure: true,
        maxAge: 6 * 60 * 60 * 1000,
      })
      res.redirect(`${client.url}/home`)
    } catch (err) {
      console.log(err)
      res.clearCookie('isAuthenticated')
      res.redirect(`${client.url}/login`)
    }
  }
)

router.get('/verifyuser', isAuth, verifyUser)

router.get('/spotifytoken', isAuth, sendSpotifyToken)

router.post('/logout', logUserOut)

module.exports = router
