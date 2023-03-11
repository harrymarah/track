import React from 'react'
import styled from 'styled-components'
import { PlaylistResult } from 'features/search'
import useAxios from 'hooks/useAxios'
import { useEffect, useState } from 'react'

const Container = styled.ul`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 60px;
`

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([])
  const { backendApiCall } = useAxios()
  const getPlaylists = async () => {
    const config = {
      method: 'get',
      url: '/data/get-users-playlists',
    }
    const { data } = await backendApiCall(config)
    setPlaylists(
      data.map((playlist) => {
        return <PlaylistResult key={playlist.id} searchResults={playlist} />
      })
    )
  }
  useEffect(() => {
    getPlaylists()
  }, [])

  return <Container>{playlists}</Container>
}

export default PlaylistList
