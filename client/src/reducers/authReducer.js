export const getLoggedInCookie = () => {
  const loggedInStatus = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('isAuthenticated'))
    ?.split('=')[1]
  if (loggedInStatus === 'true') return true
  else return false
}

export const initialState = {
  username: null,
  isLoggedIn: getLoggedInCookie(),
  isLoading: true,
}

// Actions in seperate object to aid autocompletion and avoid typos
export const ACTIONS = {
  UPDATE_USERNAME: 'update username',
  SET_IS_LOGGED_IN: 'set is logged in',
  SET_IS_LOADING: 'set is loading',
}

const authReducer = (auth, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_USERNAME:
      if (auth.username === action.payload) {
        return auth
      }
      return { ...auth, username: action.payload }
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
    default:
      return auth
  }
}

export default authReducer
