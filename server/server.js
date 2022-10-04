require('dotenv').config()

const express = require('express')
const app = express()
const querystring = require('query-string')
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const session = require('express-session')
const mongoose = require('mongoose')
const User = require('./models/user')

const client_id = process.env.SPOTIFY_CLIENT_ID
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const dbUrl = process.env.MONGO_DB_URL
const port = process.env.PORT || 3001

mongoose.connect(dbUrl)

const db = mongoose.connection
db.on('error', console.log.bind(console, 'database connection error'))
db.once('open', () => {
  console.log('Database connection successful')
})

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

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      console.log(profile)

      const spotifyId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value

      const existingUser = await User.findOne({ spotifyId: profile.id })

      if (existingUser) {
        return done(null, existingUser)
      }

      const user = await new User({
        spotifyId,
        name,
        email,
        accessToken,
        refreshToken,
      }).save()

      done(null, user)
    }
  )
)

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.get('/', (req, res) => {
  res.send('home page')
})

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-read-collaborative',
    ],
  })
)

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/')
  }
)

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server connection successful, listening on port ${port}`)
})
