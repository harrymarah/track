import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
  background: var(--light);
  color: var(--black);
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  border-radius: 5px;
  padding: 5px 25px;
`

const FriendsBtn = ({ text, modal, showModal, setShowModal }) => {
  return (
    <>
      <Button onClick={() => setShowModal(true)}>{text}</Button>
      {showModal ? modal : ''}
    </>
  )
}

export default FriendsBtn
