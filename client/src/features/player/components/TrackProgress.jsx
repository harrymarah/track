import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'
import usePlayer from 'context/PlayerContext'
import msToTime from 'features/player/utils/msToTime'
import mapRanges from 'features/player/utils/mapRanges'

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
  left: ${({ location, max }) => Math.min(Math.max(location, 0), max)}px;
  &:hover {
    background-color: var(--bright);
    height: 20px;
    width: 20px;
  }
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
  const { webPlayer, songDuration, isPaused, currentTrack } = usePlayer()
  const [timerDisplay, setTimerDisplay] = useState(0)
  const [timeIndicatorPosition, setTimeIndicatorPosition] = useState(0)
  const [songScrubbing, setSongScrubbing] = useState(false)
  const trackTimeBarRef = useRef()
  const trackTimeIndicatorRef = useRef()

  useEffect(() => {
    console.log(trackTimeBarRef.current)
    const setSongPosition = async () => {
      const res = await webPlayer.getCurrentState()
      const position = res === null ? 0 : res.position
      const indicatorPos = mapRanges(
        0,
        songDuration,
        0,
        trackTimeBarRef.current.getBoundingClientRect().width - 9,
        position
      )
      setTimerDisplay(position)
      setTimeIndicatorPosition(indicatorPos)
    }
    const interval = setInterval(() => {
      if (currentTrack && !isPaused && !songScrubbing) {
        setSongPosition()
      } else clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [isPaused, currentTrack, songDuration, webPlayer, songScrubbing])

  const [{ x }, api] = useSpring(() => ({ x: 0 }))
  const bind = useDrag(
    ({ movement: [mx], active, down, last }) => {
      api.start({ x: down ? mx : 0, immediate: active })
      if (active) {
        trackTimeIndicatorRef.current.style.backgroundColor = 'var(--bright)'
        trackTimeIndicatorRef.current.style.height = '20px'
        trackTimeIndicatorRef.current.style.width = '20px'
        setSongScrubbing(true)
        const timeBarPos = trackTimeBarRef.current.getBoundingClientRect()
        const pointerPos = trackTimeIndicatorRef.current.getBoundingClientRect()
        const newPos = mapRanges(
          parseFloat(timeBarPos.left),
          parseFloat(timeBarPos.left) + parseFloat(timeBarPos.width),
          0,
          songDuration,
          pointerPos.left
        )
        setTimerDisplay(newPos)
      } else {
        trackTimeIndicatorRef.current.style.backgroundColor = 'var(--black)'
        trackTimeIndicatorRef.current.style.height = '9px'
        trackTimeIndicatorRef.current.style.width = '9px'
        setSongScrubbing(false)
      }
      if (last) {
        const timeBarPos = trackTimeBarRef.current.getBoundingClientRect()
        const pointerPos = trackTimeIndicatorRef.current.getBoundingClientRect()
        const newPos = mapRanges(
          parseFloat(timeBarPos.left),
          parseFloat(timeBarPos.left) + parseFloat(timeBarPos.width),
          0,
          songDuration,
          pointerPos.left
        )
        webPlayer.seek(newPos).then(() => webPlayer.resume())
        setSongScrubbing(false)
      }
    },
    {
      bounds: trackTimeBarRef,
    }
  )

  return (
    <TrackTimeContainer>
      <TimeElapsed>{msToTime(Math.max(timerDisplay, 0))}</TimeElapsed>
      <TrackTimeBar ref={trackTimeBarRef}>
        <TrackTimeIndicator
          as={animated.div}
          {...bind()}
          style={{ x }}
          ref={trackTimeIndicatorRef}
          location={timeIndicatorPosition}
          max={
            trackTimeBarRef
              ? trackTimeBarRef.current?.getBoundingClientRect()?.width - 9
              : 0
          }
        />
      </TrackTimeBar>
      <TimeElapsed>
        -{msToTime(Math.max(songDuration - timerDisplay, 0))}
      </TimeElapsed>
    </TrackTimeContainer>
  )
}

export default TrackProgress
