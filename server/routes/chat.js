const express = require('express')
const {
  sendChatsOverview,
  sendFullChat,
  addMessageToChat,
  addSongToChat,
  sendFriendsList,
  createFriendRequest,
  deleteFriendAndChat,
  sendPendingRequests,
  acceptFriendRequest,
  rejectFriendRequest,
} = require('../controller/chat')
const router = express.Router()

// DELETE ME
const User = require('../models/user')
const Chat = require('../models/chat')
const Request = require('../models/request')

router.route('/').get(sendChatsOverview).post(addMessageToChat)

router.get('/full-chat', sendFullChat)

router.post('/share-song', addSongToChat)

router
  .route('/friends')
  .get(sendFriendsList)
  .post(createFriendRequest)
  .delete(deleteFriendAndChat)

router.post('/friendstest', async (req, res) => {
  try {
    const { username } = req.query
    const user = await User.findOne({ spotifyId: username })
    const newFriend = await User.findOne({ spotifyId: 'harrymarah' })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else if (user._id.toString() === newFriend._id.toString()) {
      res.status(400).json({ error: 'You cannot add yourself as a friend' })
    } else {
      const newRequest = await new Request({
        sentFrom: user._id,
        sentTo: newFriend._id,
      }).save()
      user.requests.push(newRequest)
      newFriend.requests.push(newRequest)
      await user.save()
      await newFriend.save()
      res.status(200).send('request sucessful')
    }
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err.message })
  }
})

router.post('/requeststest', async (req, res) => {
  try {
    const { requestId } = req.body
    const friendRequest = await Request.findById(requestId)
    const [user1, user2] = await User.find({ requests: requestId })
    const chat = new Chat({
      recipients: [user1, user2],
      sharedPlaylist: friendRequest.playlistId,
      messages: [],
    })
    user1.friends.push(user2)
    user2.friends.push(user1)
    user1.chats.push(chat)
    user2.chats.push(chat)
    user1.requests.pull(requestId)
    user2.requests.pull(requestId)
    await user1.save()
    await user2.save()
    await chat.save()
    await Request.findByIdAndDelete(requestId)
    res.sendStatus(200)
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err.message })
    console.error(err)
  }
})

router
  .route('/requests')
  .get(sendPendingRequests)
  .post(acceptFriendRequest)
  .delete(rejectFriendRequest)

module.exports = router
