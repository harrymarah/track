import React, { useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import WebPlayback from './components/WebPlayback'

import Login from './pages/Login'
import Home from './pages/Home'
import Messages from './pages/Messages'
import Playlists from './pages/Playlists'
import Search from './pages/Search'
import Settings from './pages/Settings'

import GlobalStyle from './layouts/GlobalStyles'

import { AuthContext } from './context/AuthContext'

import PrivateRoutes from './utils/PrivateRoutes'
import { ACTIONS, reducer } from './utils/AuthReducer'
import getToken from './utils/getToken'
import axiosInterceptor from './utils/axiosInterceptor'

import './App.css'

function App() {
  const [cookies, setCookie] = useCookies(['isAuthenticated'])

  const [auth, dispatch] = useReducer(reducer, {
    // token initialized to a string to avoid logout and redirection on page refresh, if a user isn't logged in the token will eventually be set to null and trigger redirection to login page
    token: 'token',
    isLoggedIn: Boolean(cookies.isAuthenticated) || false,
    isLoading: true,
    expiresAt: Date.now(),
  })

  useEffect(() => {
    axiosInterceptor(auth.expiresAt, getToken, setCookie, dispatch)
    dispatch({ type: ACTIONS.SET_IS_LOADING, payload: true })
    getToken(setCookie, dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (auth.token) {
      dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: true })
    } else {
      dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: false })
    }
    dispatch({ type: ACTIONS.SET_IS_LOADING, payload: false })
  }, [auth.token])

  return (
    <>
      <GlobalStyle />
      <AuthContext.Provider value={auth}>
        {auth.isLoggedIn ? <WebPlayback /> : ''}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/settings"
              element={<Settings setCookie={setCookie} />}
            />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
