import axios from 'axios'
import useAuth from 'context/AuthContext'
import usePlayer from 'context/PlayerContext'
import useError from './useError'
import { useNavigate } from 'react-router-dom'

const useAxios = () => {
  const { addError } = useError()
  const { updateUsername, logUserOut, setIsLoading } = useAuth()
  const { webPlayer, setWebPlayer } = usePlayer()
  const navigate = useNavigate()

  // const backendApiCall = axios.create()
  const backendApiCall = axios.create({
    withCredentials: true,
    changeOrigin: true,
    baseURL: process.env.REACT_APP_SERVER_URL,
    accesscontrolalloworigin: '*',
    accesscontrolallowMethods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  })
  backendApiCall.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  backendApiCall.defaults.headers.common[
    'Access-Control-Allow-Credentials'
  ] = true
  backendApiCall.defaults.headers.common['Access-Control-Allow-Methods'] =
    'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  backendApiCall.defaults.headers.common['Content-Type'] =
    'application/json;charset=utf-8'
  backendApiCall.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response.status === 401) {
        try {
          sessionStorage.clear()
          updateUsername(null)
          webPlayer && webPlayer.disconnect()
          setWebPlayer(undefined)
          logUserOut()
          setIsLoading(false)
          backendApiCall.post('/auth/logout', {
            crossDomain: true,
          })
        } catch (err) {
          console.error(err)
        } finally {
          navigate('/login')
        }
      }
      addError(err, err.response.statusText, err.response.status)
    }
  )
  return { backendApiCall }
}

export default useAxios
