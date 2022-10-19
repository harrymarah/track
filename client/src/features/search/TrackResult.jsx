import React, { useContext } from 'react'
import styled from 'styled-components'
import getArtists from './getArtists'
import { AuthContext } from '../../context/AuthContext'
import setPlayback from '../../utils/setPlayback'
import playSong from '../../utils/playSong'

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

const handleClick = (uri, token) => {
  setPlayback(token, playSong(uri, token))
}

const TrackResult = ({ searchResults }) => {
  const auth = useContext(AuthContext)
  return (
    <SingleResultContainer
      onClick={(e) => handleClick(searchResults.uri, auth.token)}
    >
      <TrackName>{searchResults.name}</TrackName>
      <ArtistName>{getArtists(searchResults.artists)}</ArtistName>
      <AlbumName>{searchResults.album.name}</AlbumName>
    </SingleResultContainer>
  )
}

export default TrackResult