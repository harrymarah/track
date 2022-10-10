import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavBar = styled.div`
  display: flex;
  background-color: var(--light);
  height: 60px;
  width: calc(100vw - 2rem);
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  padding: 0 1rem;
`

const NavBarLink = styled(NavLink)`
  color: ${(props) => (props.isActive ? 'var(--bright)' : 'var(--dark-blue);')};
  height: 100%;
  font-size: 2rem;
  line-height: 60px;
  cursor: pointer;
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
      <NavBarLink to="/search">
        <i className="fa-solid fa-magnifying-glass"></i>
      </NavBarLink>
      <NavBarLink to="/settings">
        <i className="fa-solid fa-gears"></i>
      </NavBarLink>
    </NavBar>
  )
}

export default BottomNavbar
