import React from 'react'
import styled from 'styled-components'
import usePlaySong from 'hooks/usePlaySong'

const PlayBtn = styled.button`
  background-color: var(--bright);
  color: var(--dark-blue);
  margin: 0.2rem 0.5rem;
  padding: 4px 14px;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  border: none;
  font-family: inherit;
  &:disabled {
    opacity: 0.2;
  }
`

const PlayContentBtn = ({ uri, type = 'album', isDisabled = false }) => {
  const { playSong } = usePlaySong()
  return (
    <PlayBtn onClick={() => playSong(uri, type)} disabled={isDisabled}>
      <i className="fa-solid fa-play"></i>
      &#160;play
    </PlayBtn>
  )
}

export default PlayContentBtn
