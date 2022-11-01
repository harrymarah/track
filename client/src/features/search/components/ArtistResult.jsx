import React from 'react'
import styled from 'styled-components'
import SeeMoreChevron from 'features/search/components/SeeMoreChevron'

const SingleResultContainer = styled.li`
  width: 95%;
  height: 40px;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 5px auto;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`

const ArtistName = styled.div`
  font-weight: 400;
  font-size: 1rem;
  line-height: 40px;
  white-space: nowrap;
  z-index: -100;
`

const TrackResult = ({ searchResults }) => {
  return (
    <SingleResultContainer>
      <ArtistName>{searchResults}</ArtistName>
      <SeeMoreChevron />
    </SingleResultContainer>
  )
}

export default TrackResult
