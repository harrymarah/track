import { useEffect, useState } from 'react'
import useAuth from 'context/AuthContext'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const useToken = async () => {
  console.count('useToken running')
  const [, setCookie] = useCookies(['isAuthenticated'])
  const {
    isLoading,
    logUserIn,
    logUserOut,
    setIsLoading,
    accessToken,
    updateUsername,
    updateAccessToken,
    updateRefreshToken,
  } = useAuth()
  useEffect(() => {
    console.count('useToken useEffect running')
    const getToken = async () => {
      setIsLoading(true)
      if (accessToken) return setIsLoading(false)
      try {
        const { data } = await axios.get('/auth/token')
        if (data) {
          setCookie('isAuthenticated', true, {
            // cookie set to two hours, change back to one week when deploying
            maxAge: 60 * 60 * 2,
            path: '/',
          })
          updateUsername(data.username)
          updateAccessToken(data.accessToken)
          updateRefreshToken(data.refreshToken)
          logUserIn()
        } else {
          updateAccessToken(null)
          updateRefreshToken(null)
          isLoading || logUserOut()
        }
      } catch (err) {
        console.error(err)
      }
    }
    getToken()
    setIsLoading(false)
  }, [])
}

export default useToken
