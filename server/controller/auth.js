const User = require('../models/user')
const { client } = require('../config/config')
const passport = require('passport')

module.exports.verifyUser = (req, res) => {
  return res.json({
    authenticated: req.isAuthenticated(),
    username: req.user.spotifyId,
  })
}

module.exports.sendSpotifyToken = async (req, res) => {
  if (!req.user) return res.sendStatus(401)
  try {
    const { spotifyId } = req.user
    const user = await User.findOne({ spotifyId: spotifyId })
    res.json({
      spotifyAccessToken: user.spotifyAccessToken,
    })
  } catch (err) {
    res.status(err?.response.status || 500).json({ error: err.message })
  }
}

module.exports.logUserOut = async (req, res, next) => {
  const { user } = req
  if (user) {
    user.spotifyAccessToken = null
    user.spotifyRefreshToken = null
    user.accessTokenExpiresIn = null
    user.deviceId = null
    user.save()
  }
  req.session.destroy()
  res.clearCookie('isAuthenticated')
  req.logout((e) => {
    if (e) return next(e)
    res.status(200).json({
      logout: 'successful',
    })
  })
}
