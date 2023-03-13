import React from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 60px;
`

const AllMessagesContainer = ({ children }) => {
  return <Container>{children}</Container>
}

export default AllMessagesContainer
