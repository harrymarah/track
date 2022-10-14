import React from 'react'
import BottomNavbar from '../layouts/BottomNavbar'
import MusicControl from '../features/player/MusicControl'

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <MusicControl />
      <BottomNavbar />
    </div>
  )
}

export default Home
