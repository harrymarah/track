require('dotenv').config()

const express = require('express')
const app = express()
const querystring = require('query-string')
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const session = require('express-session')
const mongoose = require('mongoose')
const User = require('./models/user')
const cors = require('cors')
const { findOneAndUpdate } = require('./models/user')

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

app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      console.log(expires_in)
      const spotifyId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value

      const existingUser = await User.findOne({ spotifyId: profile.id })

      if (existingUser) {
        existingUser.accessToken = accessToken
        existingUser.refreshToken = refreshToken
        existingUser.accessTokenExpiresIn = Date.now() + expires_in * 1000
        await existingUser.save()
        return done(null, existingUser)
      }

      const user = await new User({
        spotifyId,
        name,
        email,
        accessToken,
        refreshToken,
        accessTokenExpiresIn: Date.now() + expires_in * 1000,
      }).save()

      done(null, user)
    }
  )
)

app.get('/', (req, res) => {
  res.send('home page')
})

app.get('/auth/proxytest', (req, res) => {
  console.log('route hit!!!')
  res.json({
    response: 'thisisworking!',
  })
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

app.get('/auth/token', async (req, res) => {
  const user = await User.findOne({ spotifyId: req.user?.spotifyId })
  console.log('access token requested')
  console.log(user.accessToken)
  if (user) {
    return res.json({
      access_token: user.accessToken,
    })
  } else {
    return { access_token: null }
  }
})

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/')
  }
)

app.post('/logout', async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { spotifyId: req.user.spotifyId },
    { accessToken: null, refreshToken: null, accessTokenExpiresIn: null }
  )
  req.logout((e) => {
    if (e) return next(e)
    res.redirect('http://localhost:3000/login')
  })
})

app.listen(port, () => {
  console.log(`Server connection successful, listening on port ${port}`)
})
