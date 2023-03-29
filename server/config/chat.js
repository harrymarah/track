const { Server } = require('socket.io')
const { client } = require('./config')
const { sessionMiddleware, wrap } = require('../middleware')

module.exports = initChatSocket = (server, passport) => {
  const io = new Server(server, {
    cors: {
      origin: client.url,
      credentials: true,
    },
  })
  io.use(wrap(sessionMiddleware))
  io.use(wrap(passport.initialize()))
  io.use(wrap(passport.session()))
  io.use((socket, next) => {
    if (socket.request.session && socket.request.session.passport.user) {
      socket.user = socket.request.session.passport.user
      next()
    } else {
      next(new Error('unauthorized'))
    }
  })
  io.on('connection', (socket) => {
    socket.join(socket.user._id)

    socket.onAny((event, ...args) => {
      console.log(`got ${event}`)
      console.log(...args)
    })

    socket.on('send_message', ({ message, to }) => {
      socket.to(to).to(socket.user._id).emit('new_message', {
        message: message,
        from: socket.user,
        to: to,
      })
    })
  })
}
