import { useEffect } from 'react'
import useAxios from 'hooks/useAxios'
import useAuth from 'context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

const useAuthentication = () => {
  const { backendApiCall } = useAxios()
  const { logUserOut, logUserIn, setIsLoading, username, updateUsername } =
    useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const backendAuthCheck = async () => {
    setIsLoading(true)
    const { data } = await backendApiCall.get('/auth/verifyuser')
    if (data.authenticated === true) {
      if (username !== data.username) updateUsername(data.username)
      if (location.pathname === '/login') {
        navigate('/')
      }
      logUserIn()
    } else {
      updateUsername(null)
      logUserOut()
      navigate('/login')
    }
    setIsLoading(false)
  }
  useEffect(() => {
    backendAuthCheck()
  }, [])
}

export default useAuthentication
