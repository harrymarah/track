import React, { useState } from 'react'
import styled from 'styled-components'
import useSpotifySearch from 'hooks/useSpotifySearch'

const Input = styled.input`
  padding: 0.5em;
  margin: 1rem auto 0;
  align-self: flex-start;
  font-size: 1.2rem;
  color: var(--black);
  background: #fff;
  border: none;
  border-radius: 3px;
  width: 95%;
  cursor: pointer;
`

const SearchBar = ({ updateSearchResults, setIsSearching }) => {
  const [searchTerm, updateSearchTerm] = useState('')
  const { spotifySearch } = useSpotifySearch()

  const handleSearch = async (e) => {
    setIsSearching(true)
    e.preventDefault()
    const results = await spotifySearch(searchTerm)
    setIsSearching(false)
    updateSearchResults(results)
  }

  return (
    <form onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder="search"
        onChange={(e) => updateSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </form>
  )
}

export default SearchBar
