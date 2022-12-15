import React, { useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import usePlayer from 'context/PlayerContext'
import getArtists from 'utils/getArtists'

const scrollText = keyframes`
  0%,
  20% {
    transform: translateX(25%);
  }
  80%,
  100% {
    transform: translateX(-25%);
  }
`
const DetailsContainer = styled.div`
  margin-top: 7px;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  min-width: 100%;
  justify-content: center;
  &.animated {
    animation-name: ${scrollText};
    animation-duration: 15s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }
`
const TrackName = styled.span``
const AlbumName = styled.span`
  font-style: italic;
`
const ArtistName = styled.span`
  font-weight: 600;
`

const TrackDetails = () => {
  const containerEl = useRef()
  const trackEl = useRef()
  const albumEl = useRef()
  const artistEl = useRef()
  const { currentTrack, albumName, artistArr } = usePlayer()

  useEffect(() => {
    const animateText = () => {
      console.log(trackEl.current.getBoundingClientRect().x < 0)
      if (trackEl.current && trackEl.current.getBoundingClientRect().x < 0) {
        containerEl.current.classList.add('animated')
      } else {
        containerEl.current.classList.remove('animated')
      }
    }
    setTimeout(animateText, 1000)
  })

  return (
    <DetailsContainer ref={containerEl}>
      <TrackName ref={trackEl}>
        {currentTrack + (currentTrack ? ' - ' : '')}
      </TrackName>
      <AlbumName ref={albumEl}>
        {albumName + (albumName ? ' - ' : '')}
      </AlbumName>
      <ArtistName ref={artistEl}>{getArtists(artistArr)}</ArtistName>
    </DetailsContainer>
  )
}

export default TrackDetails
