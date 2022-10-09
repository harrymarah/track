const mongoose = require('mongoose')
const { db } = require('./config')

mongoose.connect(db.url)

module.exports = connectDB = () => {
  const db = mongoose.connection
  db.on('error', console.log.bind(console, 'Database connection error'))
  db.once('open', () => {
    console.log('Database connection successful')
  })
}
