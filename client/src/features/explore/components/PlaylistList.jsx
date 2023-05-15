import React from 'react'
import styled from 'styled-components'
import { PlaylistResult } from 'features/search'
import { TopTracksSelector } from 'features/explore'
import useAxios from 'hooks/useAxios'
import { useEffect, useState } from 'react'
import Loading from 'components/Loading'

const Container = styled.ul`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 60px;
`

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([])
  const [topTracksData, setTopTracksData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { backendApiCall } = useAxios()
  const getPlaylists = async () => {
    const config = {
      method: 'get',
      url: '/data/get-users-playlists',
    }
    const { data } = await backendApiCall(config)
    setIsLoading(false)
    setPlaylists(
      data.map((playlist) => {
        return <PlaylistResult key={playlist.id} searchResults={playlist} />
      })
    )
  }
  const getTopTracksData = async () => {
    const config = {
      method: 'get',
      url: '/data/get-users-tracks',
    }
    const { data } = await backendApiCall(config)
    setIsLoading(false)
    setTopTracksData(data)
  }
  useEffect(() => {
    getPlaylists()
    getTopTracksData()
  }, [])

  return (
    <Container>
      {isLoading && (
        <Loading loading={isLoading} customCss={{ minHeight: '50%' }} />
      )}
      {topTracksData && (
        <TopTracksSelector
          topTracksData={topTracksData}
          setTopTracksData={setTopTracksData}
        />
      )}
      {playlists}
    </Container>
  )
}

export default PlaylistList
