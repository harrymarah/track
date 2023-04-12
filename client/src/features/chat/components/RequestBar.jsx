import { useRef } from 'react'
import styled from 'styled-components'
import useAxios from 'hooks/useAxios'

const FriendNameContainer = styled.li`
  list-style-type: none;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 8px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`
const Name = styled.div`
  padding: 10px 5px;
  flex-grow: 1;
  align-self: center;
  transition: all 1s;
`
const Icon = styled.i`
  padding: 5px;
  height: 100%;
  background-color: rgba(${(props) => props.color}, 0.6);
  border-radius: 5px;
  margin: 3px;
  display: flex;
  transition: all 0.5s;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
`

const RequestBar = ({ name, sentToUser }) => {
  return (
    <FriendNameContainer>
      <Name>{name}</Name>
      <Icon className="fa-solid fa-check fa-fw" color={'156,255,217'} />
      {sentToUser ? (
        <Icon className="fa-solid fa-xmark fa-fw" color={'181,5,5'} />
      ) : (
        ''
      )}
    </FriendNameContainer>
  )
}

export default RequestBar
