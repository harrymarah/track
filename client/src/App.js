import React, { useEffect, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { useCookies } from 'react-cookie'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthContext } from './context/AuthContext'
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

const ACTIONS = {
  UPDATE_TOKEN: 'update token',
  SET_IS_LOGGED_IN: 'set is logged in',
  SET_IS_LOADING: 'set is loading',
}

const reducer = (auth, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_TOKEN:
      return { ...auth, token: action.payload }
    case ACTIONS.SET_IS_LOGGED_IN:
      return { ...auth, isLoggedIn: action.payload }
    case ACTIONS.SET_IS_LOADING:
      return { ...auth, isLoading: action.payload }
    default:
      return auth
  }
}

function App() {
  const [cookies, setCookie] = useCookies(['isAuthenticated'])

  setCookie('isAuthenticated', true, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  const [auth, dispatch] = useReducer(reducer, {
    token: 'token',
    isLoggedIn: Boolean(cookies.isAuthenticated) || false,
    isLoading: true,
  })

  console.log(auth.token, auth.isLoggedIn, auth.isLoading)

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_IS_LOADING, payload: true })
    async function getToken() {
      const response = await fetch('/auth/token')
      const json = await response.json()
      if (json) {
        dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: true })
        dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: json.access_token })
      } else {
        console.log('null baby')
        dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: null })
      }
    }
    getToken()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      console.log(!!auth.token)
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
          {/* <Route exact path="/" element={<Home />} /> */}

          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
