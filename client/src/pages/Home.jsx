import { useEffect } from 'react'
import { PageHead } from 'layouts'
import useSpotify from 'hooks/useSpotify'
import usePlayer from 'context/PlayerContext'
import useAuthentication from 'hooks/useAuthentication'
import useSocket from 'hooks/useSocket'
import useLongPress from 'hooks/useLongPress'
import styled from 'styled-components'
import 'wdyr'

const TestButton = styled.div`
  background-color: var(--bright);
  color: var(--dark-blue);
  width: 60%;
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
`

const Home = () => {
  useAuthentication()
  const spotifyWebPlayer = useSpotify()
  const { setWebPlayer } = usePlayer()
  useSocket()

  useEffect(() => {
    setWebPlayer(spotifyWebPlayer)
  }, [spotifyWebPlayer])

  const handleClick = () => {
    console.log('clicked')
  }
  const handleLongPress = () => {
    console.log('long press')
  }
  return (
    <>
      <PageHead heading={'Home'} />
      <TestButton {...useLongPress(handleClick, handleLongPress)}>
        TEST LONG CLICK
      </TestButton>
    </>
  )
}

Home.whyDidYouRender = true

export default Home
