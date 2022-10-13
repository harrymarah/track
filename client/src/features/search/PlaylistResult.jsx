import React from 'react'
import styled from 'styled-components'
import SeeMoreChevron from './SeeMoreChevron'

const SingleResultContainer = styled.li`
  position: relative;
  width: 95%;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 5px auto;
  height: 50px;
  padding: 0.3rem 0.5rem;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
`

const PlaylistName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  padding: 0.2rem 0;
`
const PlaylistResultsContainer = styled.div`
  width: 99%;
  margin: auto;
  display: flex;
`
const Artwork = styled.img`
  margin-top: 5px;
  height: calc(50px + 0.6rem);
  aspect-ratio: 1 / 1;
  border-radius: 8px 0 0 8px;
  background-size: contain;
`

const TrackCount = styled.div`
  font-size: 0.8rem;
  font-style: italic;
`

const PlaylistResult = ({ searchResults }) => {
  return (
    <PlaylistResultsContainer>
      <Artwork src={searchResults.images[0].url} />
      <SingleResultContainer>
        <PlaylistName>{searchResults.name}</PlaylistName>
        <TrackCount>{searchResults.tracks.total} tracks</TrackCount>
        <SeeMoreChevron />
      </SingleResultContainer>
    </PlaylistResultsContainer>
  )
}

export default PlaylistResult
