import { useState, useEffect } from 'react'

const useSpotify = (auth) => {
  const [webPlayer, setWebPlayer] = useState(undefined)

  useEffect(() => {
    if (!auth.isLoggedIn || auth.token === 'token' || webPlayer !== undefined)
      return
    console.log('use spotify use effect #1 running')
    console.log(window.Spotify)
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

      setWebPlayer(player)
    }
  }, [auth])

  useEffect(() => {
    if (!auth.isLoggedIn || !webPlayer) return

    webPlayer.addListener('initialization_error', ({ message }) => {
      console.error(message)
    })
    webPlayer.addListener('authentication_error', ({ message }) => {
      console.error(message)
    })
    webPlayer.addListener('account_error', ({ message }) => {
      console.error(message)
    })
    webPlayer.addListener('playback_error', ({ message }) => {
      console.error(message)
    })

    webPlayer.addListener('player_state_changed', (state) => {
      console.log(state)
    })

    webPlayer.addListener('ready', ({ device_id }) => {
      sessionStorage.setItem('deviceId', device_id)
      console.log('Ready with Device ID', device_id)
    })

    webPlayer.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id)
    })

    webPlayer.connect()

    return () =>
      (window.onSpotifyWebPlaybackSDKReady = () => {
        webPlayer.disconnect()
      })
  }, [webPlayer])

  return { webPlayer, setWebPlayer }
}

export default useSpotify
