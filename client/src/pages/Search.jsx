import React, { useState } from 'react'
import styled from 'styled-components'
import Wrapper from '../layouts/Wrapper'
import BottomNavbar from '../layouts/BottomNavbar'
import ClosedMusicControl from '../layouts/ClosedMusicControl'
import SearchBar from '../components/SearchBar'
import ResultsContainer from '../features/search/ResultsContainer'

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0;
`

const Search = () => {
  const [searchResults, updateSearchResults] = useState('')
  return (
    <>
      <Wrapper>
        <Heading>Search</Heading>
        <SearchBar updateSearchResults={updateSearchResults} />
        <ResultsContainer searchResults={searchResults} />
      </Wrapper>
      <ClosedMusicControl />
      <BottomNavbar />
    </>
  )
}

export default Search
