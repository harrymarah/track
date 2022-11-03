import '@testing-library/jest-dom'
import 'jest-styled-components'
import { jest } from '@jest/globals'

jest.doMock('styled-components', () => {
  const actual = jest.requireActual('styled-components')
  const styled = actual.default

  return Object.assign(styled, actual)
})

jest.doMock('styled-components', () => {
  const mock = () => () => jest.fn()
  mock.button = () => jest.fn()
  return {
    __esModule: true,
    default: mock,
  }
})
