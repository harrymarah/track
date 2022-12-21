import React from 'react'
import getArtists from 'utils/getArtists'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dark-blue);
  z-index: 20;
  overflow: scroll;
  padding-bottom: 150px;
`
const Artwork = styled.img`
  width: 100%;
  object-fit: contain;
`
const AlbumTitle = styled.h2`
  font-size: 1.6rem;
  margin: 0.5rem 7px 0;
`
const Artist = styled.h3`
  font-size: 1.2rem;
  margin: 0.1rem 0.5rem 0;
  font-weight: 400;
`
const TrackList = styled.div`
  width: 95%;
  background-color: rgba(255, 255, 255, 0.1);
  margin: auto;
  border-radius: 8px;
  margin-top: 8px;
`
const Track = styled.div`
  font-size: 1.1rem;
  padding: 10px 0 10px 10px;
  border-bottom: 1px solid #fff;
  &:nth-last-of-type(1) {
    border-bottom: none;
  }
`
const Exit = styled.div`
  position: fixed;
  background-color: rgba(120, 120, 120, 0.7);
  height: 45px;
  width: 45px;
  font-size: 1.3rem;
  right: 0;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 0;
`

const ShowAlbum = ({ searchResults, toggleShowFullAlbum }) => {
  return (
    <Container>
      <Exit onClick={() => toggleShowFullAlbum(false)}>
        <i className="fa-solid fa-x"></i>
      </Exit>
      <Artwork src={searchResults.images[0].url} />
      <AlbumTitle>{searchResults.name}</AlbumTitle>
      <Artist>{getArtists(searchResults.artists)}</Artist>
      <TrackList>
        <Track>Track 1</Track>
        <Track>Track 2</Track>
        <Track>Track 3</Track>
        <Track>Track 4</Track>
        <Track>Track 5</Track>
        <Track>Track 6</Track>
        <Track>Track 7</Track>
        <Track>Track 8</Track>
        <Track>Track 9</Track>
        <Track>Track 10</Track>
        <Track>Track 11</Track>
        <Track>Track 12</Track>
        <Track>Track 13</Track>
        <Track>Track 14</Track>
      </TrackList>
    </Container>
  )
}

export default ShowAlbum
