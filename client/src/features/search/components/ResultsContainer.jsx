import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import {
  TrackResult,
  ArtistResult,
  AlbumResult,
  PlaylistResult,
  MoreResults,
  SearchFilterButtons,
} from 'features/search'

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
  const [noOfTracks, setNoOfTracks] = useState(10)
  const [noOfArtists, setNoOfArtists] = useState(1)
  const [noOfAlbums, setNoOfAlbums] = useState(5)
  const [noOfPlaylists, setNoOfPlaylists] = useState(3)
  const [showTracks, toggleShowTracks] = useState(true)
  const [showArtists, toggleShowArtists] = useState(true)
  const [showAlbums, toggleShowAlbums] = useState(true)
  const [showPlaylists, toggleShowPlaylists] = useState(true)
  let allResults = {
    trackResults: [],
    artistResults: [],
    albumResults: [],
    playlistResults: [],
  }
  useEffect(() => {
    setNoOfArtists(1)
    setNoOfTracks(10)
    setNoOfAlbums(5)
    setNoOfPlaylists(3)
  }, [searchResults])

  if (searchResults.tracks && showTracks) {
    allResults.trackResults = searchResults.tracks.items.map((resultData) => {
      return <TrackResult key={resultData.id} searchResults={resultData} />
    })
  }

  if (searchResults.artists && showArtists) {
    allResults.artistResults = searchResults.artists.items.map((resultData) => {
      return <ArtistResult key={resultData.id} searchResults={resultData} />
    })
  }

  if (searchResults.albums && showAlbums) {
    allResults.albumResults = searchResults.albums.items.map((resultData) => {
      return <AlbumResult key={resultData.id} searchResults={resultData} />
    })
  }

  if (searchResults.playlists && showPlaylists) {
    allResults.playlistResults = searchResults.playlists.items.map(
      (resultData) => {
        return <PlaylistResult key={resultData.id} searchResults={resultData} />
      }
    )
  }

  return (
    <Results>
      <SearchFilterButtons
        show={{ showTracks, showArtists, showAlbums, showPlaylists }}
        toggle={{
          toggleShowTracks,
          toggleShowArtists,
          toggleShowAlbums,
          toggleShowPlaylists,
        }}
      />
      {allResults.artistResults.length ? (
        <>
          <ResultsHeading>artists</ResultsHeading>
          {allResults.artistResults.slice(0, noOfArtists)}
          {allResults.artistResults.length > noOfArtists && (
            <MoreResults onClick={() => setNoOfArtists(noOfArtists + 5)} />
          )}
        </>
      ) : (
        ''
      )}

      {allResults.trackResults.length ? (
        <>
          <ResultsHeading>tracks</ResultsHeading>
          {allResults.trackResults.slice(0, noOfTracks)}
          {allResults.trackResults.length > noOfTracks && (
            <MoreResults onClick={() => setNoOfTracks(noOfTracks + 10)} />
          )}
        </>
      ) : (
        ''
      )}

      {allResults.albumResults.length ? (
        <>
          <ResultsHeading>albums</ResultsHeading>
          {allResults.albumResults.slice(0, noOfAlbums)}
          {allResults.albumResults.length > noOfAlbums && (
            <MoreResults onClick={() => setNoOfAlbums(noOfAlbums + 5)} />
          )}
        </>
      ) : (
        ''
      )}

      {allResults.playlistResults.length ? (
        <>
          <ResultsHeading>playlist</ResultsHeading>
          {allResults.playlistResults.slice(0, noOfPlaylists)}
          {allResults.playlistResults.length > noOfPlaylists && (
            <MoreResults onClick={() => setNoOfPlaylists(noOfPlaylists + 5)} />
          )}
        </>
      ) : (
        ''
      )}
    </Results>
  )
}

export default ResultsContainer
