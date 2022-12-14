import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavBar = styled.div`
  display: flex;
  // background-color: rgba(0, 0, 0, 0.3);
  // background-color: rgba(230, 241, 255, 0.1);
  backdrop-filter: blur(5px);
  height: 60px;
  width: calc(100vw - 2rem);
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 10;
`

const NavBarLink = styled(NavLink)`
  color: ${(props) => (props.isActive ? 'var(--bright)' : 'var(--light);')};
  height: 100%;
  font-size: 2rem;
  line-height: 60px;
  cursor: pointer;
  z-index: 10;
`

const BottomNavbar = () => {
  return (
    <NavBar>
      <NavBarLink to="/">
        <i className="fa-solid fa-house"></i>
      </NavBarLink>
      <NavBarLink to="/messages">
        <i className="fa-solid fa-comments"></i>
      </NavBarLink>
      <NavBarLink to="/playlists">
        <i className="fa-solid fa-music"></i>
      </NavBarLink>
      <NavBarLink to="/find">
        <i className="fa-solid fa-magnifying-glass"></i>
      </NavBarLink>
      <NavBarLink to="/settings">
        <i className="fa-solid fa-gears"></i>
      </NavBarLink>
    </NavBar>
  )
}

export default BottomNavbar
