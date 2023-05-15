const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatSchema = new Schema({
  recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  sharedPlaylist: String,
  lastUpdated: {
    type: Date,
    default: Date.now(),
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
      readByReciever: Boolean,
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
