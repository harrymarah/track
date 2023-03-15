const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  spotifyId: String,
  name: String,
  email: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
  deviceId: String,
  friends: [
    {
      friend: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      isAccepted: Boolean,
    },
  ],
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
  ],
})

module.exports = mongoose.model('User', UserSchema)
