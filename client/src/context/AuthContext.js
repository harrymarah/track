import { createContext, useReducer, useContext } from 'react'
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
  const updateToken = (token) => {
    dispatch({ type: ACTIONS.UPDATE_TOKEN, payload: token })
  }
  const updateTokenExpiry = (expiry) => {
    dispatch({ type: ACTIONS.SET_TOKEN_EXPIRY, payload: expiry })
  }
  const setIsLoading = (bool) => {
    dispatch({ type: ACTIONS.SET_IS_LOADING, payload: bool })
  }
  const value = {
    auth,
    token: auth.token,
    isLoggedIn: auth.isLoggedIn,
    isLoading: auth.isLoading,
    expiresAt: auth.expiresAt,
    logUserIn,
    logUserOut,
    updateToken,
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
