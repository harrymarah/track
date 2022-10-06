import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'

const GlobalStyle = createGlobalStyle`
  html {
    --black: #171738;
    --dark-blue: #011638;
    --light: #E6F1FF;
    --bright: #9CFFD9;
    --green: #4FE383;
  }
  body{
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--dark-blue);
    color: var(--light);
  }
`

function App() {
  const [token, setToken] = useState()

  useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token')
      const json = await response.json()
      setToken(json.access_token)
      console.log(token)
    }
    getToken()
  })

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
