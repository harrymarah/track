import React from 'react'
import styled from 'styled-components'

const Icon = styled.i`
  color: var(--light);
  font-size: 40px;
`
const iconClassNames = ['fa-solid', 'fa-forward']

const NextTrack = () => {
  return <Icon className={iconClassNames} />
}

export default NextTrack
