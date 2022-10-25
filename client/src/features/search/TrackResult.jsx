import React, { useRef } from 'react'
import styled from 'styled-components'
import getArtists from './getArtists'
import useAuth from '../../context/AuthContext'
// import setPlayback from '../../utils/setPlayback'

import useUpdatePlayerState from '../../hooks/useUpdatePlayerState'
import usePlaySong from '../../hooks/usePlaySong'
import useSetPlayback from '../../hooks/useSetPlayback'

const SingleResultContainer = styled.li`
  width: 95%;
  height: 60px;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 5px auto;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  overflow: hidden;
`
const TrackName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 3px;
`
const ArtistName = styled.div`
  // display: inline-block;
  margin-right: 10px;
  font-size: 0.9rem;
  margin-bottom: 2px;
`
const AlbumName = styled.div`
  // display: inline-block;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 2px;
`

const handleEvent = (e) => {
  if (e.type === 'mousedown') {
    e.currentTarget.style.backgroundColor = 'rgba(156, 255, 217, 0.3)'
  } else if (e.type === 'mouseup') {
    const target = e.currentTarget
    setTimeout(() => {
      target.style.backgroundColor = 'rgba(230, 241, 255, 0.04)'
    }, 50)
  }
}

const TrackResult = ({ searchResults }) => {
  const { playSong } = usePlaySong()
  const { updatePlayerState } = useUpdatePlayerState()
  const { setPlayback } = useSetPlayback()
  const handleClick = async (uri, token) => {
    await setPlayback(token)
    await playSong(uri, token)
    await updatePlayerState()
  }
  const resultRef = useRef()
  const { token } = useAuth()
  return (
    <SingleResultContainer
      ref={resultRef}
      onClick={(e) => handleClick(searchResults.uri, token)}
      onMouseDown={handleEvent}
      onMouseUp={handleEvent}
    >
      <TrackName>{searchResults.name}</TrackName>
      <ArtistName>{getArtists(searchResults.artists)}</ArtistName>
      <AlbumName>{searchResults.album.name}</AlbumName>
    </SingleResultContainer>
  )
}

export default TrackResult
