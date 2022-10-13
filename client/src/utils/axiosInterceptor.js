import axios from 'axios'

const axiosInterceptor = (expiresAt, getToken, setCookie, dispatch) => {
  axios.interceptors.request.use(
    (req) => {
      const expiry = new Date(expiresAt)
      if (Date.now() > expiry.getTime() - 300000) {
        getToken(setCookie, dispatch)
      }
      return req
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export default axiosInterceptor
