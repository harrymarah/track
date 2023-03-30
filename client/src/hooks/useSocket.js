import { useEffect } from 'react'
import socket from 'services/socket'
import useAuth from 'context/AuthContext'
import useChat from 'context/ChatContext'

const useSocket = () => {
  const { isLoggedIn, logUserOut } = useAuth()
  const { setSocket, setNewMessage, setNewMessageSenders, newMessageSenders } =
    useChat()
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
    socket.on('new_message', ({ message, from, to }) => {
      console.log(`NEW MESSAGE: ${message}, FROM: ${from} TO: ${to}`)
      setNewMessage(true)
      setNewMessageSenders([
        ...newMessageSenders.filter(
          (senderId) => senderId !== from && senderId !== to
        ),
        from,
      ])
    })
    return () => {
      socket.off('connect_error')
      socket.offAny()
    }
  }, [, isLoggedIn])
}

export default useSocket
