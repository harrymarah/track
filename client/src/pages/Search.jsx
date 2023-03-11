import React, { useState } from 'react'
import { SearchBar, ResultsContainer } from 'features/search'
import { PageHead } from 'layouts'

const Search = () => {
  const [searchResults, updateSearchResults] = useState('')
  return (
    <>
      <PageHead heading={'Search'}>
        <SearchBar updateSearchResults={updateSearchResults} />
      </PageHead>
      <ResultsContainer searchResults={searchResults} />
    </>
  )
}

export default Search
