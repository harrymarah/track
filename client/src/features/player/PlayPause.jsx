import React from 'react'
import styled from 'styled-components'

const PlayPauseBtn = styled.div`
  background-color: var(--bright);
  height: 80px;
  width: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  // box-shadow: 0 0 4px 1px #fff;
`
const Icon = styled.i`
  color: var(--black);
  font-size: 40px;
`

const iconClassNames = ['fa-solid', 'fa-play']

const PlayPause = () => {
  return (
    <PlayPauseBtn>
      <Icon className={iconClassNames}></Icon>
    </PlayPauseBtn>
  )
}

export default PlayPause
