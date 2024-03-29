const axios = require('axios')
const User = require('../models/user')
const { catchExpiredToken } = require('../utils/catchExpiredToken')

module.exports.sendAlbumTracks = async (req, res) => {
  try {
    const { spotifyAccessToken } = req.user
    const { albumId } = req.query
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
      params: {
        limit: 50,
      },
    }
    const { data } = await catchExpiredToken(config)
    const trackList = data.items.map((track) => ({
      trackName: track.name,
      trackUri: track.uri,
    }))
    res.send({ trackList })
  } catch (err) {
    console.log(err)
  }
}

module.exports.sendPlaylistTracks = async (req, res) => {
  try {
    const { spotifyAccessToken } = req.user
    const { playlistId } = req.query
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.items.track(album(artists),name,uri)`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    }
    const { data } = await axios(config)
    const playlistTracks = data.tracks.items.map((track) => ({
      trackName: track.track.name,
      artists: track.track.album.artists,
      uri: track.track.uri,
    }))

    res.send(playlistTracks)
  } catch (err) {
    console.log(err)
  }
}

module.exports.sendArtistTopTracks = async (req, res) => {
  try {
    const { spotifyAccessToken } = req.user
    const { artistId } = req.query
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=GB`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    }
    const { data } = await axios(config)
    const tracks = data.tracks.map((track) => {
      return {
        name: track.name,
        artist: track.artists,
        album: track.album.name,
        uri: track.uri,
      }
    })
    res.send(tracks)
  } catch (err) {
    console.log(err)
  }
}

module.exports.sendAlbumsByArtist = async (req, res) => {
  try {
    const { spotifyAccessToken } = req.user
    const { artistId } = req.query
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/artists/${artistId}/albums`,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
      params: {
        limit: 10,
      },
    }
    const { data } = await axios(config)
    const albums = data.items.map((album) => {
      return {
        id: album.id,
        name: album.name,
        artists: album.artists,
        type: album.album_type,
        images: album.images,
        uri: album.uri,
      }
    })
    res.send(albums)
  } catch (err) {
    console.log(err)
  }
}

module.exports.sendUsersPlaylists = async (req, res) => {
  const { spotifyAccessToken } = req.user
  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/me/playlists`,
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
    params: {
      limit: 50,
    },
  }
  const { data } = await axios(config)
  const playlists = data.items.map((playlist) => {
    return {
      name: playlist.name,
      images: playlist.images,
      owner: playlist.owner,
      tracks: playlist.tracks,
      uri: playlist.uri,
      id: playlist.id,
    }
  })
  res.send(playlists)
}

module.exports.sendUsersTopTracks = async (req, res) => {
  const { spotifyAccessToken } = req.user
  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/me/tracks`,
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
    params: {
      limit: 50,
    },
  }
  const { data } = await axios(config)
  const topTracksData = data.items.map(({ track }) => {
    return {
      name: track.name,
      artists: track.artists,
      album: track.album,
      artwork: track.album.images,
      uri: track.uri,
    }
  })
  res.json({
    noOfTracks: data.total,
    trackData: topTracksData,
  })
}

module.exports.sendTopEightTracks = async (req, res) => {
  const { spotifyAccessToken } = req.user
  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/me/top/tracks`,
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
    params: {
      time_range: 'short_term',
      limit: 4,
    },
  }
  const { data } = await axios(config)
  const topEightData = data.items.map((song) => {
    return {
      trackName: song.name,
      artists: song.artists,
      album: song.album,
      uri: song.uri,
    }
  })
  res.send(topEightData)
}

module.exports.sendRecentlyPlayed = async (req, res) => {
  const { spotifyAccessToken } = req.user
  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/me/player/recently-played`,
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
    params: {
      limit: 4,
    },
  }
  const { data } = await axios(config)
  const recentlyPlayedTracks = data.items.map((song) => {
    return {
      trackName: song.track.name,
      artists: song.track.artists,
      album: song.track.album,
      uri: song.track.uri,
    }
  })
  res.send(recentlyPlayedTracks)
}

module.exports.sendFeaturedPlaylists = async (req, res) => {
  const { spotifyAccessToken } = req.user
  const config = {
    url: 'https://api.spotify.com/v1/browse/featured-playlists',
    method: 'get',
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
    params: {
      limit: 4,
    },
  }
  const { data } = await axios(config)
  const playlists = data.playlists.items.map((playlist) => {
    return {
      playlistName: playlist.name,
      artwork: playlist.images[0].url,
      id: playlist.id,
      uri: playlist.uri,
    }
  })
  res.send(playlists)
}

module.exports.sendRecommendations = async (req, res) => {
  const { spotifyAccessToken } = req.user
  const config = {
    url: 'https://api.spotify.com/v1/browse/featured-playlists',
    method: 'get',
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
    },
    params: {
      limit: 4,
    },
  }
  const { data } = await axios(config)
  const playlists = data.playlists.items.map((playlist) => {
    return {
      playlistName: playlist.name,
      artwork: playlist.images[0].url,
      id: playlist.id,
      uri: playlist.uri,
    }
  })
  res.send(playlists)
}
