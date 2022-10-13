import React from 'react'
import styled from 'styled-components'

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.1rem 0.3rem;
  cursor: pointer;
`

const Button = styled.button`
  all: unset;
  background: ${(props) => (props.selected ? 'var(--bright)' : 'var(--light)')};
  color: var(--black);
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  border-radius: 5px;
`

const SearchFilterButtons = () => {
  return (
    <Buttons>
      <Button>tracks</Button>
      <Button>artists</Button>
      <Button>albums</Button>
      <Button>playlists</Button>
    </Buttons>
  )
}

export default SearchFilterButtons
