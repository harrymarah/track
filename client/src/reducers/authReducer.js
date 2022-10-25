const getLoggedInCookie = () => {
  const loggedInStatus = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('isAuthenticated'))
    ?.split('=')[1]
  if (loggedInStatus === 'true') return true
  else return false
}

export const initialState = {
  // token initialized to a string to avoid logout and redirection on page refresh, if a user isn't logged in the token will eventually be set to null and trigger redirection to login page
  token: 'token',
  isLoggedIn: getLoggedInCookie(),
  isLoading: true,
  expiresAt: Date.now(),
}

// Actions in seperate object to aid autocompletion and avoid typos
export const ACTIONS = {
  UPDATE_TOKEN: 'update token',
  SET_IS_LOGGED_IN: 'set is logged in',
  SET_IS_LOADING: 'set is loading',
  SET_TOKEN_EXPIRY: 'set token expiry',
}

const authReducer = (auth, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_TOKEN:
      return { ...auth, token: action.payload }
    case ACTIONS.SET_IS_LOGGED_IN:
      return { ...auth, isLoggedIn: action.payload }
    case ACTIONS.SET_IS_LOADING:
      return { ...auth, isLoading: action.payload }
    case ACTIONS.SET_TOKEN_EXPIRY:
      return { ...auth, expiresAt: action.payload }
    default:
      return auth
  }
}

export default authReducer