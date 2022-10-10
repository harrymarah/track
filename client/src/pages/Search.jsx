import React, { useState } from 'react'
import styled from 'styled-components'
import Wrapper from '../layouts/Wrapper'
import BottomNavbar from '../layouts/BottomNavbar'
import ClosedMusicControl from '../layouts/ClosedMusicControl'
import SearchBar from '../components/SearchBar'

const Results = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`

const Heading = styled.h1`
  margin: 0;
`

const Search = () => {
  const [searchResults, updateSearchResults] = useState('')
  return (
    <>
      <Wrapper>
        <Heading>Search</Heading>
        <SearchBar
          searchResults={searchResults}
          updateSearchResults={updateSearchResults}
        />
        <Results />
      </Wrapper>
      <ClosedMusicControl />
      <BottomNavbar />
    </>
  )
}

export default Search
