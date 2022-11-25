import { useEffect, useState } from 'react'
import useAuth from 'context/AuthContext'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const useToken = async () => {
  console.count('useToken running')
  const [cookies, setCookie] = useCookies(['isAuthenticated'])
  const [username, setUsername] = useState(null)
  const [backendToken, setBackendToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const { isLoading, logUserIn, logUserOut, setIsLoading, accessToken } =
    useAuth()
  useEffect(() => {
    console.count('useToken useEffect running')
    const getToken = async () => {
      setIsLoading(true)
      if (backendToken) return setIsLoading(false)
      try {
        const { data } = await axios.get('/auth/token')
        if (data) {
          setCookie('isAuthenticated', true, {
            // cookie set to two hours, change back to one week when deploying
            maxAge: 60 * 60 * 2,
            path: '/',
          })
          setUsername(data.username)
          setBackendToken(data.accessToken)
          setRefreshToken(data.refreshToken)
          logUserIn()
        } else {
          setBackendToken(null)
          setRefreshToken(null)
          isLoading || logUserOut()
        }
      } catch (err) {
        console.error(err)
      }
    }
    getToken()
    setIsLoading(false)
  }, [accessToken])

  return { username, backendToken, refreshToken }
}

export default useToken
