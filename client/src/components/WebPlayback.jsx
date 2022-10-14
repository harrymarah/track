import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

function WebPlayback(props) {
  const [player, setPlayer] = useState(undefined)
  const auth = useContext(AuthContext)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'track',
        getOAuthToken: (cb) => {
          cb(
            'BQA4QRYUr0PKqRrMjiFtz3nbNrn6JcwNnAKKvmqupuG5AB59E-hcI5_6f8kW-mFEFqMi3othFqIphUD6MLnmWq8U-LmejNw7DRaE7MCMiwqV21R5tChVdcYoPAUNB4SN5FxGWPhnkH-8X9pxjr2A6S4ZG68DZ5VkqpilM1Mt5X8NK6II4ap6kgvnhn06ProkUxv7CFqVnaXN0Q'
          )
        },
      })

      setPlayer(player)

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.connect()
    }
  }, [])
  return null
}

export default WebPlayback
