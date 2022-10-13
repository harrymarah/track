const axios = require('axios')
const qs = require('qs')
const User = require('../models/user')
const { spotify } = require('../config/config')
const ExpressError = require('./ExpressError')

module.exports = getRefreshToken = async (loggedInUser) => {
  const user = await User.findOne({ spotifyId: loggedInUser.spotifyId })
  const refreshToken = user.refreshToken
  const credentials = `${spotify.clientId}:${spotify.clientSecret}`
  const data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  })
  const config = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${Buffer.from(credentials).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  }
  try {
    const response = await axios(config)
    const { access_token, expires_in } = response.data
    user.accessToken = access_token
    user.accessTokenExpiresIn = Date.now() + expires_in * 1000
    console.log(access_token)
    await user.save()
  } catch (error) {
    console.log(error)
  }
}
