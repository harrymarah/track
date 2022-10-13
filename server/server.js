require('dotenv').config()

const express = require('express')
const app = express()
const connectDB = require('./config/db')
const passport = require('passport')
require('./config/passport')(passport)
const session = require('express-session')
const cors = require('cors')
const { server, client } = require('./config/config')
const auth = require('./routes/auth')

connectDB()

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla',
  })
)

app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

app.use('/auth', auth)

app.get('/', (req, res) => {
  res.send('home page')
})

app.listen(parseInt(server.port, server.host), () => {
  console.log(
    `Server connection successful, listening at ${server.host}:${server.port}`
  )
})
