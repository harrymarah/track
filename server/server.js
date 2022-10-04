require('dotenv').config()

const express = require('express')
const app = express()
const querystring = require('query-string')
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const session = require('express-session')

const client_id = process.env.SPOTIFY_CLIENT_ID
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const port = 3001
const User = {}

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla',
  })
)

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
      process.nextTick(function () {
        return done(null, profile)
      })
    }
  )
)

app.get('/', (req, res) => {
  res.send('home page')
})

app.get('/testing', (req, res) => {
  res.send('test page')
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
