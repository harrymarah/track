import React, { useState } from 'react'
import { SearchBar, ResultsContainer } from 'features/search'
import { PageHead } from 'layouts'

const Search = () => {
  const [searchResults, updateSearchResults] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  return (
    <>
      <PageHead heading={'Search'}>
        <SearchBar
          updateSearchResults={updateSearchResults}
          setIsSearching={setIsSearching}
        />
      </PageHead>
      <ResultsContainer
        isSearching={isSearching}
        searchResults={searchResults}
      />
    </>
  )
}

export default Search
