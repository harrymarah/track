export const initialState = {
  socket: undefined,
  activeChats: [],
  friends: [],
  friendRequests: [],
  newMessage: false,
  newMessageSenders: [],
}

export const ACTIONS = {
  SET_SOCKET: 'set the chat socket',
  SET_ACTIVE_CHATS: 'set active chats',
  SET_FRIENDS_LIST: 'set list of friends',
  SET_FRIEND_REQUESTS: 'set friend requests',
  SET_NEW_MESSAGE: 'set new message boolean',
  SET_NEW_MESSAGE_SENDERS: 'set new message senders',
}

const chatReducer = (chat, action) => {
  switch (action.type) {
    case ACTIONS.SET_SOCKET:
      return { ...chat, socket: action.payload }
    case ACTIONS.SET_ACTIVE_CHATS:
      return { ...chat, activeChats: action.payload }
    case ACTIONS.SET_FRIENDS_LIST:
      return { ...chat, friends: action.payload }
    case ACTIONS.SET_FRIEND_REQUESTS:
      return { ...chat, friendRequests: action.payload }
    case ACTIONS.SET_NEW_MESSAGE:
      return { ...chat, newMessage: action.payload }
    case ACTIONS.SET_NEW_MESSAGE_SENDERS:
      return { ...chat, newMessageSenders: action.payload }
    default:
      return chat
  }
}

export default chatReducer
