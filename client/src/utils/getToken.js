import { ACTIONS } from './AuthReducer'

const getToken = async (setCookie, dispatch) => {
  try {
    const response = await fetch('/auth/token')
    const json = await response.json()
    if (json.access_token) {
      setCookie('isAuthenticated', true, {
        // cookie set to two hours, change back to one week when deploying
        maxAge: 60 * 60 * 2,
        path: '/',
      })
      dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: true })
      dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: json.access_token })
      dispatch({ type: ACTIONS.SET_TOKEN_EXPIRY, payload: json.expires_in })
    } else {
      dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: null })
      dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: false })
    }
  } catch (error) {
    console.error(error)
  }
}

export default getToken
