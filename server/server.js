require('dotenv').config()

const express = require('express')
const app = express()
const querystring = require('query-string')
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy

const client_id = process.env.SPOTIFY_CLIENT_ID
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const port = 3001
const User = {}

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
        return done(err, user)
      })
    }
  )
)

app.get('/', (req, res) => {
  res.send('home page')
})

app.get('/auth/spotify', passport.authenticate('spotify'))

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('/')
  }
)

app.listen(port, () => {
  console.log(`Server connection successful, listening on port ${port}`)
})

console.log(redirect_uri)
