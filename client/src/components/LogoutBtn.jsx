import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: #b50505;
  border: none;
  padding: 0.3rem 1.2rem;
  margin: 0.8rem;
  color: var(--light);
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
`

const LogoutBtn = () => {
  return (
    <form method="POST" action="/auth/logout">
      <Button type="submit">logout</Button>
    </form>
  )
}

export default LogoutBtn
