import React from 'react'
import styled from 'styled-components'

const More = styled.div`
  width: 95%;
  height: 15px;
  background-color: rgba(230, 241, 255, 0.04);
  margin: 5px auto;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(230, 241, 255, 0.2);
`

const MoreResults = () => {
  return (
    <More>
      <i className="fa-solid fa-chevron-down"></i>
    </More>
  )
}

export default MoreResults
