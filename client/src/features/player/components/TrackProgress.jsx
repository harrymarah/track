import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'
import usePlayer from 'context/PlayerContext'
import useUpdatePlayerState from 'hooks/useUpdatePlayerState'
import msToTime from 'features/player/utils/msToTime'

const TrackTimeBar = styled.div`
  background-color: var(--light);
  height: 9px;
  width: 70%;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
`
const TrackTimeIndicator = styled.div`
  position: absolute;
  background-color: var(--black);
  height: 9px;
  width: 9px;
  border-radius: 20px;
  transition: all 0.2s;
  left: ${(props) => props.location}px;
`
const TrackTimeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
`
const TimeElapsed = styled.div`
  text-align: center;
  width: 70px;
  // max-width: 70px;
  margin: 0 5px;
`

const TrackProgress = () => {
  const { updatePlayerState } = useUpdatePlayerState()
  const { webPlayer, songDuration, songPosition, isPaused, currentTrack } =
    usePlayer()
  const [timerDisplay, setTimerDisplay] = useState(0)
  const [timeIndicatorPosition, setTimeIndicatorPosition] = useState(0)
  const timerState = {
    isPaused,
    songDuration,
    songPosition,
    updateTime: performance.now(),
  }

  let interval = useRef()
  const trackTimeBarRef = useRef()
  const trackTimeIndicatorRef = useRef()

  useEffect(() => {
    setTimerDisplay(songPosition)
    setTimeIndicatorPosition((songPosition / songDuration) * 97)
  }, [songPosition, currentTrack])

  useEffect(() => {
    const getSongPosition = () => {
      if (timerState.isPaused) {
        return timerState.songPosition ? timerState.songPosition : 0
      }
      const position =
        songPosition + (performance.now() - timerState.updateTime)
      setTimerDisplay(
        position > timerState.songDuration ? timerState.songDuration : position
      )
      setTimeIndicatorPosition((position / timerState.songDuration) * 97)
    }
    if (!isPaused) {
      interval.current = setInterval(() => {
        getSongPosition(interval.current)
      }, 1000)
    } else {
      clearInterval(interval.current)
    }
  }, [isPaused])

  const [{ x }, api] = useSpring(() => ({ x: 0 }))
  const bind = useDrag(
    ({ offset: [x], active, offset, last }) => {
      api.start({ x, immediate: active })
      if (active) {
        trackTimeIndicatorRef.current.style.backgroundColor = 'var(--bright)'
        trackTimeIndicatorRef.current.style.height = '20px'
        trackTimeIndicatorRef.current.style.width = '20px'
      } else {
        trackTimeIndicatorRef.current.style.backgroundColor = 'var(--black)'
        trackTimeIndicatorRef.current.style.height = '9px'
        trackTimeIndicatorRef.current.style.width = '9px'
      }
      if (last) {
        const { left, right } = trackTimeBarRef.current.getBoundingClientRect()
        const newPosition = (songDuration / (right - left)) * (offset[0] - left)
        console.log(msToTime(newPosition))
        console.log(msToTime(songDuration))
        webPlayer
          .seek(newPosition)
          .then(() => updatePlayerState())
          .then(() => webPlayer.resume())
      }
    },
    {
      bounds: trackTimeBarRef,
    }
  )

  return (
    <TrackTimeContainer>
      <TimeElapsed>{msToTime(timerDisplay)}</TimeElapsed>
      <TrackTimeBar ref={trackTimeBarRef}>
        <TrackTimeIndicator
          as={animated.div}
          {...bind()}
          style={{ x }}
          ref={trackTimeIndicatorRef}
          location={timeIndicatorPosition}
        />
      </TrackTimeBar>
      <TimeElapsed>-{msToTime(songDuration - timerDisplay)}</TimeElapsed>
    </TrackTimeContainer>
  )
}

export default TrackProgress
