import React from 'react'
import styled from 'styled-components'

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

const NavLink = styled.div`
  color: var(--dark-blue);
  height: 100%;
  font-size: 2rem;
  line-height: 60px;
  cursor: pointer;
`

const BottomNavbar = () => {
  return (
    <NavBar>
      <NavLink>
        <i className="fa-solid fa-house"></i>
      </NavLink>
      <NavLink>
        <i className="fa-solid fa-comments"></i>
      </NavLink>
      <NavLink>
        <i className="fa-solid fa-music"></i>
      </NavLink>
      <NavLink>
        <i className="fa-solid fa-magnifying-glass"></i>
      </NavLink>
      <NavLink>
        <i className="fa-solid fa-gears"></i>
      </NavLink>
    </NavBar>
  )
}

export default BottomNavbar
