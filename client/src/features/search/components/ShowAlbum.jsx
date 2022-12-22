import React, { useEffect, useState } from 'react'
import getArtists from 'utils/getArtists'
import styled from 'styled-components'
import useAxios from 'hooks/useAxios'

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
  const [tracks, setTracks] = useState([])
  const { backendApiCall } = useAxios()
  const getAlbumTracks = async (albumId) => {
    const config = {
      method: 'get',
      url: '/data/get-album-tracks',
      params: {
        albumId: albumId,
      },
    }
    const { data } = await backendApiCall(config)
    console.log(data)
    return data
  }
  useEffect(() => {
    getAlbumTracks(searchResults.id).then((results) => console.log(results))
  }, [])

  return (
    <Container>
      <Exit onClick={() => toggleShowFullAlbum(false)}>
        <i className="fa-solid fa-x"></i>
      </Exit>
      <Artwork src={searchResults.images[0].url} />
      <AlbumTitle>{searchResults.name}</AlbumTitle>
      <Artist>{getArtists(searchResults.artists)}</Artist>
      <TrackList></TrackList>
    </Container>
  )
}

export default ShowAlbum
