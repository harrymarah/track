const express = require('express')
const router = express.Router()
const {
  sendAlbumTracks,
  sendPlaylistTracks,
  sendArtistTopTracks,
  sendAlbumsByArtist,
  sendUsersPlaylists,
  sendUsersTopTracks,
} = require('../controller/data')

router.get('/get-album-tracks', sendAlbumTracks)

router.get('/get-playlist-tracks', sendPlaylistTracks)

router.get('/get-artist-top-tracks', sendArtistTopTracks)

router.get('/get-artist-albums', sendAlbumsByArtist)

router.get('/get-users-playlists', sendUsersPlaylists)

router.get('/get-users-tracks', sendUsersTopTracks)

module.exports = router
