import { useState, useEffect } from 'react'
import useAuth from '../context/AuthContext'

const useSpotify = () => {
  const [spotifyWebPlayer, setSpotifyWebPlayer] = useState(undefined)
  const { auth, token, isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoggedIn || token === 'token' || spotifyWebPlayer !== undefined)
      return
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = await new window.Spotify.Player({
        name: 'track',
        getOAuthToken: (cb) => {
          cb(auth.token)
        },
      })

      setSpotifyWebPlayer(player)
    }
  }, [auth])

  useEffect(() => {
    if (!auth.isLoggedIn || !spotifyWebPlayer) return

    spotifyWebPlayer.addListener('initialization_error', ({ message }) => {
      console.error(message)
    })
    spotifyWebPlayer.addListener('authentication_error', ({ message }) => {
      console.error(message)
    })
    spotifyWebPlayer.addListener('account_error', ({ message }) => {
      console.error(message)
    })
    spotifyWebPlayer.addListener('playback_error', ({ message }) => {
      console.error(message)
    })

    spotifyWebPlayer.addListener('player_state_changed', (state) => {
      console.log(state)
    })

    spotifyWebPlayer.addListener('ready', ({ device_id }) => {
      sessionStorage.setItem('deviceId', device_id)
      console.log('Ready with Device ID', device_id)
    })

    spotifyWebPlayer.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    spotifyWebPlayer.connect()

    return () =>
      (window.onSpotifyWebPlaybackSDKReady = () => {
        spotifyWebPlayer.disconnect()
      })
  }, [spotifyWebPlayer])

  return { spotifyWebPlayer, setSpotifyWebPlayer }
}

export default useSpotify
