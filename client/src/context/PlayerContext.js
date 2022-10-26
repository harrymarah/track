import { createContext, useReducer, useContext } from 'react'
import playbackReducer, {
  ACTIONS,
  initialState,
} from '../reducers/playbackReducer'

const PlayerContext = createContext(initialState)

export const PlayerProvider = ({ children }) => {
  const [playback, dispatch] = useReducer(playbackReducer, initialState)

  const setWebPlayer = (player) => {
    dispatch({ type: ACTIONS.SET_WEB_PLAYER, payload: player })
  }
  const resetAllButWebPlayer = () => {
    dispatch({ type: ACTIONS.RESET_ALL_BUT_WEB_PLAYER })
  }
  const updateSong = (trackName) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TRACK, payload: trackName })
  }
  const updateSongId = (songId) => {
    dispatch({ type: ACTIONS.SET_SONG_ID, payload: songId })
  }
  const updateAlbumName = (albumName) => {
    dispatch({ type: ACTIONS.SET_ALBUM_NAME, payload: albumName })
  }
  const updateAlbumId = (albumId) => {
    dispatch({ type: ACTIONS.SET_ALBUM_ID, payload: albumId })
  }
  const updateArtistArr = (artistArr) => {
    dispatch({ type: ACTIONS.SET_ARTIST_ARR, payload: artistArr })
  }
  const updateArtistId = (artistId) => {
    dispatch({ type: ACTIONS.SET_ARTIST_ID, payload: artistId })
  }
  const setIsPaused = (bool) => {
    dispatch({ type: ACTIONS.SET_IS_PAUSED, payload: bool })
  }
  const updateSongDuration = (songDuration) => {
    dispatch({ type: ACTIONS.SET_SONG_DURATION, payload: songDuration })
  }
  const updateSongPosition = (songPosition) => {
    dispatch({ type: ACTIONS.UPDATE_SONG_POSITION, payload: songPosition })
  }
  const setNextTracks = ([nextTracksArr]) => {
    dispatch({ type: ACTIONS.SET_NEXT_TRACKS, payload: [nextTracksArr] })
  }
  const setPreviousTracks = ([prevTracksArr]) => {
    dispatch({ type: ACTIONS.SET_PREV_TRACKS, payload: [prevTracksArr] })
  }
  const setUri = (uri) => {
    dispatch({ type: ACTIONS.SET_URI, payload: uri })
  }
  const setSongArtwork = (artworkUrl) => {
    dispatch({ type: ACTIONS.SET_ARTWORK, payload: artworkUrl })
  }

  const value = {
    webPlayer: playback.webPlayer,
    playback,
    currentTrack: playback.currentTrack,
    songId: playback.songId,
    albumName: playback.albumName,
    albumId: playback.albumId,
    artistId: playback.artistId,
    artistArr: playback.artistArr,
    isPaused: playback.isPaused,
    songDuration: playback.songDuration,
    songPosition: playback.songPosition,
    nextTracks: playback.nextTracks,
    prevTracks: playback.prevTracks,
    uri: playback.uri,
    artwork: playback.artwork,
    setWebPlayer,
    resetAllButWebPlayer,
    updateSong,
    updateSongId,
    updateAlbumName,
    updateAlbumId,
    updateArtistArr,
    updateArtistId,
    setIsPaused,
    updateSongDuration,
    updateSongPosition,
    setNextTracks,
    setPreviousTracks,
    setUri,
    setSongArtwork,
  }
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  )
}

const usePlayer = () => {
  const context = useContext(PlayerContext)

  if (context === undefined) {
    throw new Error('usePlayer must be used within PlayerContext')
  }

  return context
}

export default usePlayer
