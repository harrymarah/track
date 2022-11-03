import { render, screen } from '@testing-library/react'
import LogoutBtn from 'components/LogoutBtn'

test('renders logout button', () => {
  jest.useFakeTimers()
  render(<LogoutBtn />)

  screen.debug()
})
