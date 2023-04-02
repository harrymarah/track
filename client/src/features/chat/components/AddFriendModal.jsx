import { useState, useRef } from 'react'
import ModalContainer from 'components/ModalContainer'
import styled from 'styled-components'
import useAxios from 'hooks/useAxios'
import { useEffect } from 'react'

const AddFriendBox = styled.form`
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
  transition: all 0.5s;
  &.success {
    color: green;
    border: 3px green solid;
  }
  &.failure {
    color: var(--red);
    border: 3px solid var(--red);
  }
`
const Submit = styled.button`
  width: 100%;
  font-size: 1.2rem;
  border: none;
  font-family: inherit;
  padding: 0.4rem 0.2rem;
  border-radius: 4px;
  text-align: center;
  background-color: var(--bright);
  color: var(--black);
  font-weight: 600;
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
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
  const usernameInput = useRef(null)
  const { backendApiCall } = useAxios()
  const [usernameSearchTerm, updateUsernameSearchTerm] = useState('')
  const handleSubmit = async (e, username) => {
    const config = {
      url: '/chat/add-user',
      method: 'post',
      data: {
        username,
      },
    }
    e.preventDefault()
    const data = await backendApiCall(config)
    if (!data) {
      usernameInput.current.classList.remove('success')
      usernameInput.current.classList.add('failure')
    } else {
      usernameInput.current.classList.remove('failure')
      usernameInput.current.classList.add('success')
      setTimeout(() => {
        closeModal()
      }, [1000])
    }
  }
  useEffect(() => {
    return () => {
      updateUsernameSearchTerm('')
    }
  }, [])
  return (
    <ModalContainer onClick={() => closeModal()}>
      <AddFriendBox onSubmit={(e) => handleSubmit(e, usernameSearchTerm)}>
        <CloseBtn onClick={() => closeModal()} className="fa-solid fa-x" />
        <Heading>add a new friend</Heading>

        <Input
          ref={usernameInput}
          type="text"
          placeholder="type a username"
          value={usernameSearchTerm}
          onChange={(e) => updateUsernameSearchTerm(e.target.value)}
        />
        <Submit type="submit">submit</Submit>
      </AddFriendBox>
    </ModalContainer>
  )
}

export default AddFriendModal
