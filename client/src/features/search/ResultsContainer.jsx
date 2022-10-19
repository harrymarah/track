import React from 'react'
import styled from 'styled-components'
import TrackResult from './TrackResult'
import ArtistResult from './ArtistResult'
import AlbumResult from './AlbumResult'
import PlaylistResult from './PlaylistResult'

const Results = styled.ul`
  overflow-y: scroll;
  width: 100%;
  height: calc(100% - 140px);
  // height: 250px;
  padding-bottom: 72px;
`
const ResultsHeading = styled.div`
  position: sticky;
  top: 0;
  width: 95%;
  font-size: 1.15rem;
  line-height: 20px;
  font-weight: 600;
  padding: 0.3rem 0.5rem;
  background-color: var(--bright);
  color: var(--black);
  margin: 5px auto;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  z-index: 5;
`

const ResultsContainer = ({ searchResults }) => {
  let allResults = {
    trackResults: [],
    artistResults: [],
    albumResults: [],
    playlistResults: [],
  }
  if (searchResults) {
    allResults.trackResults = searchResults.tracks.items.map((resultData) => {
      return <TrackResult key={resultData.id} searchResults={resultData} />
    })
    allResults.artistResults = searchResults.artists.items.map((resultData) => {
      return (
        <ArtistResult key={resultData.id} searchResults={resultData.name} />
      )
    })
    allResults.albumResults = searchResults.albums.items.map((resultData) => {
      return <AlbumResult key={resultData.id} searchResults={resultData} />
    })
    allResults.playlistResults = searchResults.playlists.items.map(
      (resultData) => {
        return <PlaylistResult key={resultData.id} searchResults={resultData} />
      }
    )
  }
  return (
    <Results>
      {allResults.trackResults.length ? (
        <ResultsHeading>tracks</ResultsHeading>
      ) : (
        ''
      )}
      {allResults.trackResults}

      {allResults.artistResults.length ? (
        <ResultsHeading>artists</ResultsHeading>
      ) : (
        ''
      )}
      {allResults.artistResults}

      {allResults.albumResults.length ? (
        <ResultsHeading>albums</ResultsHeading>
      ) : (
        ''
      )}
      {allResults.albumResults}

      {allResults.playlistResults.length ? (
        <ResultsHeading>playlist</ResultsHeading>
      ) : (
        ''
      )}
      {allResults.playlistResults}
    </Results>
  )
}

export default ResultsContainer
