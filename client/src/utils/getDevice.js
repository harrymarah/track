import axios from 'axios'

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

export default getDevice
