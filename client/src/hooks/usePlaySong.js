import axios from 'axios'
import usePlayer from 'context/PlayerContext'

const usePlaySong = () => {
  const { setIsPaused, updateSongPosition } = usePlayer()
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

      updateSongPosition(0)
      setIsPaused(false)
    } catch (error) {
      console.log('error!!!!!')
      console.warn(error.response)
    }
  }
  return { playSong }
}

export default usePlaySong
