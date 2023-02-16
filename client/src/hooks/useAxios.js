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

  const backendApiCall = axios.create()
  backendApiCall.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response.status === 401) {
        try {
          backendApiCall.post('/auth/logout', {
            crossDomain: true,
          })
          sessionStorage.clear()
          updateUsername(null)
          webPlayer && webPlayer.disconnect()
          setWebPlayer(undefined)
          logUserOut()
          setIsLoading(false)
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
