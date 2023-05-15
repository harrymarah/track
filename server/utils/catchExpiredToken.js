const axios = require('axios')

const spotifyApiCall = axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalRequest = error.config
    console.log(error)
    return Promise.reject(error)
  }
)
