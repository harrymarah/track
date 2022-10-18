import axios from 'axios'

const setPlayback = () => {
  const data = JSON.stringify({
    device_ids: [sessionStorage.getItem('deviceId')],
    play: true,
  })
  console.log(data)
  const config = {
    method: 'put',
    url: 'https://api.spotify.com/v1/me/player',
    headers: {
      Authorization: `Bearer BQBqBNgWilsRjdnNYsS5_TyDqZFTLcsoMJZJ-E63dmdwzzdV1BM18tewRErFPdVprDbEIt-Ia-KkAWHu1VTWvsGdwwC6YHzcvrPW8I1Ix9b0gqsPMOWQ9oOYY2IgHZRJKiDuTtJvotTtuRKe9yvZcuSUBwBTQkX7ubL3nAYtNxOPFXIF72k6PfLZ_P1fDuX0piPI0SVq6G4oHA`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  }
  axios(config).catch((e) => console.log(e.response.data.error))
}

export default setPlayback
