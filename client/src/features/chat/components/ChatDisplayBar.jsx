import React, { useState } from 'react'
import styled from 'styled-components'
import { Chat } from 'features/chat'

const Container = styled.li`
  width: calc(95%);
  height: 45px;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 10px auto;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  overflow: hidden;
  padding: 0.6rem;
  &.unread {
    font-weight: 600;
    color: var(--bright);
  }
`
const Name = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
`
const Message = styled.div`
  width: calc(100%);
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2rem;
`

const ChatDisplayBar = ({
  name,
  message,
  chatId,
  recipient,
  toggleShowChat,
  setChatData,
  unread,
}) => {
  // const [showChat, toggleShowChat] = useState(false)
  const handleClick = () => {
    setChatData({
      name,
      chatId,
      recipient,
    })
    toggleShowChat(true)
  }
  return (
    <>
      {/* {showChat ? (
        <Chat
          name={name}
          chatId={chatId}
          recipient={recipient}
          toggleShowChat={toggleShowChat}
        />
      ) : (
        ''
      )} */}
      <Container
        className={unread ? 'unread' : ''}
        key={chatId}
        onClick={() => handleClick()}
      >
        <Name>{name}</Name>
        <Message>{message}</Message>
      </Container>
    </>
  )
}

export default ChatDisplayBar
