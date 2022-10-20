import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import useAuth from '../context/AuthContext'

const Button = styled.button`
  background-color: #b50505;
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
  const { updateToken } = useAuth()
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault()
    axios
      .post('/auth/logout', { crossDomain: true })
      .then((response) => {
        if (response.data.message === 'ok') {
          setCookie('isAuthenticated', false, {
            maxAge: 60 * 60 * 2,
            path: '/',
          })
          sessionStorage.clear()
          updateToken(null)
        }
      })
      .finally(navigate('/login'))
  }

  return (
    <form onSubmit={handleLogout}>
      <Button type="submit">logout</Button>
    </form>
  )
}

export default LogoutBtn
