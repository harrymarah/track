import React from 'react'
import styled from 'styled-components'

const MusicControlContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.active ? '20rem' : '12px')};
  background-color: var(--light);
  position: fixed;
  bottom: 60px;
  position: realative;
`
const SwipeUpBar = styled.div`
  width: 75px;
  height: 7px;
  background-color: var(--dark-blue);
  margin: auto;
  border-radius: 10px;
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
`

const ClosedMusicControl = () => {
  return (
    <MusicControlContainer>
      <SwipeUpBar />
    </MusicControlContainer>
  )
}

export default ClosedMusicControl
