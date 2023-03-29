const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const Chat = require('../models/chat')

router.get('/', async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id).populate({
    path: 'chats',
    model: Chat,
    populate: { path: 'recipients' },
  })
  const chats = user.chats.map((chat) => {
    const recipient = chat.recipients.filter(
      (recipient) => recipient.name !== user.name
    )
    return {
      id: chat._id,
      name: recipient[0].name,
      recipientId: recipient[0]._id,
      newestMessage: chat.messages[0].message,
    }
  })
  console.log(chats[0])
  res.json(chats)
})

router.get('/full-chat', async (req, res) => {
  const { _id } = req.user
  const { chatId } = req.query
  const user = await User.findById(_id)
  const fullChat = await Chat.findById(chatId)
  const messages = fullChat.messages.map((msg) => {
    return {
      message: msg.message,
      sendByUser: msg.sender.toString() == user._id.toString(),
    }
  })
  res.json(messages)
})

router.post('/', async (req, res) => {
  const { _id } = req.user
  const { chatId } = req.query
  const { message } = req.body
  const chat = await Chat.findById(chatId)
  const chatMsg = {
    message: message,
    sender: _id,
  }
  chat.messages.push(chatMsg)
  await chat.save()
})

module.exports = router
