import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Loading = ({ loading }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        margin: '0 1rem',
      }}
    >
      <ClipLoader
        color={'#9cffd9'}
        loading={loading}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loading
