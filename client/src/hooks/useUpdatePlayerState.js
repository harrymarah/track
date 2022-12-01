import { useEffect } from 'react'
import usePlayer from 'context/PlayerContext'

const useUpdatePlayerState = (state) => {
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
    updateSongPosition,
    setNextTracks,
    setPreviousTracks,
    setUri,
    setSongArtwork,
  } = usePlayer()

  const updatePlayerState = (state) => {
    if (state !== undefined) {
      setIsPaused(state.paused)
      updateSong(state.track_window.current_track.name)
      updateSongId(state.track_window.current_track.id)
      updateAlbumName(state.track_window.current_track.album.name)
      updateAlbumId(state.track_window.current_track.album.name)
      updateArtistArr(state.track_window.current_track.artists)
      updateSongDuration(state.duration)
      updateSongPosition(state.position)
      setNextTracks(state.track_window.next_tracks)
      setPreviousTracks(state.track_window.previous_tracks)
      setUri(state.track_window.current_track.uri)
      setSongArtwork(state.track_window.current_track.album.images)
    }
  }

  return { updatePlayerState }
}

export default useUpdatePlayerState
