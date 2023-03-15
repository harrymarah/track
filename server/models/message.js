const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  messages: [
    {
      type: String,
      timestamps: true,
    },
  ],
})

module.exports = mongoose.model('Chat', ChatSchema)
