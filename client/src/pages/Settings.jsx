import React from 'react'
import BottomNavbar from '../layouts/BottomNavbar'
import MusicControl from '../features/player/MusicControl'
import LogoutBtn from '../components/LogoutBtn'

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <LogoutBtn />
      <MusicControl />
      <BottomNavbar />
    </div>
  )
}

export default Settings
