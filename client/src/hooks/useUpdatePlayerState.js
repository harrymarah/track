import { useEffect } from 'react'
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
    updateSongPosition,
    setNextTracks,
    setPreviousTracks,
    setUri,
    setSongArtwork,
  } = usePlayer()

  const updatePlayerState = () => {
    console.count('updating player state')
    setTimeout(async () => {
      try {
        const { track_window, duration, position, paused } =
          (await webPlayer.getCurrentState()) || {}
        if (track_window === undefined) {
          return
        } else {
          await setIsPaused(paused)
          await updateSong(track_window.current_track.name)
          await updateSongId(track_window.current_track.id)
          await updateAlbumName(track_window.current_track.album.name)
          await updateAlbumId(track_window.current_track.album.name)
          await updateArtistArr(track_window.current_track.artists)
          await updateSongDuration(duration)
          await updateSongPosition(position)
          await setNextTracks(track_window.next_tracks)
          await setPreviousTracks(track_window.previous_tracks)
          await setUri(track_window.current_track.uri)
          await setSongArtwork(track_window.current_track.album.images)
        }
      } catch (e) {
        console.error(e)
      }
    }, 1000)
  }

  // const webPlayerObj = useMemo(() => ({ webPlayer }), [])

  useEffect(() => {
    updatePlayerState()
  }, [webPlayer])

  return { updatePlayerState }
}

export default useUpdatePlayerState
