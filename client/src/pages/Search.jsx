import React, { useState } from 'react'
import styled from 'styled-components'
import Wrapper from '../layouts/Wrapper'
import BottomNavbar from '../layouts/BottomNavbar'
import MusicControl from '../layouts/MusicControl'
import SearchBar from '../features/search/SearchBar'
import ResultsContainer from '../features/search/ResultsContainer'
import SearchFilterButtons from '../features/search/SearchFilterButtons'

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0;
`
const PageHeadWrapper = styled.div`
  height: 140px;
`

const Search = () => {
  const [searchResults, updateSearchResults] = useState('')
  return (
    <>
      <Wrapper>
        <PageHeadWrapper>
          <Heading>Search</Heading>
          <SearchBar updateSearchResults={updateSearchResults} />
          <SearchFilterButtons />
        </PageHeadWrapper>
        <ResultsContainer searchResults={searchResults} />
      </Wrapper>
      <MusicControl />
      <BottomNavbar />
    </>
  )
}

export default Search
