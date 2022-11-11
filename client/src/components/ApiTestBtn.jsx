import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import spotifySearch from 'services/spotifySearch'

const Button = styled.button`
  background-color: var(--green);
  border: none;
  padding: 0.3rem 1.2rem;
  margin: 0.8rem;
  color: var(--black);
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
`

const ApiTestBtn = () => {
  const handleClick = async (e) => {
    e.preventDefault()
    spotifySearch('kasabian')
  }

  return (
    <form onSubmit={handleClick}>
      <Button type="submit">Backend API Call</Button>
    </form>
  )
}

export default ApiTestBtn
