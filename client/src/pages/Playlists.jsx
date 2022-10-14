import React from 'react'
import BottomNavbar from '../layouts/BottomNavbar'
import MusicControl from '../features/player/MusicControl'

const Playlists = () => {
  return (
    <div>
      <h1>Playlists</h1>
      <MusicControl />
      <BottomNavbar />
    </div>
  )
}

export default Playlists
