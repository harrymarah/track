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

router.get('/friends', async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'friends',
  })
  const friendsData = await Promise.all(
    user.friends.map(async (friend) => {
      const chat = await Chat.findOne({ recipients: [user._id, friend._id] })
      return {
        id: friend._id,
        name: friend.name,
        spotifyId: friend.spotifyId,
        chatId: chat._id,
      }
    })
  )
  res.send(friendsData)
})

router.post('/friends', async (req, res) => {
  try {
    const { username } = req.body
    const user = await User.findById(req.user._id)
    const newFriend = await User.findOne({ spotifyId: username })
    if (!newFriend) {
      res.status(404).json({ error: 'User not found' })
    } else if (user._id.toString() === newFriend._id.toString()) {
      res.status(400).json({ error: 'You cannot add yourself as a friend' })
    } else {
      const newSentRequest = await new Request({
        user: newFriend._id,
        sentByUser: true,
      }).save()
      const newIncomingRequest = await new Request({
        user: user._id,
        sentByUser: false,
      }).save()
      user.requests.push(newSentRequest)
      newFriend.requests.push(newIncomingRequest)
      await user.save()
      await newFriend.save()
      res.sendStatus(200)
    }
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err.message })
  }
})

router.delete('/friends', async (req, res) => {
  try {
    const { friendId, chatId } = req.body
    const user = await User.findByIdAndUpdate(req.user._id, {
      $pull: { friends: friendId, chats: chatId },
    })
    const friend = await User.findByIdAndUpdate(friendId, {
      $pull: { friends: user._id, chats: chatId },
    })
    const chat = await Chat.findByIdAndDelete(chatId)
    res.sendStatus(200)
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err.message })
    console.error(err)
  }
})

router.get('/requests', async (req, res) => {
  const user = await User.findOne({ spotifyId: 'harrymarah' }).populate({
    path: 'requests',
  })
  res.send(user)
})

module.exports = router
