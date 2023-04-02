const mongoose = require('mongoose')
const { Schema } = mongoose

const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sentByUser: Boolean,
})

module.exports = mongoose.model('Request', RequestSchema)
