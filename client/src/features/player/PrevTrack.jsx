import React from 'react'
import styled from 'styled-components'

const Icon = styled.i`
  color: var(--light);
  font-size: 40px;
`
const iconClassNames = ['fa-solid', 'fa-backward']

const PrevTrack = () => {
  return <Icon className={iconClassNames} />
}

export default PrevTrack
