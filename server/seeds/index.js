const mongoose = require('mongoose')
const { db } = require('../config/config')
const { names, messages } = require('./seedData')
const User = require('../models/user')
const Chat = require('../models/chat')
const Request = require('../models/request')

mongoose.connect(db.url)

const mongoDb = mongoose.connection

mongoDb.on('error', console.log.bind(console, 'Database connection error'))
mongoDb.once('open', () => {
  console.log('Database connection successful')
})

const seedData = async () => {
  const harrymarah = await User.findOne({ name: 'harrymarah' })
  const randomNumber = (input) => {
    return Math.floor(Math.random() * input.length)
  }
  const randomlyChooseSender = (user1, user2) => {
    const num = Math.floor(Math.random() * 2)
    if (num < 1) {
      return user1
    } else {
      return user2
    }
  }
  await User.deleteMany({ name: { $not: { $eq: 'harrymarah' } } })
  await Chat.deleteMany()
  await Request.deleteMany()
  harrymarah.chats = []
  harrymarah.requests = []
  harrymarah.friends = []
  await harrymarah.save()
  for (let i = 0; i < 6; i++) {
    const { name } = names[randomNumber(names)]
    const username = name.split(' ').join('').toLowerCase()
    const email = username + '@email.com'
    const user = new User({
      spotifyId: username,
      name: name,
      email: email,
      friends: [harrymarah._id],
    })
    await user.save()
  }
  const users = await User.find({ name: { $not: { $eq: 'harrymarah' } } })

  for (let i = 0; i < users.length; i++) {
    const chatMessages = []
    for (let j = 0; j < 20; j++) {
      const message = {
        message: messages[randomNumber(messages)].message,
        sender: randomlyChooseSender(harrymarah._id, users[i]._id),
        isSong: false,
      }
      chatMessages.push(message)
    }
    const lastSender = chatMessages[chatMessages.length - 1].sender
    const chat = new Chat({
      recipients: [harrymarah._id, users[i]._id],
      seenBy: [lastSender],
      messages: chatMessages,
    })
    harrymarah.chats.push(chat)
    users[i].chats.push(chat)
    harrymarah.friends.push(users[i]._id)
    await chat.save()
    await harrymarah.save()
    await users[i].save()
  }
}

seedData().then(() => mongoose.connection.close())
