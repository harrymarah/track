import useAxios from 'hooks/useAxios'

const useSpotifySearch = () => {
  const { backendApiCall } = useAxios()
  const spotifySearch = async (
    query,
    cats = { track: true, artist: true, album: true, playlist: true }
  ) => {
    const { track, artist, album, playlist } = cats

    const config = {
      method: 'get',
      url: '/search',
      params: {
        searchTerm: query,
        track,
        artist,
        album,
        playlist,
      },
    }
    const { data } = await backendApiCall(config)
    return data
  }
  return { spotifySearch }
}

export default useSpotifySearch
