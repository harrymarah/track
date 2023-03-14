require('dotenv').config()

const express = require('express')
const app = express()
const https = require('https')
const http = require('http')
const fs = require('fs')
const connectDB = require('./config/db')
const initChatSocket = require('./config/chat')
const passport = require('passport')
require('./config/passport')(passport)
const session = require('express-session')
const cors = require('cors')
const { server, client, db } = require('./config/config')
const auth = require('./routes/auth')
const player = require('./routes/player')
const search = require('./routes/search')
const data = require('./routes/data')
const MongoStore = require('connect-mongo')

connectDB()

const appServer = http.createServer(app)

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla',
    store: MongoStore.create({ mongoUrl: db.url }),
    cookie: {
      maxAge: 6 * 60 * 60 * 1000,
    },
  })
)

app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

initChatSocket(appServer)

app.use('/auth', auth)
app.use('/player', player)
app.use('/search', search)
app.use('/data', data)

app.get('/', (req, res) => {
  res.send('hello from the server bbz ')
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  if (!err.message) err.message = 'Oh no! Something went wrong!'
  res.status(statusCode).json({ error: err.message })
})

appServer.listen(parseInt(server.port, server.host), () => {
  console.log(
    `Server connection successful, listening at ${server.host}:${server.port}`
  )
})

// app.enable('trust proxy')
// app.use(function (req, res, next) {
//   if (!req.secure) {
//     res.redirect('https://' + req.headers.host + req.url)
//   }
//   next()
// })
//
// const options = {
//   key: fs.readFileSync(`./certificates/${server.host}-key.pem`),
//   cert: fs.readFileSync(`./certificates/${server.host}.pem`),
// }

// https
//   .createServer(options, function (req, res) {
//     res.writeHead(200)
//   })
//   .listen(parseInt(server.port), server.host, () => {
//     console.log(
//       `Server connection successful, listening at ${server.host}:${server.port}`
//     )
//   })
//
// ADD TO CLIENT PACKAGE.JSON IF HOSTING ON NETWORK
// "start": "HTTPS=true SSL_CRT_FILE=./certificates/192.168.1.19.pem SSL_KEY_FILE=./certificates/192.168.1.19-key.pem react-scripts start",
