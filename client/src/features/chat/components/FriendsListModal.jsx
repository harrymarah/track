import { useState, useEffect } from 'react'
import ModalContainer from 'components/ModalContainer'
import styled from 'styled-components'
import useAxios from 'hooks/useAxios'
import FriendName from 'features/chat/components/FriendName'

const FriendsListBox = styled.div`
  width: 88%;
  height: 80vh;
  background-color: var(--dark-blue);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  align-items: center;
  position: relative;
  margin-top: 10vh;
`
const CloseBtn = styled.i`
  color: var(--red);
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.3rem;
  padding: 10px;
`
const Heading = styled.div`
  font-size: 1.4rem;
  margin-bottom: 30px;
`
const NameListContainer = styled.ul`
  width: 100%;
`

const FriendsListModal = ({ closeModal }) => {
  const { backendApiCall } = useAxios()
  const [friendsData, setFriendsData] = useState([])
  const getFriendsData = async () => {
    const config = {
      url: '/chat/friends',
      method: 'get',
    }
    const { data } = await backendApiCall(config)
    setFriendsData(
      data.map((friend) => {
        return (
          <FriendName
            key={friend.id}
            name={friend.name}
            spotifyId={friend.spotifyId}
            chatId={friend.chatId}
          />
        )
      })
    )
  }
  useEffect(() => {
    getFriendsData()
    return () => {
      setFriendsData([])
    }
  }, [])
  return (
    <ModalContainer onClick={() => closeModal()}>
      <FriendsListBox>
        <CloseBtn onClick={() => closeModal()} className="fa-solid fa-x" />
        <Heading>your friends</Heading>
        <NameListContainer>{friendsData}</NameListContainer>
      </FriendsListBox>
    </ModalContainer>
  )
}

export default FriendsListModal
