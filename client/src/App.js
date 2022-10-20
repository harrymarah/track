import React from 'react'
import { Route, Routes } from 'react-router-dom'

import useSpotify from './hooks/useSpotify'
import useToken from './hooks/useToken'
import useInterceptor from './hooks/useInterceptor'

import useAuth from './context/AuthContext'

import Login from './pages/Login'
import Home from './pages/Home'
import Messages from './pages/Messages'
import Playlists from './pages/Playlists'
import Search from './pages/Search'
import Settings from './pages/Settings'

import GlobalStyle from './layouts/GlobalStyles'

import PrivateRoutes from './utils/PrivateRoutes'

import './App.css'

function App() {
  const { setIsLoading } = useAuth()
  // setIsLoading(true)
  useToken()
  useInterceptor()
  useSpotify()
  // setIsLoading(false)

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
