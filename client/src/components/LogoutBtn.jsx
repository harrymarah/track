import React from 'react'
import styled from 'styled-components'
import useAxios from 'hooks/useAxios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import useAuth from 'context/AuthContext'
import usePlayer from 'context/PlayerContext'

const Button = styled.button`
  background-color: var(--red);
  border: none;
  padding: 0.3rem 1.2rem;
  margin: 0.8rem;
  color: var(--light);
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
`

const LogoutBtn = () => {
  const [cookies, setCookie] = useCookies(['isAuthenticated'])
  const {
    updateAccessToken,
    updateRefreshToken,
    updateUsername,
    logUserOut,
    setIsLoading,
  } = useAuth()
  const { webPlayer, setWebPlayer } = usePlayer()
  const { backendApiCall } = useAxios()
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    try {
      console.log('running')
      e.preventDefault()
      const { status } = await backendApiCall.post('/auth/logout', {
        crossDomain: true,
      })
      if (status === 200) {
        setCookie('isAuthenticated', false, {
          maxAge: 60 * 60 * 2,
          path: '/',
        })
        sessionStorage.clear()
        updateAccessToken(null)
        updateRefreshToken(null)
        updateUsername(null)
        webPlayer && webPlayer.disconnect()
        setWebPlayer(undefined)
        logUserOut()
        setIsLoading(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      navigate('/login')
    }
  }

  return (
    <form onSubmit={handleLogout}>
      <Button type="submit">logout</Button>
    </form>
  )
}

export default LogoutBtn
