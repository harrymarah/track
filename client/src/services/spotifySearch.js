import axios from 'axios'

const spotifySearch = async (query, token) => {
  const config = {
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: 'artist,track',
    },
  }
  //   axios(config).then((response) => {
  //     return response.data
  //   })
  const { data } = await axios(config)
  return data
}

export default spotifySearch
