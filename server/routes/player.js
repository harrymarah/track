const express = require('express')
const router = express.Router()
const {
  playSong,
  playAlbum,
  setDeviceId,
  addSongToQueue,
} = require('../controller/player')
const { isAuth } = require('../middleware')

router.put('/playsong', isAuth, playSong)

router.put('/playalbum', isAuth, playAlbum)

router.post('/device-id', isAuth, setDeviceId)

router.put('/queue-song', isAuth, addSongToQueue)

module.exports = router
