import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1.4rem 0 1rem;
`
const Heading = styled.h1`
  font-size: 2rem;
  margin: 0;
`

const PageHead = ({ heading, children }) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      {children}
    </Container>
  )
}

export default PageHead
