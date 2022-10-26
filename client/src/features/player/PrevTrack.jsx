import React from 'react'
import styled from 'styled-components'
import useUpdatePLayerState from '../../hooks/useUpdatePlayerState'
import usePlayer from '../../context/PlayerContext'

const Icon = styled.i`
  color: var(--light);
  font-size: 40px;
`
const iconClassNames = ['fa-solid', 'fa-backward']

const PrevTrack = () => {
  const { webPlayer } = usePlayer()
  const { updatePlayerState } = useUpdatePLayerState()

  const playPrevSong = async () => {
    await webPlayer.previousTrack()
    updatePlayerState()
  }
  return <Icon onClick={playPrevSong} className={iconClassNames} />
}

export default PrevTrack
