import React, { useState } from 'react'
import styled from 'styled-components'

import {
  SearchBar,
  ResultsContainer,
  SearchFilterButtons,
} from '../features/search'

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
      <PageHeadWrapper>
        <Heading>Search</Heading>
        <SearchBar updateSearchResults={updateSearchResults} />
        <SearchFilterButtons />
      </PageHeadWrapper>
      <ResultsContainer searchResults={searchResults} />
    </>
  )
}

export default Search
