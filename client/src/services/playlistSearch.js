import axios from 'axios'

const playlistSearch = async (query, token, limit = 3, offset = 0) => {
  const config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: 'playlist',
      include_external: 'audio',
      limit,
      offset,
    },
  }
  const { data } = await axios(config)
  return data
}

export default playlistSearch
