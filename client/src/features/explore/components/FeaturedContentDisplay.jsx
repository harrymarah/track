import React from 'react'
import styled from 'styled-components'
import Loading from 'components/Loading'
import usePlaySong from 'hooks/usePlaySong'
import useLongPress from 'hooks/useLongPress'

const ContentContainer = styled.div`
  width: 100%;
  min-height: 126px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`
const FeaturedContent = styled.div`
  width: 20.5%;
  background-color: var(--dark-blue);
  border-radius: 5px;
  margin: 5px;
  padding: 6px 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Artwork = styled.div`
  width: 95%;
  background-image: url(${(props) => props.artworkUrl});
  margin: auto;
  background-size: cover;
  margin-bottom: 3px;
  align-self: flex-start;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`
const Title = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  width: 95%;
  margin: auto;
  height: 3em;
`
// const Artist = styled.div`
//   font-size: 0.7rem;
//   font-style: italic;
//   width: 70px;
//   margin: auto;
//   color: var(--light);
// `

const FeaturedContentDisplay = ({
  contentType,
  featuredContent,
  contentIsLoading,
  setData,
  openComponent,
}) => {
  const { playSong } = usePlaySong()
  const handleClick = async (uri, token) => {
    await playSong(uri, token)
  }
  const handleLongPress = (data) => {
    setData(data)
    openComponent()
  }
  // {...useLongPress(
  //   () => handleClick(trackData.uri),
  //   () => handleLongPress(trackData)
  // )}
  const renderTracks = (trackData) => {
    if (!trackData) return
    const trackDetails = trackData.map((track) => {
      return (
        <FeaturedContent>
          <Artwork artworkUrl={track.album.images[1].url} />
          <Title>{track.trackName}</Title>
          {/* <Artist>{getArtists(track.artists)}</Artist> */}
        </FeaturedContent>
      )
    })
    return trackDetails
  }
  const renderPlaylists = (playlistData) => {
    if (!playlistData) return
    const playlists = playlistData.map((playlist) => {
      return (
        <FeaturedContent>
          <Artwork artworkUrl={playlist.artwork} />
          <Title>{playlist.playlistName}</Title>
        </FeaturedContent>
      )
    })
    return playlists
  }
  return (
    <ContentContainer>
      {contentIsLoading && <Loading />}
      {featuredContent && contentType === 'songs'
        ? renderTracks(featuredContent)
        : renderPlaylists(featuredContent)}
    </ContentContainer>
  )
}

export default FeaturedContentDisplay
