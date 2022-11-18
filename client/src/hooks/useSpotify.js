import { useState, useEffect } from 'react'
import useAuth from 'context/AuthContext'
import axios from 'axios'

const useSpotify = () => {
  console.log('use spotify running')
  const [spotifyWebPlayer, setSpotifyWebPlayer] = useState(undefined)
  const { auth, token, isLoggedIn } = useAuth()

  useEffect(() => {
    // uncomment when auth cookie from backend is sorted
    // if (!isLoggedIn || token === 'token' || spotifyWebPlayer !== undefined)
    //   return
    if (spotifyWebPlayer !== undefined) return
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
    // uncomment when auth cookie from backend is sorted
    // if (!auth.isLoggedIn || !spotifyWebPlayer) return
    if (!spotifyWebPlayer) return
    console.log('use spotify part 2 running')

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
      console.log('Ready with Device ID', device_id)
      axios.post('/player/device-id', {
        deviceId: device_id,
      })
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
