const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  spotifyId: String,
  name: String,
  email: String,
  accessToken: String,
  refreshToken: String,
  accessTokenExpiresIn: Date,
})

module.exports = mongoose.model('User', UserSchema)
