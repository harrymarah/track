import React, { useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Login from './pages/Login'
import Home from './pages/Home'
import Messages from './pages/Messages'
import Playlists from './pages/Playlists'
import Search from './pages/Search'
import Settings from './pages/Settings'
import GlobalStyle from './layouts/GlobalStyles'
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthContext } from './context/AuthContext'
import { ACTIONS, reducer } from './utils/AuthReducer'
import './App.css'

function App() {
  const [cookies, setCookie] = useCookies(['isAuthenticated'])

  const [auth, dispatch] = useReducer(reducer, {
    // token initialized to a string to avoid logout and redirection on page refresh, if a user isn't logged in the token will eventually be set to null and trigger redirection to login page
    token: 'token',
    isLoggedIn: Boolean(cookies.isAuthenticated) || false,
    isLoading: true,
  })

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_IS_LOADING, payload: true })
    async function getToken() {
      const response = await fetch('/auth/token')
      const json = await response.json()
      console.log(json)
      if (json) {
        setCookie('isAuthenticated', true, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })
        dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: true })
        dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: json.access_token })
      } else {
        dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: null })
      }
    }
    getToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (auth.token) {
        dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: true })
      } else {
        dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: false })
      }
      dispatch({ type: ACTIONS.SET_IS_LOADING, payload: false })
    }, 3000)
  }, [auth.token])

  return (
    <>
      <GlobalStyle />
      <AuthContext.Provider value={auth}>
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
      </AuthContext.Provider>
    </>
  )
}

export default App
