import { useState } from 'react'
import ModalContainer from 'components/ModalContainer'
import styled from 'styled-components'
import getArtists from 'utils/getArtists'
import { ShareSong, useQueueSong } from 'features/explore'

const Title = styled.div`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`
const CloseBtn = styled.i`
  color: var(--red);
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.3rem;
  padding: 10px;
`
const SongOptionsBox = styled.div`
  width: 88%;
  height: ${(props) => props.height};
  background-color: var(--dark-blue);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  align-items: center;
  position: relative;
  margin-top: 33%;
`
const SongTile = styled.div`
  width: 95%;
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 8px;
`
const Artwork = styled.div`
  height: 120px;
  width: 120px;
  flex-shrink: 0;
  background-image: url(${(props) => props.imgSrc});
  background-size: contain;
`
const SongInfo = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  font-size: 1.15rem;
  justify-content: space-evenly;
  margin-left: 10px;
  .title {
    font-weight: 600;
  }
  .album {
    font-style: italic;
  }
`
const Buttons = styled.div`
  margin-top: 15px;
  width: 95%;
  display: flex;
  justify-content: center;
  gap: 30px;
`
const ShareBtn = styled.div`
  background-color: var(--bright);
  color: var(--dark-blue);
  padding-right: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  font-weight: 600;
  i {
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
    align-items: center;
    border-radius: 6px 0 0 6px;
    padding: 0 9px;
    margin-right: 10px;
  }
`
const QueueBtn = styled(ShareBtn)``

const SongOptionsModal = ({ closeModal, songData, setSongOptionsData }) => {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [modalHeight, setModalHeight] = useState('250px')
  const { queueSong } = useQueueSong()
  const { name, artists, album, artwork, uri } = songData
  const handleClose = () => {
    setSongOptionsData({
      name: '',
      artists: [],
      album: '',
      artwork: '',
      uri: '',
    })
    closeModal()
  }

  const openShareOptions = () => {
    setModalHeight('300px')
    setShowShareOptions(true)
  }

  return (
    <ModalContainer onClick={() => handleClose()}>
      <SongOptionsBox height={modalHeight}>
        <CloseBtn className="fa-solid fa-x" onClick={() => handleClose()} />
        <Title>song options</Title>
        <SongTile>
          <Artwork imgSrc={artwork} />
          <SongInfo>
            <div className="title">{name}</div>
            <div className="artist">{getArtists(artists)}</div>
            <div className="album">{album}</div>
          </SongInfo>
        </SongTile>
        <Buttons>
          <ShareBtn onClick={() => openShareOptions()}>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>share
            track
          </ShareBtn>
          <QueueBtn onClick={() => queueSong(uri)}>
            <i className="fa-solid fa-plus"></i>add to queue
          </QueueBtn>
        </Buttons>
        {showShareOptions && (
          <ShareSong
            songData={songData}
            setShowShareOptions={setShowShareOptions}
            setModalHeight={setModalHeight}
          />
        )}
      </SongOptionsBox>
    </ModalContainer>
  )
}

export default SongOptionsModal
