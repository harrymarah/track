import React from 'react'
import styled from 'styled-components'
import SeeMoreChevron from 'features/search/components/SeeMoreChevron'
import { useState } from 'react'
import { ShowTopTracks } from 'features/explore'
import topTracksIcon from 'assets/top-tracks-icon.png'

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

const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  padding: 0.2rem 0;
`
const TopTracksSelectorContainer = styled.div`
  width: 99%;
  margin: auto;
  display: flex;
  border-bottom: 0.5px dotted var(--light);
  margin-bottom: 10px;
  padding-bottom: 10px;
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

const TopTracksSelector = ({ topTracksData, setTopTracksData }) => {
  const [showTopTracks, toggleShowTopTracks] = useState(false)
  return (
    <>
      {showTopTracks ? (
        <ShowTopTracks
          topTracksData={topTracksData}
          setTopTracksData={setTopTracksData}
          closeTopTracks={() => toggleShowTopTracks(false)}
        />
      ) : (
        ''
      )}
      <TopTracksSelectorContainer onClick={() => toggleShowTopTracks(true)}>
        <Artwork src={topTracksIcon} />
        <SingleResultContainer>
          <Title>your saved tracks</Title>
          <TrackCount>{topTracksData.noOfTracks} tracks</TrackCount>
          <SeeMoreChevron />
        </SingleResultContainer>
      </TopTracksSelectorContainer>
    </>
  )
}

export default TopTracksSelector
