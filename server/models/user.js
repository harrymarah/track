const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  spotifyId: String,
  name: String,
  email: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
  clientAccessToken: String,
  clientRefreshToken: String,
  // accessTokenExpiry: Date,
  deviceId: String,
})

module.exports = mongoose.model('User', UserSchema)
