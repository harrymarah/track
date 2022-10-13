import { ACTIONS } from './AuthReducer'

const getToken = async (setCookie, dispatch) => {
  const response = await fetch('/auth/token')
  const json = await response.json()
  if (json) {
    setCookie('isAuthenticated', true, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: true })
    dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: json.access_token })
    dispatch({ type: ACTIONS.SET_TOKEN_EXPIRY, payload: json.expires_in })
  } else {
    dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: null })
  }
}

export default getToken
