import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setBackendData(data))
  }, [])

  return (
    <div>
      {typeof backendData.names === 'undefined'
        ? 'loading'
        : backendData.names.map((mynames, i) => {
            return <p key={i}>{mynames}</p>
          })}
    </div>
  )
}

export default App
