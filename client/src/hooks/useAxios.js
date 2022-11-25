import axios from 'axios'
import useAuth from 'context/AuthContext'

const useAxios = () => {
  const { accessToken } = useAuth()
  const backendApiCall = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return { backendApiCall }
}

export default useAxios
