import { useEffect } from 'react'
import useAuth from '../context/AuthContext'
import { useCookies } from 'react-cookie'

const useToken = async () => {
  const [cookies, setCookie] = useCookies(['isAuthenticated'])
  const {
    token,
    expiresAt,
    isLoading,
    logUserIn,
    logUserOut,
    updateToken,
    updateTokenExpiry,
    setIsLoading,
  } = useAuth()
  useEffect(() => {
    const getToken = async () => {
      const expiry = new Date(expiresAt)
      setIsLoading(true)
      // if we have a token, and it's not equal to 'token' (the default value), and the token isn't going to expire in the next 5 mins, then break out of this code
      if (token && token !== 'token' && Date.now() < expiry.getTime() - 300000)
        return setIsLoading(false)
      try {
        const response = await fetch('/auth/token')
        const json = await response.json()
        if (json.access_token) {
          setCookie('isAuthenticated', true, {
            // cookie set to two hours, change back to one week when deploying
            maxAge: 60 * 60 * 2,
            path: '/',
          })
          logUserIn()
          updateToken(json.access_token)
          updateTokenExpiry(json.expires_in)
        } else {
          updateToken(null)
          isLoading || logUserOut()
        }
      } catch (error) {
        console.error(error)
      }
    }
    getToken()
    setIsLoading(false)
  }, [token])
}

export default useToken
