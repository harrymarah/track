import React from 'react'
import BottomNavbar from '../layouts/BottomNavbar'
import ClosedMusicControl from '../layouts/ClosedMusicControl'

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <ClosedMusicControl />
      <BottomNavbar />
    </div>
  )
}

export default Home
