import axios from 'axios'
import usePlayer from '../context/PlayerContext'

const usePlaySong = () => {
  // console.count('usePlaySong')
  const { setIsPaused, setSongPosition } = usePlayer()
  const playSong = async (uri, token) => {
    try {
      const data = JSON.stringify({
        uris: [uri],
        position_ms: 0,
      })
      const config = {
        method: 'put',
        url: `https://api.spotify.com/v1/me/player/play?device_id=${sessionStorage.getItem(
          'deviceId'
        )}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: data,
      }
      await axios(config)
      setSongPosition(0)
      setIsPaused(false)
    } catch (error) {
      console.error(error)
    }
  }
  return { playSong }
}

export default usePlaySong
