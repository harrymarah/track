import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useDrag } from '@use-gesture/react'
import { animated, useSpring, config } from '@react-spring/web'

import usePlayer from 'context/PlayerContext'
import PlayPause from 'features/player/components/PlayPause'
import NextTrack from 'features/player/components/NextTrack'
import PrevTrack from 'features/player/components/PrevTrack'
import TrackProgress from 'features/player/components/TrackProgress'
import TrackDetails from 'features/player/components/TrackDetails'

const MusicControlContainer = styled.div`
  width: 100%;
  height: 180px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  position: fixed;
  bottom: 0;
  padding-bottom: 60px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease-in;
  touch-action: none;
`
const ControlContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 17px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s ease-in;
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
  const controlContainerRef = useRef()
  const { isPaused } = usePlayer()
  const open = ({ canceled }) => {
    api.start({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff,
    })
    controlContainerRef.current.style.opacity = 1
  }
  const close = (velocity = 0) => {
    api.start({
      y: 160,
      immediate: false,
      config: { ...config.stiff, velocity },
    })
    controlContainerRef.current.style.opacity = 0
  }
  const [swipeUpBar, setSwipeUpBar] = useState(<SwipeUpBar onClick={open} />)
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const manageSwipeUpBar = () => {
    setTimeout(() => {
      if (musicControlRef.current.style.height === '17px' && !isPaused) {
        setSwipeUpBar(<ActiveSwipeUpBar onClick={open} />)
      } else {
        setSwipeUpBar(<SwipeUpBar onClick={open} />)
      }
    }, 1000)
  }

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
      canceled,
    }) => {
      if (my < -70) cancel()

      if (last) {
        my > 160 * 0.5 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled })
      } else api.start({ y: my, immediate: true })
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  )

  useEffect(() => {
    manageSwipeUpBar()
  }, [isPaused])

  return (
    <MusicControlContainer
      as={animated.div}
      ref={musicControlRef}
      {...bind()}
      style={{ x, y }}
    >
      {swipeUpBar}
      <ControlContainer ref={controlContainerRef}>
        <PlayerControls>
          <PrevTrack />
          <PlayPause />
          <NextTrack />
        </PlayerControls>
        <TrackProgress />
        <TrackDetails />
      </ControlContainer>
    </MusicControlContainer>
  )
}

export default MusicControl
