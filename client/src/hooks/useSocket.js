import { useEffect } from 'react'
import socket from 'services/socket'
import useAuth from 'context/AuthContext'
import useChat from 'context/ChatContext'

const useSocket = () => {
  const { isLoggedIn, logUserOut } = useAuth()
  const { setSocket } = useChat()
  useEffect(() => {
    socket.connect()
    socket.onAny((event, ...args) => {
      console.log(event, args)
    })
    socket.on('connect', () => {
      setSocket(socket)
    })
    socket.on('hello', (arg) => {
      console.log('arg')
      console.log(arg)
    })
    socket.on('connect_error', (error) => {
      logUserOut()
    })
    socket.on('new_message', (message) => {
      console.log(`NEW MESSAGE!!! from: ${message.from}, to: ${message.to}`)
      console.log(message.message)
    })
    console.log(socket)
    return () => {
      socket.off('connect_error')
      socket.offAny()
    }
  }, [isLoggedIn, logUserOut, setSocket])
}

export default useSocket
