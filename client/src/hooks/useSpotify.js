import { useEffect, useState } from 'react'
import useAuth from 'context/AuthContext'
import useAxios from './useAxios'

const useSpotify = () => {
  console.count('useSpotify running')
  const { isLoggedIn, accessToken } = useAuth()
  const [spotifyWebPlayer, setSpotifyWebPlayer] = useState(null)
  const { backendApiCall } = useAxios()

  const getSpotifyAccessToken = async () => {
    const { data } = await backendApiCall.get('/auth/spotifytoken')
    console.log(data.spotifyAccessToken)
    return data.spotifyAccessToken
  }

  useEffect(() => {
    console.count('use spotify useeffect no 1a')
    console.log(accessToken)
    console.log(!isLoggedIn, !!spotifyWebPlayer, !accessToken)
    if ((!isLoggedIn, !!spotifyWebPlayer, !accessToken)) return
    console.count('use spotify useeffect no 1b')

    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = await new window.Spotify.Player({
        name: 'track',
        getOAuthToken: async (cb) => {
          cb(await getSpotifyAccessToken())
        },
      })
      setSpotifyWebPlayer(player)
    }
  }, [])

  useEffect(() => {
    console.count('use spotify useeffect no 2a')
    if (!isLoggedIn || !spotifyWebPlayer) return
    console.count('use spotify useeffect no 2b')

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
      backendApiCall.post('/player/device-id', {
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
