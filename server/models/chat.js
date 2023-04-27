const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatSchema = new Schema({
  recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  sharedPlaylist: {
    type: String,
    default: undefined,
  },
  messages: [
    {
      message: {
        type: String,
        timestamps: true,
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      isSong: {
        type: Boolean,
        default: false,
      },
      songName: String,
      artist: String,
      album: String,
      artworkUrl: String,
      uri: String,
    },
  ],
})

module.exports = mongoose.model('Chat', ChatSchema)
