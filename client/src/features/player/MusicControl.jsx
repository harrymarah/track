import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Swipeable } from 'react-touch'
import usePlayer from '../../context/PlayerContext'
import PlayPause from './PlayPause'
import NextTrack from './NextTrack'
import PrevTrack from './PrevTrack'
import TrackProgress from './TrackProgress'
import TrackDetails from './TrackDetails'

const MusicControlContainer = styled.div`
  width: 100%;
  height: 180px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  position: fixed;
  bottom: 60px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease-in;
`
const ControlContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 17px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const colorChange = keyframes`
  50%{
    background-color: var(--bright)
  }
  100% {
    background-color: var(--light)
  }
`
const SwipeUpBar = styled.div`
  width: 75px;
  height: 7px;
  background-color: var(--light);
  border-radius: 10px;
  z-index: 10;
  margin: 5px;
`
const ActiveSwipeUpBar = styled(SwipeUpBar)`
  animation: ${colorChange} 3s linear infinite;
`
const PlayerControls = styled.div`
  margin: 1rem;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
`

const MusicControl = () => {
  const musicControlRef = useRef()
  const { isPaused } = usePlayer()
  const [swipeUpBar, setSwipeUpBar] = useState(
    <SwipeUpBar onClick={() => handleSwipe('up')} />
  )

  const manageSwipeUpBar = () => {
    setTimeout(() => {
      if (musicControlRef.current.style.height === '17px' && !isPaused) {
        setSwipeUpBar(<ActiveSwipeUpBar onClick={() => handleSwipe('up')} />)
      } else {
        setSwipeUpBar(<SwipeUpBar onClick={() => handleSwipe('up')} />)
      }
    }, 1000)
  }

  useEffect(() => {
    manageSwipeUpBar()
  }, [isPaused])

  const handleSwipe = (direction) => {
    if (direction === 'down') {
      musicControlRef.current.style.height = '17px'
    }
    if (direction === 'up') {
      musicControlRef.current.style.height = '180px'
    }
    manageSwipeUpBar()
  }

  return (
    <Swipeable
      onSwipeDown={() => handleSwipe('down')}
      onSwipeUp={() => handleSwipe('up')}
    >
      <MusicControlContainer ref={musicControlRef}>
        {swipeUpBar}
        <ControlContainer>
          <PlayerControls>
            <PrevTrack />
            <PlayPause />
            <NextTrack />
          </PlayerControls>
          <TrackProgress />
          <TrackDetails />
        </ControlContainer>
      </MusicControlContainer>
    </Swipeable>
  )
}

export default MusicControl
