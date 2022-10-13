import React from 'react'
import styled from 'styled-components'
import getArtists from './getArtists'
import SeeMoreChevron from './SeeMoreChevron'

const SingleResultContainer = styled.li`
  position: relative;
  width: 95%;
  height: 50px;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 5px auto;
  padding: 0.3rem 0.5rem;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
`
const AlbumName = styled.div`
  font-weight: 400;
  font-size: 1.3rem;
  white-space: nowrap;
  line-height: 25px;
`
const ArtistName = styled.div`
  font-weight: 400;
  font-size: 1rem;
  font-style: italic;
  white-space: nowrap;
  line-height: 25px;
`
const AlbumResultContainer = styled.div`
  width: 99%;
  margin: auto;
  display: flex;
`

const Artwork = styled.img`
  margin-top: 5px;
  height: calc(50px + 0.6rem);
  border-radius: 8px 0 0 8px;
`

const AlbumResult = ({ searchResults }) => {
  return (
    <AlbumResultContainer>
      <Artwork src={searchResults.images[2].url} />
      <SingleResultContainer>
        <AlbumName>{searchResults.name}</AlbumName>
        <ArtistName>{getArtists(searchResults.artists)}</ArtistName>
        <SeeMoreChevron />
      </SingleResultContainer>
    </AlbumResultContainer>
  )
}

export default AlbumResult
