import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
import useAxios from 'hooks/useAxios'
const socket = io.connect('http://localhost:8080')

const Container = styled.form`
  width: 90%;
  display: flex;
  padding: 0.3rem;
  justify-content: space-between;
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
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

const TextInput = ({ appendMessage, chatId }) => {
  const [message, setMessage] = useState('')
  const textAreaRef = useRef(null)
  const { backendApiCall } = useAxios()
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
  const sendMessage = async (e, message) => {
    const config = {
      url: '/chat',
      method: 'post',
      params: {
        chatId: chatId,
      },
      data: {
        message: message,
      },
    }
    e.preventDefault()
    console.log(socket)
    socket.emit('send_message', message)
    appendMessage(message)
    setMessage('')
    await backendApiCall(config)
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
