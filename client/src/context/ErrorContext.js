import React, { createContext, useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ErrorContext = createContext({
  error: null,
  addError: () => {},
  removeError: () => {},
})

export default function ErrorProvider({ children }) {
  const [error, setError] = useState(null)

  const removeError = () => setError(null)

  const addError = (error, message, status) =>
    setError({ error, message, status })

  const contextValue = {
    error,
    addError: useCallback(
      (error, message, status) => addError(error, message, status),
      []
    ),
    removeError: useCallback(() => removeError(), []),
  }

  useEffect(() => {
    if (error) {
      let errorMessage = error?.error?.response?.data?.error || error.message
      console.log(error)
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      removeError()
    }
  }, [error])

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  )
}
