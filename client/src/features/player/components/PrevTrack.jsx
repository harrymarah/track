import React from 'react'
import styled from 'styled-components'
import usePlayer from 'context/PlayerContext'

const Icon = styled.i`
  color: var(--light);
  font-size: 40px;
`
const iconClassNames = ['fa-solid', 'fa-backward']

const PrevTrack = () => {
  const { webPlayer } = usePlayer()

  const playPrevSong = async () => {
    await webPlayer.previousTrack()
  }
  return <Icon onClick={playPrevSong} className={iconClassNames} />
}

export default PrevTrack
