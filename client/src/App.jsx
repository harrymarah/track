import 'wdyr.js'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoutes from 'utils/PrivateRoutes'
import Login from './pages/Login'
import Home from './pages/Home'
import Messages from 'pages/Messages'
import Playlists from 'pages/Playlists'
import Search from 'pages/Search'
import Settings from 'pages/Settings'

// import { GlobalStyle } from 'layouts'

function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <ToastContainer />
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
