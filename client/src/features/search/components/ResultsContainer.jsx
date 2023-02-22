import React from 'react'
import styled from 'styled-components'
import TrackResult from 'features/search/components/TrackResult'
import ArtistResult from 'features/search/components/ArtistResult'
import AlbumResult from 'features/search/components/AlbumResult'
import PlaylistResult from 'features/search/components/PlaylistResult'
import MoreResults from './MoreResults'

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

  if (searchResults.tracks) {
    allResults.trackResults = searchResults.tracks.items.map((resultData) => {
      return <TrackResult key={resultData.id} searchResults={resultData} />
    })
    allResults.trackResults.push(<MoreResults />)
  }

  if (searchResults.artists) {
    allResults.artistResults = searchResults.artists.items.map((resultData) => {
      return <ArtistResult key={resultData.id} searchResults={resultData} />
    })
    allResults.artistResults.push(<MoreResults />)
  }

  if (searchResults.albums) {
    allResults.albumResults = searchResults.albums.items.map((resultData) => {
      return <AlbumResult key={resultData.id} searchResults={resultData} />
    })
    allResults.albumResults.push(<MoreResults />)
  }

  if (searchResults.playlists) {
    allResults.playlistResults = searchResults.playlists.items.map(
      (resultData) => {
        return <PlaylistResult key={resultData.id} searchResults={resultData} />
      }
    )
    allResults.playlistResults.push(<MoreResults />)
  }

  return (
    <Results>
      {allResults.artistResults.length ? (
        <ResultsHeading>artists</ResultsHeading>
      ) : (
        ''
      )}
      {allResults.artistResults}

      {allResults.trackResults.length ? (
        <ResultsHeading>tracks</ResultsHeading>
      ) : (
        ''
      )}
      {allResults.trackResults}

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
