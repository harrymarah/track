import React from 'react'
import styled from 'styled-components'
import usePlaySong from 'hooks/usePlaySong'

const PlayBtn = styled.div`
  background-color: var(--bright);
  color: var(--dark-blue);
  margin: 0.2rem 0.5rem;
  padding: 8px 18px;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
  cursor: pointer;
`

const PlayContentBtn = ({ uri }) => {
  const { playSong } = usePlaySong()
  return (
    <PlayBtn onClick={() => playSong(uri, 'album')}>
      <i className="fa-solid fa-play"></i>
      &#160;play
    </PlayBtn>
  )
}

export default PlayContentBtn
