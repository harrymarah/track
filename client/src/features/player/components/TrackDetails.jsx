import React from 'react'
import styled from 'styled-components'
import usePlayer from 'context/PlayerContext'
import getArtists from 'utils/getArtists'

const DetailsContainer = styled.div`
  margin-top: 7px;
`
const TrackName = styled.span``
const AlbumName = styled.span`
  font-style: italic;
`
const ArtistName = styled.span`
  font-weight: 600;
`

const TrackDetails = () => {
  const { currentTrack, albumName, artistArr } = usePlayer()
  return (
    <DetailsContainer>
      <TrackName>{currentTrack}</TrackName>&nbsp;&ndash;&nbsp;
      <AlbumName>{albumName}</AlbumName>
      &nbsp;&ndash;&nbsp;
      <ArtistName>{getArtists(artistArr)}</ArtistName>
    </DetailsContainer>
  )
}

export default TrackDetails
