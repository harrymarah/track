const express = require('express')
const catchAsync = require('../utils/catchAsync')

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

router.get('/get-album-tracks', catchAsync(sendAlbumTracks))

router.get('/get-playlist-tracks', catchAsync(sendPlaylistTracks))

router.get('/get-artist-top-tracks', catchAsync(sendArtistTopTracks))

router.get('/get-artist-albums', catchAsync(sendAlbumsByArtist))

router.get('/get-users-playlists', catchAsync(sendUsersPlaylists))

router.get('/get-users-tracks', catchAsync(sendUsersTopTracks))

router.get('/get-user-top-eight', catchAsync(sendTopEightTracks))

router.get('/get-recently-played', catchAsync(sendRecentlyPlayed))

router.get('/get-featured-playlists', catchAsync(sendFeaturedPlaylists))

router.get('/get-recommendations', catchAsync(sendRecommendations))

module.exports = router
