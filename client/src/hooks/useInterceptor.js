import useAuth from '../context/AuthContext'
import axios from 'axios'

const useInterceptor = async () => {
  // console.count('useInterceptor')
  const { expiresAt, updateToken, updateTokenExpiry } = useAuth()
  const getRefreshToken = async () => {
    // if we have a token, and it's not equal to 'token' (the default value), and the token isn't going to expire in the next 5 mins, then break out of this code
    try {
      const response = await fetch('/auth/token')
      const json = await response.json()
      if (json.access_token) {
        updateToken(json.access_token)
        updateTokenExpiry(json.expires_in)
      }
    } catch (error) {
      console.error(error)
    }
  }

  axios.interceptors.request.use(
    (req) => {
      const expiry = new Date(expiresAt)
      if (Date.now() > expiry.getTime() - 300000) {
        getRefreshToken()
      }
      return req
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export default useInterceptor
