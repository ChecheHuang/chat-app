import React, { useState, useEffect, useRef } from 'react'
import './chat.scss'
import { io } from 'socket.io-client'
import { ws } from '../../utils/APIRoutes'
import { useSelector } from 'react-redux'
function Chat() {
  const { user } = useSelector((state) => state.user)
  const scrollRef = useRef()
  // const [socket, setSocket] = useState(null)
  // useEffect(() => {
  //   setSocket(io(ws))
  // }, [])
  // useEffect(() => {
  //   socket?.emit('addUser', user)
  //   socket?.on('getUsers', (users) => {
  //     console.log(users)
  //   })
  // }, [socket])

  const [socket, setSocekt] = useState(null)

  useEffect(() => {
    setSocekt(io('ws://localhost:5000'))
  }, [])
  useEffect(() => {
    socket?.emit('addUser', "test")
    socket?.on('user', (members) => {
      console.log(members)
    })
  }, [socket])

  return (
    <div className="chat">
      <div className="userList">
        <div>Carl</div>
        <div>Mary</div>
        <div>Carl</div>
      </div>
      <div className="messageArea">
        <div className="header">
          <div className="name">{user}</div>
          <button>登出</button>
        </div>
        <div className="conversation"></div>
      </div>
    </div>
  )
}

export default Chat
