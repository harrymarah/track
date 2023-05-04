import React from 'react'
import styled from 'styled-components'
import { TrackResult } from 'features/search'
import topTracksIcon from 'assets/top-tracks-icon.png'
import { SongOptionsModal } from 'features/explore'
import { useState } from 'react'

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
const PageTitle = styled.div`
  font-size: 1.8rem;
  margin: 1rem 7px 2rem;
`
const TopTracksImage = styled.div`
  width: 100%;
  height: 195px;
  background-image: url(${topTracksIcon});
  background-size: 65px;
`

const ShowTopTracks = ({ closeTopTracks, topTracksData, setTopTracksData }) => {
  const [showSongOptions, setShowSongOptions] = useState(false)
  const [songOptionsData, setSongOptionsData] = useState({
    name: '',
    artists: [],
    album: '',
    artwork: '',
    uri: '',
  })
  return (
    <>
      {showSongOptions && (
        <SongOptionsModal
          closeModal={() => setShowSongOptions(false)}
          songData={songOptionsData}
          setSongOptionsData={setSongOptionsData}
        />
      )}
      <Container>
        <Exit onClick={() => closeTopTracks()}>
          <i className="fa-solid fa-x"></i>
        </Exit>
        <TopTracksImage />
        <PageTitle>your saved tracks</PageTitle>
        {topTracksData.trackData.map((track) => {
          return (
            <TrackResult
              key={track.uri}
              searchResults={track}
              showOptionsModal={() => setShowSongOptions(true)}
              setSongOptionsData={setSongOptionsData}
            />
          )
        })}
      </Container>
    </>
  )
}

export default ShowTopTracks
