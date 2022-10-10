import React from 'react'
import BottomNavbar from '../layouts/BottomNavbar'
import ClosedMusicControl from '../layouts/ClosedMusicControl'

const Messages = () => {
  return (
    <div>
      <h1>Messages</h1>
      <i className="fa-solid fa-pen-to-square"></i>
      <ClosedMusicControl />
      <BottomNavbar />
    </div>
  )
}

export default Messages
