import axios from 'axios'

const artistSearch = async (query, token, limit = 1, offset = 0) => {
  const config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: 'artist',
      include_external: 'audio',
      limit,
      offset,
    },
  }
  const { data } = await axios(config)
  return data
}

export default artistSearch
