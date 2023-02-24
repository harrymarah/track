import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useAxios from 'hooks/useAxios'
import usePlaySong from 'hooks/usePlaySong'
import PlayContentBtn from 'features/search/components/PlayContentBtn'

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
const Artist = styled.h2`
  font-size: 1.6rem;
  margin: 2rem 7px 0;
`
const Heading = styled.h3`
  font-size: 1.2rem;
  margin: 0.3rem 0.5rem;
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
  padding: 10px 10px;
  border-bottom: 1px solid #fff;
  &:nth-last-of-type(1) {
    border-bottom: none;
  }
`
const SeeMoreTracks = styled.div`
  background-color: var(--bright);
  color: var(--dark-blue);
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
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
const AlbumList = styled.div`
  display: flex;
  margin: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`
const Album = styled.div`
  margin: 10px;
  width: 160px;
  display: flex;
  flex-direction: column;
  .type {
    font-weight: 600;
    font-size: 0.9rem;
    margin-top: 10px;
  }
  .name {
    margin-top: 6px;
  }
`
const SeeMoreAlbums = styled.div`
  background-color: var(--bright);
  color: var(--dark-blue);
  font-size: 2rem;
  border-radius: 30px;
  padding: 5px 20px;
`

const ShowArtist = ({ toggleShowFullArtist, searchResults }) => {
  const [topTracks, setTopTracks] = useState([])
  const [albums, setAlbums] = useState([])
  const [numOfTrackResults, setNumOfTrackResults] = useState(5)
  const [numOfAlbumResults, setNumOfAlbumResults] = useState(4)
  const { backendApiCall } = useAxios()
  const config = {
    method: 'get',
    params: {
      artistId: searchResults.id,
    },
  }
  const getArtistAlbums = async (artistId) => {
    config.url = '/data/get-artist-albums'
    const { data } = await backendApiCall(config)
    setAlbums(
      data.map((album) => {
        return (
          <Album>
            <img src={album.imageUrl} alt={album.name + 'album art'} />
            <div className="type">{album.type}</div>
            <div className="name">{album.name}</div>
          </Album>
        )
      })
    )
  }
  const getArtistTopTracks = async (artistId) => {
    config.url = '/data/get-artist-top-tracks'
    const { data } = await backendApiCall(config)
    setTopTracks(
      data.map((track) => {
        return <Track key={track.uri}>{track.name}</Track>
      })
    )
  }

  useEffect(() => {
    getArtistTopTracks()
    getArtistAlbums()
  }, [])

  return (
    <Container>
      <Exit onClick={() => toggleShowFullArtist(false)}>
        <i className="fa-solid fa-x"></i>
      </Exit>
      <Artwork src={searchResults.images[0].url} />
      <Artist>{searchResults.name}</Artist>
      <Heading>top tracks</Heading>
      <TrackList>
        {topTracks.slice(0, numOfTrackResults)}
        {numOfTrackResults < topTracks.length ? (
          <SeeMoreTracks
            onClick={() => setNumOfTrackResults(numOfTrackResults + 5)}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </SeeMoreTracks>
        ) : (
          ''
        )}
      </TrackList>
      <Heading>albums</Heading>
      <AlbumList>
        {albums.slice(0, numOfAlbumResults)}
        {numOfAlbumResults < albums.length ? (
          <SeeMoreAlbums
            onClick={() => setNumOfAlbumResults(numOfAlbumResults + 4)}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </SeeMoreAlbums>
        ) : (
          ''
        )}
      </AlbumList>
      <Heading>playlists</Heading>
    </Container>
  )
}

export default ShowArtist
