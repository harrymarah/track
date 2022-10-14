import React from 'react'
import styled from 'styled-components'

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
  left: 50px;
`
const TrackTimeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
`
const TimeElapsed = styled.div``
const TimeRemaining = styled.div``

const TrackProgress = () => {
  return (
    <TrackTimeContainer>
      <TimeElapsed>1:07</TimeElapsed>
      <TrackTimeBar>
        <TrackTimeIndicator />
      </TrackTimeBar>
      <TimeRemaining>-2:11</TimeRemaining>
    </TrackTimeContainer>
  )
}

export default TrackProgress
