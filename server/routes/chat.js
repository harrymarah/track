const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const Chat = require('../models/chat')

router.get('/get-chats', async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id).populate({
    path: 'chats',
    model: Chat,
    populate: { path: 'recipients' },
  })
  const chats = user.chats.map((chat) => {
    return {
      id: chat._id,
      name: chat.recipients.filter(
        (recipient) => recipient.name !== user.name
      )[0].name,
      newestMessage: chat.messages[0].message,
    }
  })
  res.json(chats)
})

router.get('/get-full-chat', async (req, res) => {
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

module.exports = router
