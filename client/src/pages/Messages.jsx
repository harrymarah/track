import React, { useEffect, useState } from 'react'
import { PageHead } from 'layouts'
import { AllMessagesContainer, ChatDisplayBar } from 'features/chat'
import useAxios from 'hooks/useAxios'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { backendApiCall } = useAxios()
  const populateChats = async () => {
    const config = {
      url: '/chat/get-chats',
      method: 'get',
    }
    const { data } = await backendApiCall(config)
    setMessages(
      data.map((msg) => {
        return <ChatDisplayBar name={msg.name} message={msg.newestMessage} />
      })
    )
  }
  useEffect(() => {
    populateChats()
  }, [])
  return (
    <>
      <PageHead heading={'Messages'} />
      <AllMessagesContainer>
        {messages.length > 0 ? messages : ''}
      </AllMessagesContainer>
    </>
  )
}

export default Messages
