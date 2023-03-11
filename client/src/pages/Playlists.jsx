import React from 'react'
import { PageHead } from 'layouts'
import { PlaylistList } from 'features/explore'

const Playlists = () => {
  return (
    <>
      <PageHead heading={'Playlists'} />
      <PlaylistList></PlaylistList>
    </>
  )
}

export default Playlists
