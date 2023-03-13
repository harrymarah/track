import React from 'react'
import styled from 'styled-components'
import { TextInput } from 'features/chat'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dark-blue);
  z-index: 20;
  overflow: scroll;
  padding-bottom: 150px;
`
const MessageArea = styled.ul`
  width: 90%;
  margin: auto;
`
const MsgToUser = styled.li`
  background-color: rgba(230, 241, 255, 0.1);
  margin: 10px auto;
  padding: 0.6rem;
  border-radius: 8px;
  overflow: hidden;
`
const MsgFromUser = styled(MsgToUser)`
  text-align: right;
  background-color: rgba(156, 255, 217, 0.3);
`

const Chat = () => {
  return (
    <Container>
      <MessageArea>
        <MsgFromUser>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          perferendis illo omnis eveniet consequatur incidunt quas nulla, unde
          excepturi tenetur.
        </MsgFromUser>
        <MsgToUser>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolorem
          et quae ipsa aliquid id, debitis consequuntur. Accusantium reiciendis
          deleniti fugiat quam laboriosam architecto officia, qui libero nemo
          magni aliquid?
        </MsgToUser>
        <MsgFromUser>Hello there</MsgFromUser>
        <MsgToUser>Howdy</MsgToUser>
      </MessageArea>
      <TextInput />
    </Container>
  )
}

export default Chat
