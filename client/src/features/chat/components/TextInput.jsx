import React from 'react'
import styled from 'styled-components'

const Container = styled.form`
  background-color: orange;
  display: flex;
  padding: 0.3rem;
  justify-content: space-between;
`
const MessageInput = styled.input`
  border: none;
  border-radius: 30px;
  padding: 0.2rem 0.4rem;
  font-family: inherit;
  font-size: 1rem;
  min-height: calc(2rem - 0.4rem);
  flex: 1;
  margin-right: 5px;
`
const SendBtn = styled.button`
  border: none;
  background-color: var(--bright);
  color: var(--black);
  font-family: inherit;
  border-radius: 50px;
  font-size: 1rem;
  height: 2rem;
  width: 2rem;
`
const TextInput = () => {
  return (
    <Container>
      <MessageInput type="text" value={''} placeholder="type your message" />
      <SendBtn type="submit">
        <i className="fa-solid fa-arrow-right"></i>
      </SendBtn>
    </Container>
  )
}

export default TextInput
