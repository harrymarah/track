import React from 'react'
import styled from 'styled-components'

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  cursor: pointer;
`

const Button = styled.button`
  all: unset;
  background: ${(props) =>
    props.selected ? 'var(--light)' : 'rgba(120,120,120,0.6)'};
  color: var(--black);
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  border-radius: 5px;
`

const SearchFilterButtons = ({ show, toggle }) => {
  const { showTracks, showArtists, showAlbums, showPlaylists } = show
  const {
    toggleShowTracks,
    toggleShowArtists,
    toggleShowAlbums,
    toggleShowPlaylists,
  } = toggle
  return (
    <Buttons>
      <Button
        selected={showTracks}
        onClick={() => toggleShowTracks(!showTracks)}
      >
        tracks
      </Button>
      <Button
        selected={showArtists}
        onClick={() => toggleShowArtists(!showArtists)}
      >
        artists
      </Button>
      <Button
        selected={showAlbums}
        onClick={() => toggleShowAlbums(!showAlbums)}
      >
        albums
      </Button>
      <Button
        selected={showPlaylists}
        onClick={() => toggleShowPlaylists(!showPlaylists)}
      >
        playlists
      </Button>
    </Buttons>
  )
}

export default SearchFilterButtons
