import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  color: var(--light);
  width: 40px;
  font-size: 1.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
`
const iconStyles = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
}

const SeeMoreChevron = () => {
  return (
    <Button>
      <i style={iconStyles} className="fa-solid fa-chevron-right"></i>
    </Button>
  )
}

export default SeeMoreChevron
