import React from 'react'
import styled from 'styled-components'
import usePlayer from 'context/PlayerContext'

const Icon = styled.i`
  color: var(--light);
  font-size: 40px;
`
const iconClassNames = ['fa-solid', 'fa-forward']

const NextTrack = () => {
  const { webPlayer } = usePlayer()

  const playNextSong = async () => {
    await webPlayer.nextTrack()
  }
  return <Icon onClick={playNextSong} className={iconClassNames} />
}

export default NextTrack
