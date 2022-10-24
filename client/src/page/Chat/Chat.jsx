import React, { useState, useEffect, useRef } from 'react'
import './chat.scss'
import { io } from 'socket.io-client'
import { ws } from '../../utils/APIRoutes'
import { useSelector } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import { sendMessageRoute, getMessagesRoute } from '../../utils/APIRoutes'
function Chat() {
  const { user } = useSelector((state) => state.user)
  const scrollRef = useRef()
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [receiver, setReceiver] = useState({ socketId: '123', user: 'Carl' })
  const [userList, setUserList] = useState([
    { socketId: '123', user: 'Carl' },
    { socketId: '1234', user: 'Allen' },
  ])
  const [messages, setMessages] = useState([
    {
      sender: 'test',
      receiver: 'Carl',
      message: 'fwefwefwefijwiufiwfuo',
      time: '16:20',
    },
    { sender: 'Carl', receiver: 'Test', message: 'testtest', time: '16:20' },
  ])
  useEffect(() => {
    const conversation = document.getElementById('conversation')
    conversation.scrollTo({
      top: conversation.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    setSocket(io(ws))
  }, [])
  useEffect(() => {
    socket?.emit('addUser', user)
    socket?.on('getUsers', (users) => {
      setUserList(users.filter((item) => item.user !== user))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  useEffect(() => {
    ;(async function () {
      const data = {
        sender: user,
        receiver: receiver.user,
      }
      const result = await axios.post(getMessagesRoute, data)
      setMessages(result.data.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiver])

  function handleChangeMessage(e) {
    setMessage(e.target.value)
  }
  async function handleSendMessage() {
    if (message === '') return
    const newMessage = {
      sender: user,
      receiver: receiver.user,
      message: message,
      time: moment().format('YYYY/MM/DD HH:mm:ss'),
    }
    setMessages([...messages, newMessage])
    await axios.post(sendMessageRoute, {
      ...newMessage,
      socketId: receiver.socketId,
    })
    // console.log(result)
    // setMessage('')
  }
  function handleChangeReceiver(item) {
    setReceiver(item)
  }

  return (
    <div className="chat">
      <div className="userList">
        {userList.map((item, index) => {
          const { user } = item
          return (
            <div
              onClick={() => {
                handleChangeReceiver(item)
              }}
              className={user === receiver.user ? 'active' : ''}
              key={index}
            >
              {user}
            </div>
          )
        })}
      </div>
      <div className="messageArea">
        <div className="header">
          <div className="name">{user}</div>
          <button>登出</button>
        </div>
        <div id="conversation" ref={scrollRef} className="conversation">
          {messages.map((item, index) => {
            const { sender, message, time } = item
            return (
              <div
                key={index}
                className={
                  sender === user ? 'messageGroup own' : 'messageGroup'
                }
              >
                <div className="name">
                  {sender} <span>{time}</span>
                </div>
                <div className="message">{message}</div>
              </div>
            )
          })}
        </div>

        <div className="sendMessageArea">
          <textarea
            value={message}
            onChange={handleChangeMessage}
            type="text"
          />
          <button onClick={handleSendMessage}>送出</button>
        </div>
      </div>
    </div>
  )
}

export default Chat
