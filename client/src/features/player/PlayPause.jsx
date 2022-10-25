import React from 'react'
import styled from 'styled-components'
import usePlayer from '../../context/PlayerContext'
import useUpdatePLayerState from '../../hooks/useUpdatePlayerState'

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

let iconClassNames = ['fa-solid', 'fa-play']

const PlayPause = () => {
  const { webPlayer, isPaused, setIsPaused } = usePlayer()
  const { updatePlayerState } = useUpdatePLayerState()

  const setIcon = (isPaused) => {
    if (isPaused) {
      iconClassNames = ['fa-solid', 'fa-play']
    } else {
      iconClassNames = ['fa-solid', 'fa-pause']
    }
  }

  const handleClick = async () => {
    setIcon(!isPaused)
    await setIsPaused(!isPaused)
    await webPlayer.togglePlay()
    await updatePlayerState()
  }
  return (
    <PlayPauseBtn onClick={handleClick}>
      <Icon className={iconClassNames}></Icon>
    </PlayPauseBtn>
  )
}

export default PlayPause
