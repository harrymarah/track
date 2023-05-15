import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHead } from 'layouts'
import {
  AllMessagesContainer,
  ChatDisplayBar,
  FriendsBtn,
  AddFriendModal,
  FriendsListModal,
  ViewRequestsModal,
  Chat,
} from 'features/chat'
import useAxios from 'hooks/useAxios'
import useChat from 'context/ChatContext'
import Loading from 'components/Loading'

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: -18px;
`

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [showAddFriends, toggleShowAddFriends] = useState(false)
  const [showRequests, toggleShowRequests] = useState(false)
  const [showFriendsList, toggleShowFriendsList] = useState(false)
  const [showChat, toggleShowChat] = useState(false)
  const [chatData, setChatData] = useState({})
  const [messagesLoading, setMessagesLoading] = useState(true)
  const { backendApiCall } = useAxios()
  const { newMessage, setNewMessage, setFriendsList } = useChat()
  const populateChats = async () => {
    const config = {
      url: '/chat',
      method: 'get',
    }
    const { data } = await backendApiCall(config)
    setMessagesLoading(false)
    setMessages(
      data.map((msg) => {
        return (
          <ChatDisplayBar
            key={msg.id}
            name={msg.name}
            message={msg.newestMessage}
            chatId={msg.id}
            recipient={msg.recipientId}
            toggleShowChat={toggleShowChat}
            setChatData={setChatData}
          />
        )
      })
    )
    setFriendsList(
      data.map((msg) => {
        return { name: msg.name, chatId: msg.id }
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
          <FriendsBtn
            text={'friends'}
            modal={
              <FriendsListModal
                closeModal={() => toggleShowFriendsList(false)}
                toggleShowChat={toggleShowChat}
                setChatData={setChatData}
              />
            }
            setShowModal={toggleShowFriendsList}
            showModal={showFriendsList}
          />
          <FriendsBtn
            text={'requests'}
            modal={
              <ViewRequestsModal closeModal={() => toggleShowRequests(false)} />
            }
            setShowModal={toggleShowRequests}
            showModal={showRequests}
          />
        </BtnContainer>
      </PageHead>
      {messagesLoading && (
        <Loading loading={messagesLoading} customCss={{ minHeight: '50%' }} />
      )}
      {showChat ? (
        <Chat
          chatData={chatData}
          toggleShowChat={toggleShowChat}
          setChatData={setChatData}
        />
      ) : (
        ''
      )}

      <AllMessagesContainer>
        {messages.length > 0 ? messages : ''}
      </AllMessagesContainer>
    </>
  )
}

export default Messages
