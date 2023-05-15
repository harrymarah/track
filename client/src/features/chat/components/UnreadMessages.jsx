import React from 'react'
import styled from 'styled-components'

const ContentContainer = styled.div`
  width: 100%;
  min-height: 126px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

const UnreadMessages = () => {
  return <ContentContainer></ContentContainer>
}

export default UnreadMessages
