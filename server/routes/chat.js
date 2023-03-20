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
  console.log(chats)
  res.json(chats)
})

module.exports = router
