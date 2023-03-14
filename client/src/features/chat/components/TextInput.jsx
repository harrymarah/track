import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:8080')
console.log(socket)

const Container = styled.form`
  width: 90%;
  margin: 0 auto;
  display: flex;
  padding: 0.3rem;
  justify-content: space-between;
`
const MessageInput = styled.textarea`
  border: none;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  height: calc(2rem - 0.6rem);
  flex: 1;
  margin-right: 5px;
  flex-wrap: wrap;
  overflow-wrap: normal;
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
  align-self: flex-end;
`

const TextInput = () => {
  const [message, setMessage] = useState('')
  const textAreaRef = useRef(null)
  const useAutosizeTextArea = (textAreaRef, value) => {
    useEffect(() => {
      if (textAreaRef) {
        textAreaRef.style.height = '0px'
        textAreaRef.style.minHeight = 'calc(2rem - 0.6rem)'
        textAreaRef.style.maxHeight = '4rem'
        const scrollHeight = textAreaRef.scrollHeight - 9.6
        textAreaRef.style.height = scrollHeight + 'px'
      }
    }, [textAreaRef, value])
  }
  useAutosizeTextArea(textAreaRef.current, message)
  const sendMessage = (e, message) => {
    e.preventDefault()
    socket.emit('send_message', message)
    setMessage('')
  }
  return (
    <Container onSubmit={(e) => sendMessage(e, message)}>
      <MessageInput
        type="text"
        rows={1}
        placeholder="type your message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        ref={textAreaRef}
      />
      <SendBtn type="submit">
        <i className="fa-solid fa-arrow-right"></i>
      </SendBtn>
    </Container>
  )
}

export default TextInput
