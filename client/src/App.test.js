import { render, screen } from '@testing-library/react'
import App from './App'

xtest('renders learn react link', () => {
  jest.useFakeTimers()
  const app = render(<App />).toJSON()
})
