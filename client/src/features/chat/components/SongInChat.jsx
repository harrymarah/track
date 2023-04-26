import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: rgba(230, 241, 255, 0.1);
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

const SongInChat = () => {
  return (
    <Container>
      <SongInfoArea>
        <Artwork
          imgSrc={
            'https://i.scdn.co/image/ab67616d0000b2736b3fa88bdd4af566fbbf2bbf'
          }
        />
        <SongInfo>
          <div className="songName">I Bet You Look Good On The Dancefloor</div>
          <div className="artists">Arctic Monkeys</div>
          <div className="albumTitle">
            Whatever People Say I Am, That's What I'm Not
          </div>
        </SongInfo>
      </SongInfoArea>
      <Buttons>
        <ActionButton>play</ActionButton>
        <ActionButton>queue</ActionButton>
        <ActionButton>like</ActionButton>
      </Buttons>
    </Container>
  )
}

export default SongInChat
