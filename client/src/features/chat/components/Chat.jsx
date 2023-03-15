import React from 'react'
import styled from 'styled-components'
import { TextInput } from 'features/chat'
import { useState } from 'react'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 120px;
  background-color: var(--dark-blue);
  z-index: 20;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const MessageArea = styled.ul`
  width: 90%;
  margin: 0 auto;
`
const MsgToUser = styled.li`
  background-color: rgba(230, 241, 255, 0.1);
  margin: 10px auto;
  padding: 0.6rem;
  border-radius: 8px;
  overflow: hidden;
  overflow-anchor: none;
`
const MsgFromUser = styled(MsgToUser)`
  text-align: right;
  background-color: rgba(156, 255, 217, 0.3);
`
const Anchor = styled.div`
  overflow-anchor: auto;
  height: 10px;
`

const Chat = () => {
  const initialState = [
    {
      message: 'This is a message that is being displayed',
      fromUser: true,
    },
    {
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis delectus illum nostrum minima dolorem architecto ipsa quo nihil sit.',
      fromUser: false,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque saepe iste dolorem magnam tenetur unde, nesciunt quae id nemo debitis! Aliquid quia adipisci reprehenderit atque impedit iure nemo explicabo autem!',
      fromUser: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque saepe iste dolorem magnam tenetur unde, nesciunt quae id nemo debitis! Aliquid quia adipisci reprehenderit atque impedit iure nemo explicabo autem!',
      fromUser: false,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque saepe iste dolorem magnam tenetur unde, nesciunt quae id nemo debitis! Aliquid quia adipisci reprehenderit atque impedit iure nemo explicabo autem!',
      fromUser: true,
    },
    {
      message:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque saepe iste dolorem magnam tenetur unde, nesciunt quae id nemo debitis! Aliquid quia adipisci reprehenderit atque impedit iure nemo explicabo autem!',
      fromUser: false,
    },
  ]
  const [messages, setMessages] = useState(initialState)
  
  const appendMessage = (msg) => {
    setMessages([...messages, { message: msg, fromUser: true }])
  }
  return (
    <Container>
      <MessageArea>
        {messages.map((msg) => {
          return msg.fromUser ? (
            <MsgFromUser>{msg.message}</MsgFromUser>
          ) : (
            <MsgToUser>{msg.message}</MsgToUser>
          )
        })}
        <Anchor />
      </MessageArea>
      <TextInput appendMessage={appendMessage} />
    </Container>
  )
}

export default Chat
