import { useContext } from 'react'
import { ErrorContext } from 'context/ErrorContext'

function useError() {
  const { error, addError, removeError } = useContext(ErrorContext)
  return { error, addError, removeError }
}

export default useError
