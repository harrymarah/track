const SpotifyStrategy = require('passport-spotify').Strategy
const User = require('../models/user')
const { spotify } = require('./config')

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user)
    })
  })

  passport.use(
    new SpotifyStrategy(
      {
        clientID: spotify.clientId,
        clientSecret: spotify.clientSecret,
        callbackURL: spotify.redirectUri,
      },
      async (accessToken, refreshToken, expires_in, profile, done) => {
        const spotifyId = profile.id
        const name = profile.displayName
        const email = profile.emails[0].value

        const existingUser = await User.findOne({ spotifyId: profile.id })

        if (existingUser) {
          existingUser.spotifyAccessToken = accessToken
          existingUser.spotifyRefreshToken = refreshToken
          existingUser.accessTokenExpiresIn = Date.now() + expires_in * 1000
          await existingUser.save()
          return done(null, existingUser)
        }

        const user = await new User({
          spotifyId,
          name,
          email,
          spotifyAccessToken: accessToken,
          spotifyRefreshToken: refreshToken,
          accessTokenExpiresIn: Date.now() + expires_in * 1000,
        }).save()

        done(null, user)
      }
    )
  )
}
