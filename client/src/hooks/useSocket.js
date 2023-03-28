import { useEffect } from 'react'
import socket from 'services/socket'
import useAuth from 'context/AuthContext'
import useChat from 'context/ChatContext'

const useSocket = () => {
  const { isLoggedIn, logUserOut } = useAuth()
  const { setSocket } = useChat()
  useEffect(() => {
    console.log('socket running')
    console.log(socket)
    socket.connect()
    socket.onAny((event, ...args) => {
      console.log(event, args)
    })
    socket.on('connect', () => {
      setSocket(socket)
    })
    socket.on('connect_error', (error) => {
      // logUserOut()
      console.log(error)
    })
    console.log(socket)
    return () => {
      socket.off('connect_error')
      socket.offAny()
    }
  }, [])
}

export default useSocket
