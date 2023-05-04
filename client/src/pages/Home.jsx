import { useEffect, useState } from 'react'
import { PageHead } from 'layouts'
import useSpotify from 'hooks/useSpotify'
import usePlayer from 'context/PlayerContext'
import useAuthentication from 'hooks/useAuthentication'
import useSocket from 'hooks/useSocket'
import useAxios from 'hooks/useAxios'
import styled from 'styled-components'
import 'wdyr'
import FeaturedContentDisplay from 'features/explore/components/FeaturedContentDisplay'

const MainContainer = styled.div``
const FeaturedContentContainer = styled.div``
const Heading = styled.div`
  font-size: 1.3rem;
  margin-bottom: 8px;
`

const Home = () => {
  const { backendApiCall } = useAxios()
  const [topEightTracks, setTopEightTracks] = useState(null)
  const [topEightLoading, setTopEightLoading] = useState(true)
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(null)
  const [recentlyPlayedLoading, setRecentlyPlayedLoading] = useState(true)
  const getTopEightTracks = async () => {
    const config = {
      url: '/data/get-user-top-eight',
      method: 'get',
    }
    const { data } = await backendApiCall(config)
    console.log(data)
    setTopEightTracks(data)
    setTopEightLoading(false)
  }
  const getRecentlyPlayed = async () => {
    const config = {
      url: '/data/get-recently-played',
      method: 'get',
    }
    const { data } = await backendApiCall(config)
    console.log(data)
    setRecentlyPlayedTracks(data)
    setRecentlyPlayedLoading(false)
  }
  useAuthentication()
  const spotifyWebPlayer = useSpotify()
  const { setWebPlayer } = usePlayer()
  useSocket()

  useEffect(() => {
    setWebPlayer(spotifyWebPlayer)
  }, [spotifyWebPlayer])

  useEffect(() => {
    getTopEightTracks()
    getRecentlyPlayed()
  }, [])

  return (
    <>
      <PageHead heading={'Home'} />
      <MainContainer>
        <FeaturedContentContainer>
          <Heading>your top 8 tracks</Heading>
          <FeaturedContentDisplay
            contentType="songs"
            featuredContent={topEightTracks}
            contentIsLoading={topEightLoading}
          />
          <Heading>recently played</Heading>
          <FeaturedContentDisplay
            contentType="songs"
            featuredContent={recentlyPlayedTracks}
            contentIsLoading={recentlyPlayedLoading}
          />
        </FeaturedContentContainer>
      </MainContainer>
    </>
  )
}

Home.whyDidYouRender = false

export default Home
