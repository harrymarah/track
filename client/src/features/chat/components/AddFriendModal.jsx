import React from 'react'
import ModalContainer from 'components/ModalContainer'
import styled from 'styled-components'

const AddFriendBox = styled.div`
  width: 88%;
  height: 140px;
  background-color: var(--dark-blue);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  align-items: center;
  position: relative;
`
const Heading = styled.div`
  font-size: 1.4rem;
  margin-bottom: 30px;
`
const Input = styled.input`
  width: 100%;
  font-size: 1.2rem;
  border: none;
  font-family: inherit;
  padding: 0.3rem 0.2rem;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: var(--light);
`
const Submit = styled.div`
  width: 100%;
  font-size: 1.2rem;
  border: none;
  font-family: inherit;
  padding: 0.5rem 0.2rem;
  border-radius: 4px;
  text-align: center;
  background-color: var(--bright);
  color: var(--black);
  font-weight: 600;
`
const CloseBtn = styled.i`
  color: var(--red);
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.3rem;
  padding: 10px;
`

const AddFriendModal = ({ closeModal }) => {
  return (
    <ModalContainer onClick={() => closeModal()}>
      <AddFriendBox>
        <CloseBtn onClick={() => closeModal()} className="fa-solid fa-x" />
        <Heading>add a new friend</Heading>
        <Input placeholder="type a username" />
        <Submit>submit</Submit>
      </AddFriendBox>
    </ModalContainer>
  )
}

export default AddFriendModal
