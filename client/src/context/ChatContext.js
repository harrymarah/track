import { createContext, useReducer, useContext } from 'react'
import chatReducer, { ACTIONS, initialState } from 'reducers/chatReducer'

const ChatContext = createContext(initialState)

export const ChatProvider = ({ children }) => {
  const [chat, dispatch] = useReducer(chatReducer, initialState)

  const setSocket = (socket) => {
    dispatch({ type: ACTIONS.SET_SOCKET, payload: socket })
  }
  const setActiveChats = (chats) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_CHATS, payload: chats })
  }
  const setFriendsList = (friendsList) => {
    dispatch({ type: ACTIONS.SET_FRIENDS_LIST, payload: friendsList })
  }
  const setFriendRequests = (friendRequests) => {
    dispatch({ type: ACTIONS.SET_FRIEND_REQUESTS, payload: friendRequests })
  }
  const setNewMessage = (bool) => {
    dispatch({ type: ACTIONS.SET_NEW_MESSAGE, payload: bool })
  }
  const setNewMessageSenders = (senderId) => {
    dispatch({ type: ACTIONS.SET_NEW_MESSAGE_SENDERS, payload: senderId })
  }

  const value = {
    ...chat,
    setSocket,
    setActiveChats,
    setFriendsList,
    setFriendRequests,
    setNewMessage,
    setNewMessageSenders,
  }
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

const useChat = () => {
  const context = useContext(ChatContext)

  if (context === undefined) {
    throw new Error('useChat must be used within ChatContext')
  }

  return context
}

export default useChat
