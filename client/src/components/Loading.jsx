import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const Loading = ({ loading, customCss }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...customCss,
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
