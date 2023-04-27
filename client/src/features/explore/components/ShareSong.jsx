import React from 'react'
import styled from 'styled-components'
import useChat from 'context/ChatContext'
import { useState } from 'react'
import useAxios from 'hooks/useAxios'
import getArtists from 'utils/getArtists'
import { toast } from 'react-toastify'

const Container = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  width: 93%;
`
const DropDownContainer = styled.div`
  display: flex;
`

const FriendsDropDown = styled.div`
  background-color: var(--light);
  color: var(--black);
  font-size: 1.2rem;
  flex-grow: 1;
  padding: 8px;
  border-radius: 8px 0 0 8px;
`
const DropDownBtn = styled.div`
  background-color: var(--bright);
  color: var(--dark-blue);
  padding: 8px;
  font-size: 1.2rem;
  border-radius: 0 8px 8px 0;
`
const ShareBtn = styled(DropDownBtn)`
  border-radius: 8px;
  margin-left: 5px;
`
const FriendsListContainer = styled.div`
  background-color: var(--light);
  color: var(--black);
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-right: 36px;
  font-size: 1.2rem;
  max-height: 80px;
  overflow-y: scroll;
`
const Friend = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    border: none;
    padding-bottom: none;
  }
`

const ShareSong = ({ songData, setShowShareOptions, setModalHeight }) => {
  const { name, artists, album, artwork, uri } = songData
  const [showFriendsList, setShowFriendsList] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState('')
  const [chatId, setChatId] = useState('')
  const { friends } = useChat()
  const { backendApiCall } = useAxios()

  const handleFriendSelect = (name, chatId) => {
    setSelectedFriend(name)
    setChatId(chatId)
    setShowFriendsList(false)
  }
  const shareSong = async (
    songName,
    artists,
    album,
    artworkUrl,
    songUri,
    chatId
  ) => {
    if (!chatId) {
      return toast.error('select a friend to share a song')
    }
    const config = {
      url: '/chat/share-song',
      method: 'post',
      data: {
        songName,
        artists,
        album,
        artworkUrl,
        songUri,
        chatId,
      },
    }
    await backendApiCall(config)
    setShowShareOptions(false)
    setModalHeight('250px')
    setChatId('')
    setSelectedFriend('')
  }
  return (
    <>
      <Container>
        <DropDownContainer>
          <FriendsDropDown>{selectedFriend || 'select a user'}</FriendsDropDown>
          <DropDownBtn onClick={() => setShowFriendsList(!showFriendsList)}>
            <i className="fa-solid fa-arrow-down" />
          </DropDownBtn>
          <ShareBtn
            onClick={() =>
              shareSong(name, getArtists(artists), album, artwork, uri, chatId)
            }
          >
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </ShareBtn>
        </DropDownContainer>
        {showFriendsList && (
          <FriendsListContainer>
            {friends.map((friend) => {
              return (
                <Friend
                  key={friend.name}
                  onClick={() => handleFriendSelect(friend.name, friend.chatId)}
                >
                  {friend.name}
                </Friend>
              )
            })}
          </FriendsListContainer>
        )}
      </Container>
    </>
  )
}

export default ShareSong
