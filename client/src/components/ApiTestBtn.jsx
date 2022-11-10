import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

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

const LogoutBtn = () => {
  const handleClick = async (e) => {
    e.preventDefault()
    const res = await axios.put(
      '/player/playsong/spotify:track:1t8TCORVxdItzE3zy1X0tv?deviceId=18680f7c6248ca75b9bbc2a8eb9a685a95c6a2cc'
    )
    console.log(res.data)
    console.log('clicked')
  }

  return (
    <form onSubmit={handleClick}>
      <Button type="submit">Backend API Call</Button>
    </form>
  )
}

export default LogoutBtn
