import usePlayer from '../context/PlayerContext'

const useUpdatePlayerState = () => {
  const {
    playback,
    webPlayer,
    setIsPaused,
    updateSong,
    updateSongId,
    updateAlbumName,
    updateAlbumId,
    updateArtistArr,
    updateSongDuration,
    setNextTracks,
    setPreviousTracks,
    setUri,
    setSongArtwork,
  } = usePlayer()

  const updatePlayerState = async () => {
    console.log('updating player state')
    try {
      const { track_window, duration, paused } =
        await webPlayer.getCurrentState()
      console.log(await track_window)
      setIsPaused(paused)
      updateSong(track_window.current_track.name)
      updateSongId(track_window.current_track.id)
      updateAlbumName(track_window.current_track.album.name)
      updateAlbumId(track_window.current_track.album.name)
      updateArtistArr(track_window.current_track.artists)
      updateSongDuration(duration)
      setNextTracks(track_window.next_tracks)
      setPreviousTracks(track_window.previous_tracks)
      setUri(track_window.current_track.uri)
      setSongArtwork(track_window.current_track.album.images)
    } catch (e) {
      console.error(e)
    } finally {
      console.log(await playback)
    }
  }
  return { updatePlayerState }
}

export default useUpdatePlayerState
