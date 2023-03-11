import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useAxios from 'hooks/useAxios'
import usePlaySong from 'hooks/usePlaySong'
import useSpotifySearch from 'hooks/useSpotifySearch'
import { PlayContentBtn } from 'features/search'
import { ShowAlbum, ShowPlaylist } from 'features/explore'
import Loading from 'components/Loading'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dark-blue);
  z-index: 15;
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
  // background-color: rgba(255, 255, 255, 0.1);
  margin: auto;
  border-radius: 8px;
  margin-top: 8px;
`
const Track = styled.div`
  font-size: 1.1rem;
  padding: 10px 10px;
  width: 95%;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 5px auto;
  border-radius: 8px;
  overflow: hidden;
`
const SeeMoreTracks = styled.div`
  width: 95%;
  margin: 5px auto;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(230, 241, 255, 0.2);
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
  background-color: rgba(230, 241, 255, 0.04);
  margin: 5px;
  padding: 10px;
  border-radius: 8px;
  width: 150px;
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
const SeeMoreAlbums = styled(SeeMoreTracks)`
  width: 90%;
`

const ShowArtist = ({ toggleShowFullArtist, searchResults }) => {
  const [topTracks, setTopTracks] = useState([])
  const [topTrackUris, setTopTrackUris] = useState([])
  const [albums, setAlbums] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [numOfTrackResults, setNumOfTrackResults] = useState(5)
  const [numOfAlbumResults, setNumOfAlbumResults] = useState(4)
  const [numOfPlaylistResults, setNumOfPlaylistResults] = useState(4)
  const [showFullAlbum, toggleShowFullAlbum] = useState(false)
  const [showFullPlaylist, toggleShowFullPlaylist] = useState(false)
  const [albumData, setAlbumData] = useState(null)
  const [playlistData, setPlaylistData] = useState(null)
  const [albumLoading, setAlbumLoading] = useState(true)
  const [playlistLoading, setPlaylistLoading] = useState(true)
  const [topTracksLoading, setTopTracksLoading] = useState(true)
  const { playSong } = usePlaySong()
  const { backendApiCall } = useAxios()
  const { spotifySearch } = useSpotifySearch()
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
          <Album
            key={album.id}
            onClick={() => {
              setAlbumData(album)
              toggleShowFullAlbum(true)
            }}
          >
            <img src={album.images[1].url} alt={album.name + 'album art'} />
            <div className="type">{album.type}</div>
            <div className="name">{album.name}</div>
          </Album>
        )
      })
    )
    setAlbumLoading(false)
  }
  const getArtistTopTracks = async (artistId) => {
    config.url = '/data/get-artist-top-tracks'
    const { data } = await backendApiCall(config)
    setTopTracks(
      data.map((track) => {
        return (
          <Track key={track.uri} onClick={() => playSong(track.uri)}>
            {track.name}
          </Track>
        )
      })
    )
    setTopTrackUris(
      data.map((track) => {
        return track.uri
      })
    )
    setTopTracksLoading(false)
  }
  const getPlaylists = async (name) => {
    const { playlists } = await spotifySearch(name, {
      track: false,
      artist: false,
      album: false,
      playlist: true,
    })
    setPlaylists(
      playlists.items.map((playlist) => {
        return (
          <Album
            key={playlist.id}
            onClick={() => {
              setPlaylistData(playlist)
              toggleShowFullPlaylist(true)
            }}
          >
            <img
              src={playlist.images[0].url}
              alt={playlist.name + 'playlist art'}
            />
            <div className="name">{playlist.name}</div>
          </Album>
        )
      })
    )
    setPlaylistLoading(false)
  }

  useEffect(() => {
    getArtistTopTracks()
    getArtistAlbums()
    getPlaylists(searchResults.name)
  }, [])

  return (
    <Container>
      <Exit onClick={() => toggleShowFullArtist(false)}>
        <i className="fa-solid fa-x"></i>
      </Exit>
      <Artwork src={searchResults.images[0].url} />
      <Artist>{searchResults.name}</Artist>
      <Heading>top tracks</Heading>
      <PlayContentBtn
        uri={topTrackUris}
        type="song"
        isDisabled={topTracksLoading}
      />
      <Loading loading={topTracksLoading} />
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
      <Loading loading={albumLoading} />
      {showFullAlbum ? (
        <ShowAlbum
          searchResults={albumData}
          toggleShowFullAlbum={toggleShowFullAlbum}
        />
      ) : (
        ''
      )}
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
      <Loading loading={playlistLoading} />
      {showFullPlaylist ? (
        <ShowPlaylist
          searchResults={playlistData}
          toggleShowFullPlaylist={toggleShowFullPlaylist}
        />
      ) : (
        ''
      )}
      <AlbumList>
        {playlists.slice(0, numOfPlaylistResults)}
        {numOfPlaylistResults < playlists.length ? (
          <SeeMoreAlbums
            onClick={() => setNumOfPlaylistResults(numOfPlaylistResults + 4)}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </SeeMoreAlbums>
        ) : (
          ''
        )}
      </AlbumList>
    </Container>
  )
}

export default ShowArtist
