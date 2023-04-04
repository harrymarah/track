import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 200;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(2px);
`

const ModalContainer = ({ children, onClick }) => {
  const handleClick = (e, cb) => {
    if (e.target === e.currentTarget) return cb()
  }
  return (
    <Container onClick={(e) => handleClick(e, onClick)}>{children}</Container>
  )
}

export default ModalContainer
