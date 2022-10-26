import axios from 'axios'

const useSetPlayback = () => {
  // console.count('useSetPlayback')
  const getDevice = async (token) => {
    try {
      const config = {
        method: 'get',
        url: 'https://api.spotify.com/v1/me/player',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axios(config)
      return data.device
    } catch (e) {
      console.error(e)
    }
  }

  const setPlayback = async (token, callback = () => {}) => {
    try {
      const device = await getDevice(token)
      if (device?.id === sessionStorage.getItem('deviceId')) return

      const data = JSON.stringify({
        device_ids: [sessionStorage.getItem('deviceId')],
        play: true,
      })
      const config = {
        method: 'put',
        url: 'https://api.spotify.com/v1/me/player',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
      }
      await axios(config)
      if (typeof callback === 'function') {
        callback()
      }
    } catch (error) {
      console.error(error)
    }
  }
  return { setPlayback }
}

export default useSetPlayback
