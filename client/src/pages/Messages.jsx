import React from 'react'
import { PageHead } from 'layouts'
import { AllMessagesContainer, ChatDisplayBar } from 'features/chat'

const Messages = () => {
  return (
    <>
      <PageHead heading={'Messages'} />
      <AllMessagesContainer>
        <ChatDisplayBar
          name={'harrymarah'}
          message={
            'hey there how are you doing today? I hope you are doing well babes'
          }
        />
        {/* <ChatDisplayBar
          name={'sophiedonnellan'}
          message={
            'please can you buy me a snickers? I want to bring it on holiday with me'
          }
        />
        <ChatDisplayBar
          name={'jakethomas'}
          message={'dont worry, I wont be driving'}
        />
        <ChatDisplayBar
          name={'juliemarah'}
          message={'get milk from the shop please'}
        />
        <ChatDisplayBar
          name={'company'}
          message={'we would love to offer you a job'}
        /> */}
      </AllMessagesContainer>
    </>
  )
}

export default Messages
