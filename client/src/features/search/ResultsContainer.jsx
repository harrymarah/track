import React from 'react'
import styled from 'styled-components'
import SearchResult from './SearchResult'

const Results = styled.ul`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.1rem 0.3rem;
  cursor: pointer;
`

const Button = styled.button`
  all: unset;
  background: ${(props) =>
    props.selected ? 'var(--bright)' : 'var(--dark-blue)'};
  color: ${(props) => (props.selected ? 'var(--black)' : 'var(--light)')};
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  border-radius: 5px;
`

const ResultsContainer = ({ searchResults }) => {
  let allResults = []
  if (searchResults) {
    allResults = searchResults.tracks.items.map((resultData) => {
      return <SearchResult key={resultData.id} searchResults={resultData} />
    })
  }
  return (
    <Results>
      <Buttons>
        <Button>tracks</Button>
        <Button>artists</Button>
        <Button>albums</Button>
        <Button>playlists</Button>
      </Buttons>
      {searchResults ? allResults : ''}
    </Results>
  )
}

export default ResultsContainer
