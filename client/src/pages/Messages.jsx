import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHead } from 'layouts'
import {
  AllMessagesContainer,
  ChatDisplayBar,
  FriendsBtn,
  AddFriendModal,
} from 'features/chat'
import useAxios from 'hooks/useAxios'
import useChat from 'context/ChatContext'

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: -18px;
`

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [showAddFriends, toggleShowAddFriends] = useState(false)
  const { backendApiCall } = useAxios()
  const { newMessage, setNewMessage } = useChat()
  const populateChats = async () => {
    const config = {
      url: '/chat',
      method: 'get',
    }
    const { data } = await backendApiCall(config)
    setMessages(
      data.map((msg) => {
        return (
          <ChatDisplayBar
            name={msg.name}
            message={msg.newestMessage}
            chatId={msg.id}
            recipient={msg.recipientId}
          />
        )
      })
    )
  }
  useEffect(() => {
    populateChats()
    setNewMessage(false)
  }, [newMessage])
  return (
    <>
      <PageHead heading={'Messages'}>
        <BtnContainer>
          <FriendsBtn
            text={'add friend'}
            modal={
              <AddFriendModal closeModal={() => toggleShowAddFriends(false)} />
            }
            setShowModal={toggleShowAddFriends}
            showModal={showAddFriends}
          />
          <FriendsBtn text={'friends'} />
          <FriendsBtn text={'requests'} />
        </BtnContainer>
      </PageHead>
      <AllMessagesContainer>
        {messages.length > 0 ? messages : ''}
      </AllMessagesContainer>
    </>
  )
}

export default Messages
