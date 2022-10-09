export const ACTIONS = {
  UPDATE_TOKEN: 'update token',
  SET_IS_LOGGED_IN: 'set is logged in',
  SET_IS_LOADING: 'set is loading',
}

export const reducer = (auth, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_TOKEN:
      return { ...auth, token: action.payload }
    case ACTIONS.SET_IS_LOGGED_IN:
      return { ...auth, isLoggedIn: action.payload }
    case ACTIONS.SET_IS_LOADING:
      return { ...auth, isLoading: action.payload }
    default:
      return auth
  }
}
