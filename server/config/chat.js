const { Server } = require('socket.io')
const { client } = require('./config')

module.exports = initChatSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: client.url,
    },
  })
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('send_message', (data) => {
      console.log(data)
    })
  })
}
