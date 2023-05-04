const express = require('express')
const router = express.Router()
const {
  sendAlbumTracks,
  sendPlaylistTracks,
  sendArtistTopTracks,
  sendAlbumsByArtist,
  sendUsersPlaylists,
  sendUsersTopTracks,
  sendTopEightTracks,
  sendRecentlyPlayed,
  sendFeaturedPlaylists,
  sendRecommendations,
} = require('../controller/data')

router.get('/get-album-tracks', sendAlbumTracks)

router.get('/get-playlist-tracks', sendPlaylistTracks)

router.get('/get-artist-top-tracks', sendArtistTopTracks)

router.get('/get-artist-albums', sendAlbumsByArtist)

router.get('/get-users-playlists', sendUsersPlaylists)

router.get('/get-users-tracks', sendUsersTopTracks)

router.get('/get-user-top-eight', sendTopEightTracks)

router.get('/get-recently-played', sendRecentlyPlayed)

router.get('/get-featured-playlists', sendFeaturedPlaylists)

router.get('/get-recommendations', sendRecommendations)

module.exports = router
