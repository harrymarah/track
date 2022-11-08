import trackSearch from 'services/trackSearch'
import artistSearch from 'services/artistSearch'
import albumSearch from 'services/albumSearch'
import playlistSearch from 'services/playlistSearch'

const spotifySearch = async (query, token, searchObject = {}) => {
  const { tracks } = await trackSearch(query, token)
  const { artists } = await artistSearch(query, token)
  const { albums } = await albumSearch(query, token)
  const { playlists } = await playlistSearch(query, token)

  return {
    tracks,
    artists,
    albums,
    playlists,
  }
}

export default spotifySearch
