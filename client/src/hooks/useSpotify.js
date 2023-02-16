import { useEffect, useState } from 'react'
import useAuth from 'context/AuthContext'
import useAxios from './useAxios'
import useUpdatePlayerState from './useUpdatePlayerState'
import { useNavigate } from 'react-router-dom'

const useSpotify = () => {
  console.count('useSpotify running')
  const { isLoggedIn } = useAuth()
  const [spotifyWebPlayer, setSpotifyWebPlayer] = useState(null)
  const { backendApiCall } = useAxios()
  const { updatePlayerState } = useUpdatePlayerState()
  const navigate = useNavigate()

  useEffect(() => {
    const getSpotifyAccessToken = async () => {
      const { data } = await backendApiCall.get('/auth/spotifytoken')
      return data.spotifyAccessToken
    }
    if (!isLoggedIn) return navigate('/login')
    if (spotifyWebPlayer) return

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
    if (!isLoggedIn || !spotifyWebPlayer) return
    console.count('part 22222')
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
      updatePlayerState(state)
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

  return spotifyWebPlayer
}

export default useSpotify
