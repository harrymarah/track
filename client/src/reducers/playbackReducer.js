export const initialState = {
  webPlayer: undefined,
  currentTrack: '',
  songId: '',
  albumName: '',
  albumId: '',
  artistArr: [],
  artistId: [],
  isPaused: true,
  songDuration: 0,
  songPosition: 0,
  nextTracks: [],
  prevTracks: [],
  uri: '',
  artwork: '',
}

export const ACTIONS = {
  SET_WEB_PLAYER: 'set spotify SDK web player',
  RESET_ALL_BUT_WEB_PLAYER: 'reset state expect for web player',
  SET_CURRENT_TRACK: 'set current track',
  SET_SONG_ID: 'set song ID',
  SET_ALBUM_NAME: 'set album name',
  SET_ALBUM_ID: 'set album ID',
  SET_ARTIST_ARR: 'set artist array',
  SET_ARTIST_ID: 'set artist ID',
  SET_IS_PAUSED: 'set is paused',
  SET_SONG_DURATION: 'set song duration',
  UPDATE_SONG_POSITION: 'update song position',
  SET_NEXT_TRACKS: 'set next tracks',
  SET_PREV_TRACKS: 'set previous tracks',
  SET_URI: 'set song uri',
  SET_ARTWORK: 'set artwork',
}

const playbackReducer = (player, action) => {
  switch (action.type) {
    case ACTIONS.SET_WEB_PLAYER:
      return { ...player, webPlayer: action.payload }
    case ACTIONS.RESET_ALL_BUT_WEB_PLAYER:
      const webPlayer = player.webPlayer
      return { ...initialState, webPlayer: webPlayer }
    case ACTIONS.SET_CURRENT_TRACK:
      return { ...player, currentTrack: action.payload }
    case ACTIONS.SET_SONG_ID:
      return { ...player, songId: action.payload }
    case ACTIONS.SET_ALBUM_NAME:
      return { ...player, albumName: action.payload }
    case ACTIONS.SET_ALBUM_ID:
      return { ...player, albumId: action.payload }
    case ACTIONS.SET_ARTIST_ARR:
      return { ...player, artistArr: action.payload }
    case ACTIONS.SET_ARTIST_ID:
      return { ...player, artistId: action.payload }
    case ACTIONS.SET_IS_PAUSED:
      return { ...player, isPaused: action.payload }
    case ACTIONS.SET_SONG_DURATION:
      return { ...player, songDuration: action.payload }
    case ACTIONS.UPDATE_SONG_POSITION:
      return { ...player, songPosition: action.payload }
    case ACTIONS.SET_NEXT_TRACKS:
      return { ...player, nextTracks: action.payload }
    case ACTIONS.SET_PREV_TRACKS:
      return { ...player, prevTracks: action.payload }
    case ACTIONS.SET_URI:
      return { ...player, uri: action.payload }
    case ACTIONS.SET_ARTWORK:
      return { ...player, artwork: action.payload }
    default:
      return player
  }
}

export default playbackReducer
