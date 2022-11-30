const getLoggedInCookie = () => {
  const loggedInStatus = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('isAuthenticated'))
    ?.split('=')[1]
  if (loggedInStatus === 'true') return true
  else return false
}

export const initialState = {
  username: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: getLoggedInCookie(),
  isLoading: true,
  expiresAt: Date.now(),
}

// Actions in seperate object to aid autocompletion and avoid typos
export const ACTIONS = {
  UPDATE_USERNAME: 'update username',
  UPDATE_ACCESS_TOKEN: 'update access token',
  UPDATE_REFRESH_TOKEN: 'update refresh token',
  SET_IS_LOGGED_IN: 'set is logged in',
  SET_IS_LOADING: 'set is loading',
  SET_TOKEN_EXPIRY: 'set token expiry',
}

const authReducer = (auth, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_USERNAME:
      if (auth.username === action.payload) {
        return auth
      }
      return { ...auth, username: action.payload }
    case ACTIONS.UPDATE_ACCESS_TOKEN:
      if (auth.accessToken === action.payload) {
        return auth
      }
      return { ...auth, accessToken: action.payload }
    case ACTIONS.UPDATE_REFRESH_TOKEN:
      if (auth.refreshToken === action.payload) {
        return auth
      }
      return { ...auth, refreshToken: action.payload }
    case ACTIONS.SET_IS_LOGGED_IN:
      if (auth.isLoggedIn === action.payload) {
        return auth
      }
      return { ...auth, isLoggedIn: action.payload }
    case ACTIONS.SET_IS_LOADING:
      if (auth.isLoading === action.payload) {
        return auth
      }
      return { ...auth, isLoading: action.payload }
    case ACTIONS.SET_TOKEN_EXPIRY:
      if (auth.expiresAt === action.payload) {
        return auth
      }
      return { ...auth, expiresAt: action.payload }
    default:
      return auth
  }
}

export default authReducer
