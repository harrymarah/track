import axios from 'axios'
import getDevice from './getDevice'

const setPlayback = async (token, callback = () => {}) => {
  try {
    const device = await getDevice(token)
    if (device.id === sessionStorage.getItem('deviceId')) return

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

export default setPlayback
