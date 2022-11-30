import 'wdyr.js'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import useSpotify from './hooks/useSpotify'
import useToken from './hooks/useToken'
import usePlayer from 'context/PlayerContext'
import useAuth from 'context/AuthContext'

import Login from './pages/Login'
import PrivateRoutes from 'utils/PrivateRoutes'
import Home from './pages/Home'
import Messages from 'pages/Messages'
import Playlists from 'pages/Playlists'
import Search from 'pages/Search'
import Settings from 'pages/Settings'

// import { GlobalStyle } from 'layouts'

function App() {
  const { setWebPlayer } = usePlayer()
  // const { updateUsername, updateAccessToken, updateRefreshToken } = useAuth()
  useToken()
  const { spotifyWebPlayer } = useSpotify()

  // useEffect(() => {
  //   console.log('useeffect in app.js running')
  //   console.log(username, backendToken, refreshToken)
  //   updateUsername(username)
  //   updateAccessToken(backendToken)
  //   updateRefreshToken(refreshToken)
  // }, [])

  useEffect(() => {
    setWebPlayer(spotifyWebPlayer)
  }, [spotifyWebPlayer])

  console.count('render count app.js')

  return (
    <>
      {/* <GlobalStyle /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/find" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

App.whyDidYouRender = true

export default App
