import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TextInput } from 'features/chat'
import useAxios from 'hooks/useAxios'

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
const ChatName = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  text-align: right;
  white-space: nowrap;
`
const TopNav = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  top: 20px;
  left: 50%;
  width: auto;
  transform: translateX(-50%);
  display: flex;
  padding: 10px;
  border-radius: 50px;
  align-items: center;
  justify-content: space-between;
  i {
    font-size: 2rem;
    margin-right: 20px;
  }
`
const MessageArea = styled.ul`
  width: 90%;
  margin: 0 auto;
  y-overflow: scroll;
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

const Chat = ({ name, chatId, toggleShowChat }) => {
  const [messages, setMessages] = useState([])
  const { backendApiCall } = useAxios()
  const getMessages = async (id) => {
    const config = {
      url: '/chat/full-chat',
      method: 'get',
      params: {
        chatId: chatId,
      },
    }
    const { data } = await backendApiCall(config)
    setMessages(data)
  }
  useEffect(() => {
    getMessages(chatId)
  }, [messages])

  const appendMessage = (msg) => {
    setMessages([...messages, { message: msg, sendByUser: true }])
  }
  return (
    <Container>
      <TopNav>
        <i
          class="fa-solid fa-circle-chevron-left"
          onClick={() => toggleShowChat(false)}
        ></i>
        <ChatName>{name}</ChatName>
      </TopNav>
      <MessageArea>
        {messages.map((msg) => {
          return msg.sendByUser ? (
            <MsgFromUser>{msg.message}</MsgFromUser>
          ) : (
            <MsgToUser>{msg.message}</MsgToUser>
          )
        })}
        <Anchor />
      </MessageArea>
      <TextInput appendMessage={appendMessage} chatId={chatId} />
    </Container>
  )
}

export default Chat
