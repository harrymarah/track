import styled from 'styled-components'
import { useQueueSong } from 'features/explore'
import usePlaySong from 'hooks/usePlaySong'

const Container = styled.div`
  background-color: ${(props) =>
    props.sendByUser ? 'rgba(156, 255, 217, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  margin: 10px auto;
  padding: 0.6rem;
  border-radius: 8px;
`
const SongInfoArea = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 7px;
  border-radius: 8px;
`
const Artwork = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  height: 130px;
  width: 130px;
  background-image: url(${(props) => props.imgSrc});
  background-size: contain;
`
const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8px;
  .songName {
    font-weight: 600;
    margin-bottom: 5px;
  }
  .artists {
    margin-bottom: 5px;
  }
  .albumTitle {
    font-style: italic;
  }
`
const ActionButton = styled.div`
  background-color: var(--bright);
  color: var(--dark-blue);
  align-items: center;
  border-radius: 6px;
  font-weight: 600;
  padding: 5px;
  width: 27%;
  text-align: center;
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const SongInChat = ({ songData }) => {
  const { songName, artist, album, artworkUrl, sendByUser, uri } = songData
  const { queueSong } = useQueueSong()
  const { playSong } = usePlaySong()
  return (
    <Container sendByUser={sendByUser}>
      <SongInfoArea>
        <Artwork imgSrc={artworkUrl} />
        <SongInfo>
          <div className="songName">{songName}</div>
          <div className="artists">{artist}</div>
          <div className="albumTitle">{album}</div>
        </SongInfo>
      </SongInfoArea>
      <Buttons>
        <ActionButton onClick={() => playSong(uri)}>play</ActionButton>
        <ActionButton onClick={() => queueSong(uri)}>queue</ActionButton>
        <ActionButton>like</ActionButton>
      </Buttons>
    </Container>
  )
}

export default SongInChat
