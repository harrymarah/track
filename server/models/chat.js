const mongoose = require('mongoose')
const { Schema } = mongoose

const ChatSchema = new Schema({
  recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
    },
  ],
})

module.exports = mongoose.model('Chat', ChatSchema)
