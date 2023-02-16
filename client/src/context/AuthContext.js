import { createContext, useReducer, useContext } from 'react'
import authReducer, {
  ACTIONS,
  initialState,
  getLoggedInCookie,
} from 'reducers/authReducer'

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
  const setIsLoading = (bool) => {
    dispatch({ type: ACTIONS.SET_IS_LOADING, payload: bool })
  }
  const checkLoggedIn = () => {
    return getLoggedInCookie()
  }
  const value = {
    ...auth,
    logUserIn,
    logUserOut,
    updateUsername,
    setIsLoading,
    checkLoggedIn,
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
