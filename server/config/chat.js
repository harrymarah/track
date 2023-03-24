const { Server } = require('socket.io')
const { client } = require('./config')
const { sessionMiddleware, wrap } = require('../middleware')

module.exports = initChatSocket = (server, passport) => {
  const io = new Server(server, {
    cors: {
      origin: client.url,
    },
  })
  io.use(wrap(sessionMiddleware))
  io.use(wrap(passport.initialize()))
  io.use(wrap(passport.session()))
  io.use((socket, next) => {
    if (socket.request.user) {
      next()
    } else {
      next(new Error('unauthorized'))
    }
  })
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('send_message', (data) => {
      console.log(data)
    })
  })
}
