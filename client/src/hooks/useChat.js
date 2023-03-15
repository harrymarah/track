import { useEffect } from 'react'
import io from 'socket.io-client'



const useChat = () => {
    const socket = io.connect(process.env.REACT_APP_SERVER_URL)
}


