import React from 'react'
import BottomNavbar from '../features/BottomNavbar'
import LogoutBtn from '../features/LogoutBtn'
import ClosedMusicControl from '../features/ClosedMusicControl'

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <LogoutBtn />
      <ClosedMusicControl />
      <BottomNavbar />
    </div>
  )
}

export default Home
