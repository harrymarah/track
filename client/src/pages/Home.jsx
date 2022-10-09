import React from 'react'
import BottomNavbar from '../components/BottomNavbar'
import LogoutBtn from '../components/LogoutBtn'
import ClosedMusicControl from '../components/ClosedMusicControl'

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
