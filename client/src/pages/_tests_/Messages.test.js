import { render, screen } from '@testing-library/react'
import Messages from 'pages/Messages'

xtest('renders learn react link', () => {
  jest.useFakeTimers()
  render(<Messages />)

  screen.debug()
})
