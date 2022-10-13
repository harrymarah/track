import React from 'react'
import BottomNavbar from '../layouts/BottomNavbar'
import MusicControl from '../layouts/MusicControl'
import LogoutBtn from '../components/LogoutBtn'

const Settings = ({ setCookie }) => {
  return (
    <div>
      <h1>Settings</h1>
      <LogoutBtn setCookie={setCookie} />
      <MusicControl />
      <BottomNavbar />
    </div>
  )
}

export default Settings
