import axios from 'axios'

const trackSearch = async (query, token, limit = 10, offset = 0) => {
  const config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: 'track',
      include_external: 'audio',
      limit,
      offset,
    },
  }
  const { data } = await axios(config)
  return data
}

export default trackSearch
