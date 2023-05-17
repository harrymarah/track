import React from 'react'
import styled from 'styled-components'

const ContentContainer = styled.div`
  width: 100%;
  min-height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 6px;
`
const UnreadMessage = styled.div`
  background-color: var(--dark-blue);
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 5px;
  &:last-of-type {
    margin-bottom: 0;
  }
`
const SenderName = styled.div`
  font-weight: 600;
`
const MessageContent = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.9rem;
`

const UnreadMessages = ({ unreadMessages }) => {
  const threeMostRecentMessages = unreadMessages.slice(
    0,
    Math.min(3, unreadMessages.length)
  )
  const unreadMessagesSummary = threeMostRecentMessages.map((message) => {
    return (
      <UnreadMessage>
        <SenderName>{message.sender}</SenderName>
        <MessageContent>{message.message}</MessageContent>
      </UnreadMessage>
    )
  })
  return (
    <ContentContainer>
      {unreadMessagesSummary[0] ? unreadMessagesSummary : 'no new messages'}
    </ContentContainer>
  )
}

export default UnreadMessages
