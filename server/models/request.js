const mongoose = require('mongoose')
const { Schema } = mongoose

const RequestSchema = new Schema({
  sentFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sentTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Request', RequestSchema)
