import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import usePlayer from '../../context/PlayerContext'

const TrackTimeBar = styled.div`
  background-color: var(--light);
  height: 9px;
  width: 70%;
  border-radius: 8px;
  position: relative;
`
const TrackTimeIndicator = styled.div`
  position: absolute;
  background-color: ${(props) =>
    props.beingDragged ? 'var(--bright)' : 'var(--black)'};
  height: ${(props) => (props.beingDragged ? '15px' : '9px')};
  width: ${(props) => (props.beingDragged ? '15px' : '9px')};
  border-radius: 6px;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.location};
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
const msToTime = (miliseconds) => {
  let seconds = Math.floor(miliseconds / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)

  seconds = seconds % 60
  minutes = minutes % 60

  seconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })

  if (hours === 0) {
    return minutes + ':' + seconds
  } else {
    return hours + ':' + minutes + ':' + seconds
  }
}

const TrackProgress = () => {
  const { songDuration, songPosition, isPaused, currentTrack } = usePlayer()
  const [timerDisplay, setTimerDisplay] = useState(0)
  const [timeIndicatorPosition, setTimeIndicatorPosition] = useState(0)
  useEffect(() => {
    setTimerDisplay(songPosition)
    setTimeIndicatorPosition((songPosition / songDuration) * 97)
  }, [songPosition, currentTrack])

  const timerState = {
    isPaused,
    songDuration,
    songPosition,
    updateTime: performance.now(),
  }

  const getSongPosition = () => {
    if (timerState.isPaused)
      return timerState.songPosition ? timerState.songPosition : 0
    const position =
      timerState.songPosition + (performance.now() - timerState.updateTime)
    setTimerDisplay(
      position > timerState.songDuration ? timerState.songDuration : position
    )
    setTimeIndicatorPosition((position / timerState.songDuration) * 97)
  }

  let interval = useRef()

  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(() => {
        getSongPosition()
      }, 1000)
    } else {
      clearInterval(interval.current)
    }
  }, [isPaused])

  return (
    <TrackTimeContainer>
      <TimeElapsed>{msToTime(timerDisplay)}</TimeElapsed>
      <TrackTimeBar>
        <TrackTimeIndicator position={timeIndicatorPosition} />
      </TrackTimeBar>
      <TimeElapsed>-{msToTime(songDuration - timerDisplay)}</TimeElapsed>
    </TrackTimeContainer>
  )
}

export default TrackProgress
