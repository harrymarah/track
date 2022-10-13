import React from 'react'
import styled from 'styled-components'

const MusicControlContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.active ? '250px' : '12px')};
  // background-color: rgba(230, 241, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  position: fixed;
  bottom: 60px;
  position: realative;
  z-index: 10;
`
const SwipeUpBar = styled.div`
  width: 75px;
  height: 7px;
  background-color: var(--light);
  margin: auto;
  border-radius: 10px;
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`

const MusicControl = () => {
  return (
    <MusicControlContainer active>
      <SwipeUpBar />
    </MusicControlContainer>
  )
}

export default MusicControl
