import axios from 'axios'
import usePlayer from 'context/PlayerContext'

const usePlaySong = () => {
  // console.count('usePlaySong')
  const { setIsPaused, setSongPosition } = usePlayer()
  const playSong = async (uri) => {
    const deviceId = sessionStorage.getItem('deviceId')
    try {
      const data = JSON.stringify({
        deviceId: deviceId,
        uri: uri,
      })
      const config = {
        method: 'put',
        url: '/player/playsong',
        headers: {
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
