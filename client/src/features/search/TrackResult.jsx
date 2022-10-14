import React, { useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import getArtists from './getArtists'
import { AuthContext } from '../../context/AuthContext'

import qs from 'qs'

const SingleResultContainer = styled.li`
  width: 95%;
  height: 60px;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 5px auto;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  overflow: hidden;
`

const TrackName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 3px;
`
const ArtistName = styled.div`
  // display: inline-block;
  margin-right: 10px;
  font-size: 0.9rem;
  margin-bottom: 2px;
`
const AlbumName = styled.div`
  // display: inline-block;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 2px;
`

const playSong = (uri, token) => {
  const setPlayback = (token) => {
    const data = qs.stringify({
      device_ids: ['13afbe1e9d046d761b13f9694a616fbc7fccc994'],
      play: true,
    })
    const config = {
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    }
    axios(config).catch((e) => console.log(e.response.data.error))
  }
  setPlayback(token)
  const config = {
    method: 'put',
    url: 'https://api.spotify.com/v1/me/player/play',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    query: {
      device_id: '13afbe1e9d046d761b13f9694a616fbc7fccc994',
    },
    body: {
      'context-uri': uri,
      position_ms: 0,
    },
  }
  axios(config).catch((e) => console.log(e.response.data.error))
}

const TrackResult = ({ searchResults, uri }) => {
  const auth = useContext(AuthContext)
  return (
    <SingleResultContainer onClick={(e) => playSong(uri, auth.token)}>
      <TrackName>{searchResults.name}</TrackName>
      <ArtistName>{getArtists(searchResults.artists)}</ArtistName>
      <AlbumName>{searchResults.album.name}</AlbumName>
    </SingleResultContainer>
  )
}

export default TrackResult
