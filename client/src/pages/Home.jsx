import { useEffect } from 'react'
import { PageHead } from 'layouts'
import useSpotify from 'hooks/useSpotify'
import usePlayer from 'context/PlayerContext'
import useAuthentication from 'hooks/useAuthentication'
import useSocket from 'hooks/useSocket'
import 'wdyr'

const Home = () => {
  useAuthentication()
  const spotifyWebPlayer = useSpotify()
  const { setWebPlayer } = usePlayer()
  useSocket()

  useEffect(() => {
    setWebPlayer(spotifyWebPlayer)
  }, [spotifyWebPlayer])
  return (
    <>
      <PageHead heading={'Home'} />
    </>
  )
}

Home.whyDidYouRender = true

export default Home
