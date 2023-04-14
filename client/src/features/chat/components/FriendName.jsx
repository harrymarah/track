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
  padding: 10px;
  // background-color: rgba(${(props) => props.color}, 0.6);
  color: rgb(${(props) => props.color});
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  margin: 4px;
  display: flex;
  transition: all 0.5s;
`
const Warning = styled.span`
  font-family: 'Exo', sans-serif;
  font-weight: 600;
  align-self: center;
  font-size: 0.9rem;
  transition: all 1s;
  opacity: 0;
  width: 0;
  height: 0;
  overflow: hidden;
  display: block;
  margin: auto;
  text-align: center;
  &.visible {
    opacity: 1;
    width: 100px;
    height: calc(1.2rem);
  }
`

const FriendName = ({
  name,
  recipient,
  chatId,
  closeModal,
  toggleShowChat,
  setChatData,
  getFriendsData,
}) => {
  const deleteIcon = useRef(null)
  const deleteWarningText = useRef(null)
  const friendName = useRef(null)
  const clickCount = useRef(0)
  const { backendApiCall } = useAxios()
  const handleOpenChat = () => {
    setChatData({
      name,
      chatId,
      recipient,
    })
    closeModal()
    toggleShowChat(true)
  }
  const deleteFriend = async (friendId, chatId) => {
    const config = {
      url: '/chat/friends',
      method: 'delete',
      data: {
        friendId,
        chatId,
      },
    }
    const { data } = await backendApiCall(config)
    if (data === 'OK') {
      getFriendsData()
    }
  }
  const secondClickListener = (e) => {
    e.stopPropagation()
    if (
      (e.target === deleteIcon.current ||
        e.target === deleteWarningText.current) &&
      clickCount.current === 1
    ) {
      handleDelete()
    } else if (clickCount.current === 0) {
      clickCount.current++
    } else if (clickCount.current === 1) {
      deleteIcon.current.classList.add('fa-trash')
      deleteWarningText.current.classList.remove('visible')
      clickCount.current = 0
      document.removeEventListener('click', secondClickListener)
    }
  }
  const handleDelete = () => {
    if (clickCount.current === 0) {
      deleteIcon.current.classList.remove('fa-trash')
      deleteWarningText.current.classList.add('visible')
      return document.addEventListener('click', secondClickListener)
    }
    if (clickCount.current === 1) {
      document.removeEventListener('click', secondClickListener)
      deleteIcon.current.classList.add('fa-trash')
      deleteWarningText.current.classList.remove('visible')
      friendName.current.style.color = 'var(--red)'
      friendName.current.style.textDecoration = 'line-through'
      deleteFriend(recipient, chatId)
      return (clickCount.current = 0)
    }
  }
  return (
    <FriendNameContainer>
      <Name ref={friendName}>{name}</Name>
      <Icon
        onClick={() => handleOpenChat()}
        className="fa-solid fa-message"
        color={'156,255,217'}
      />
      <Icon
        ref={deleteIcon}
        onClick={(e) => handleDelete(e)}
        className="fa-solid fa-trash-can"
        color={'181,5,5'}
      >
        <Warning ref={deleteWarningText}>are you sure?</Warning>
      </Icon>
    </FriendNameContainer>
  )
}

export default FriendName
