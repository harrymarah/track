import React, { useState } from 'react'
import styled from 'styled-components'
import spotifySearch from '../../services/spotifySearch'
import useAuth from '../../context/AuthContext'

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em auto;
  align-self: flex-start;
  font-size: 1.2rem;
  color: var(--black);
  background: #fff;
  border: none;
  border-radius: 3px;
  width: 95%;
  cursor: pointer;
`

const SearchBar = ({ updateSearchResults }) => {
  const [searchTerm, updateSearchTerm] = useState('')
  const { token } = useAuth()

  const handleSearch = async (e) => {
    e.preventDefault()
    const results = await spotifySearch(searchTerm, token)
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
