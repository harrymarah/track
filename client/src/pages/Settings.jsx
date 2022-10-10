import React from 'react'
import BottomNavbar from '../layouts/BottomNavbar'
import ClosedMusicControl from '../layouts/ClosedMusicControl'
import LogoutBtn from '../components/LogoutBtn'

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <LogoutBtn />
      <ClosedMusicControl />
      <BottomNavbar />
    </div>
  )
}

export default Settings
