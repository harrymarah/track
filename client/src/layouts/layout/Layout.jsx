import React from 'react'
import Wrapper from 'layouts/components/Wrapper'
import BottomNavbar from 'layouts/components/BottomNavbar'
import { MusicControl } from 'features/player'

const Layout = ({ children }) => {
  return (
    <>
      <Wrapper>{children}</Wrapper>
      <MusicControl />
      <BottomNavbar />
    </>
  )
}

export default Layout
