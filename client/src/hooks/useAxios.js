import axios from 'axios'
import useAuth from 'context/AuthContext'
import useError from './useError'

const useAxios = () => {
  const { addError } = useError()
  const { accessToken } = useAuth()
  const backendApiCall = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  backendApiCall.interceptors.response.use(
    (response) => response,
    (err) => {
      addError(err, err.response.statusText, err.response.status)
    }
  )
  return { backendApiCall }
}

export default useAxios
