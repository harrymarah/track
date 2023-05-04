const axios = require('axios')
const User = require('../models/user')
const Chat = require('../models/chat')
const Request = require('../models/request')
const fs = require('fs')
const encodedImage = fs.readFileSync(
  './assets/track-collab-playlist.jpg',
  'base64'
)

module.exports.sendChatsOverview = async (req, res) => {
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
        newestMessage:
          chat.messages[chat.messages.length - 1]?.message || 'no messages',
      }
    })
    res.json(chats)
  } catch (err) {
    console.error(err)
  }
}

module.exports.sendFullChat = async (req, res) => {
  try {
    const { _id } = req.user
    const { chatId } = req.query
    const user = await User.findById(_id)
    const fullChat = await Chat.findById(chatId)
    const messages = fullChat.messages.map((msg) => {
      return {
        message: msg.message,
        sendByUser: msg.sender.toString() == user._id.toString(),
        isSong: msg.isSong,
        songName: msg.songName,
        artist: msg.artist,
        album: msg.album,
        artworkUrl: msg.artworkUrl,
        uri: msg.uri,
      }
    })
    res.json(messages)
  } catch (err) {
    console.error(err)
  }
}

module.exports.addMessageToChat = async (req, res) => {
  try {
    const { _id } = req.user
    const { chatId } = req.query
    const { message, isSong = false } = req.body
    const chat = await Chat.findById(chatId)
    const chatMsg = {
      message: message,
      sender: _id,
      isSong: isSong,
    }
    chat.messages.push(chatMsg)
    await chat.save()
  } catch (err) {
    console.error(err)
  }
}

const addSongToSharedPlaylist = async (chat, songUri, spotifyAccessToken) => {
  if (!chat.sharedPlaylist) return
  const data = JSON.stringify({
    uris: [songUri],
    position: 0,
  })
  const config = {
    url: `https://api.spotify.com/v1/playlists/${chat.sharedPlaylist}/tracks`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      'Content-Type': 'application/json',
    },
    data: data,
  }
  return await axios(config)
}

module.exports.addSongToChat = async (req, res) => {
  try {
    const { _id, name, spotifyAccessToken } = req.user
    const { songName, artists, album, artworkUrl, songUri, chatId } = req.body
    const chat = await Chat.findById(chatId)
    const songMsg = {
      message: `${name} shared ${songName} by ${artists}`,
      sender: _id,
      isSong: true,
      songName: songName,
      artist: artists,
      album: album,
      artworkUrl: artworkUrl,
      uri: songUri,
    }
    chat.messages.push(songMsg)
    await chat.save()
    await addSongToSharedPlaylist(chat, songUri, spotifyAccessToken)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
  }
}

module.exports.sendFriendsList = async (req, res) => {
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
}
const addPlaylistArtwork = async (playlistId, accessToken) => {
  const data = encodedImage
  const config = {
    url: `https://api.spotify.com/v1/playlists/${playlistId}/images`,
    method: 'put',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'image/jpeg',
    },
    data: data,
  }
  await axios(config)
}

const createCollaborativePlaylist = async (user, newFriend, friendRequest) => {
  const data = JSON.stringify({
    name: `${user.spotifyId} + ${newFriend.spotifyId}`,
    public: false,
    collaborative: true,
    description: `${user.spotifyId} and ${newFriend.spotifyId}'s shared playlist created with track`,
  })
  const config = {
    url: `https://api.spotify.com/v1/users/${user.spotifyId}/playlists`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${user.spotifyAccessToken}`,
      'Content-Type': 'application/json',
    },
    data: data,
  }
  const response = await axios(config)
  const playlistId = response.data.id
  friendRequest.playlistId = playlistId
  await friendRequest.save()
  await addPlaylistArtwork(playlistId, user.spotifyAccessToken)
}

module.exports.createFriendRequest = async (req, res) => {
  try {
    const { username } = req.body
    const user = await User.findById(req.user._id)
    const newFriend = await User.findOne({ spotifyId: username })
    if (!newFriend) {
      res.status(404).json({ error: 'User not found' })
    } else if (user._id.toString() === newFriend._id.toString()) {
      res.status(400).json({ error: 'You cannot add yourself as a friend' })
      // add check to check if users are already friends
    } else {
      const newRequest = await new Request({
        sentFrom: user._id,
        sentTo: newFriend._id,
      }).save()
      user.requests.push(newRequest)
      newFriend.requests.push(newRequest)
      await user.save()
      await newFriend.save()
      await createCollaborativePlaylist(user, newFriend, newRequest)
      res.sendStatus(200)
    }
  } catch (err) {
    console.error(err)
    res.status(err?.response?.status || 500).json({ error: err.message })
  }
}

module.exports.deleteFriendAndChat = async (req, res) => {
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
}

module.exports.sendPendingRequests = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'requests',
    populate: [{ path: 'sentFrom' }, { path: 'sentTo' }],
  })
  const splitRequests = (requests) => {
    let sentByUser = []
    let sentToUser = []
    requests.forEach((request) => {
      if (request.sentFrom._id.toString() === user._id.toString()) {
        sentByUser.push(request)
      } else {
        sentToUser.push(request)
      }
    })
    return [sentByUser, sentToUser]
  }
  const [sentByUser, sentToUser] = splitRequests(user.requests)
  const requestsData = {
    sentByUser: sentByUser.map((request) => {
      return {
        requestId: request._id,
        userId: request.sentTo._id,
        username: request.sentTo.spotifyId,
      }
    }),
    sentToUser: sentToUser.map((request) => {
      return {
        requestId: request._id,
        userId: request.sentFrom._id,
        username: request.sentFrom.spotifyId,
      }
    }),
  }

  res.send(requestsData)
}

const followCollaborativePlaylist = async (
  friendRequest,
  spotifyAccessToken,
  requestId
) => {
  const { playlistId } = friendRequest
  const config = {
    url: `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
    method: 'put',
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      'Content-Type': 'application/json',
    },
  }
  const response = await axios(config)
}

module.exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body
    const { spotifyAccessToken } = req.user
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
    await followCollaborativePlaylist(
      friendRequest,
      spotifyAccessToken,
      requestId
    )
    await user1.save()
    await user2.save()
    await chat.save()
    await Request.findByIdAndDelete(requestId)
    res.sendStatus(200)
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err.message })
    console.error(err)
  }
}

module.exports.rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body
    const [user1, user2] = await User.find({ requests: requestId })
    user1.requests.pull(requestId)
    user2.requests.pull(requestId)
    const request = await Request.findByIdAndDelete(requestId)
    res.sendStatus(200)
  } catch (err) {
    res.status(err?.response?.status || 500).json({ error: err.message })
    console.error(err)
  }
}
