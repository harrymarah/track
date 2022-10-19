import axios from 'axios'

const setPlayback = async (token, callback = () => {}) => {
  console.log('setting playback!')
  try {
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
