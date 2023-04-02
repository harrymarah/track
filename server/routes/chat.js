const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/user')
const Chat = require('../models/chat')
const Request = require('../models/request')
const ExpressError = require('../')

router.get('/', async (req, res) => {
  try {
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
        newestMessage: chat.messages[chat.messages.length - 1].message,
      }
    })
    console.log(chats)
    res.json(chats)
  } catch (err) {
    console.error(err)
  }
})

router.get('/full-chat', async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err)
  }
})

router.post('/', async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err)
  }
})

router.post('/add-user', async (req, res) => {
  try {
    const { username } = req.body
    const user = await User.findById(req.user._id)
    const newFriend = await User.findOne({ spotifyId: username })
    if (!newFriend) {
      res.status(404).json({ error: 'User not found' })
    } else if (user._id.toString() === newFriend._id.toString()) {
      res.status(400).json({ error: 'You cannot add yourself as a friend' })
    } else {
      const newSentRequest = new Request({
        user: newFriend._id,
        sentByUser: true,
      })
      const newIncomingRequest = new Request({
        user: user._id,
        sentByUser: false,
      })
      user.requests.push(newSentRequest)
      newFriend.requests.push(newIncomingRequest)
      await newSentRequest.save()
      await newIncomingRequest.save()
      await user.save()
      await newFriend.save()
      res.sendStatus(200)
    }
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err.message })
  }
})

router.get('/requests', async (req, res) => {
  const user = await User.findOne({ spotifyId: 'harrymarah' }).populate({
    path: 'requests',
  })
  res.send(user)
})

module.exports = router
