import { createContext, useReducer, useContext, useMemo } from 'react'
import authReducer, { ACTIONS, initialState } from 'reducers/authReducer'

const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, initialState)

  const logUserIn = () => {
    dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: true })
  }
  const logUserOut = () => {
    dispatch({ type: ACTIONS.SET_IS_LOGGED_IN, payload: false })
  }
  const updateUsername = (username) => {
    dispatch({ type: ACTIONS.UPDATE_USERNAME, payload: username })
  }
  const updateAccessToken = (token) => {
    dispatch({ type: ACTIONS.UPDATE_ACCESS_TOKEN, payload: token })
  }
  const updateRefreshToken = (token) => {
    dispatch({ type: ACTIONS.UPDATE_REFRESH_TOKEN, payload: token })
  }
  const updateTokenExpiry = (expiry) => {
    dispatch({ type: ACTIONS.SET_TOKEN_EXPIRY, payload: expiry })
  }
  const setIsLoading = (bool) => {
    dispatch({ type: ACTIONS.SET_IS_LOADING, payload: bool })
  }
  const value = {
    ...auth,
    logUserIn,
    logUserOut,
    updateUsername,
    updateAccessToken,
    updateRefreshToken,
    updateTokenExpiry,
    setIsLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthContext')
  }

  return context
}

export default useAuth
