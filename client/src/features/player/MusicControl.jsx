import React from 'react'
import styled from 'styled-components'
import PlayPause from './PlayPause'
import NextTrack from './NextTrack'
import PrevTrack from './PrevTrack'
import TrackProgress from './TrackProgress'
import TrackDetails from './TrackDetails'

const MusicControlContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.active ? '180px' : '12px')};
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  position: fixed;
  bottom: 60px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SwipeUpBar = styled.div`
  width: 75px;
  height: 7px;
  background-color: var(--light);
  border-radius: 10px;
  z-index: 10;
  margin: 5px;
`

const PlayerControls = styled.div`
  margin: 1rem;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
`

const MusicControl = () => {
  return (
    <MusicControlContainer active>
      <SwipeUpBar />
      <PlayerControls>
        <PrevTrack />
        <PlayPause />
        <NextTrack />
      </PlayerControls>
      <TrackProgress />
      <TrackDetails />
    </MusicControlContainer>
  )
}

export default MusicControl
