import React from 'react'
import BottomNavbar from '../features/BottomNavbar'
import LogoutBtn from '../features/LogoutBtn'

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <LogoutBtn />
      <BottomNavbar />
    </div>
  )
}

export default Home
