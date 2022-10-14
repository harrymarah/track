import React from 'react'
import styled from 'styled-components'

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
  return (
    <DetailsContainer>
      <TrackName>Re-Wired</TrackName>&nbsp;&ndash;&nbsp;
      <AlbumName>Velociraptor!</AlbumName>
      &nbsp;&ndash;&nbsp;
      <ArtistName>Kasabian</ArtistName>
    </DetailsContainer>
  )
}

export default TrackDetails
