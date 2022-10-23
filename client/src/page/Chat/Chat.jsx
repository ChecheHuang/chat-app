import React, { useState, useEffect, useRef } from 'react'
import './chat.scss'
import { io } from 'socket.io-client'
import { ws } from '../../utils/APIRoutes'
import { useSelector } from 'react-redux'
import moment from 'moment'
function Chat() {
  const { user } = useSelector((state) => state.user)
  const scrollRef = useRef()
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [receiver, setReceiver] = useState('Carl')
  const [userList, setUserList] = useState(['Carl', 'Allen'])
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
    scrollRef?.current.scrollIntoView()
  }, [messages])

  useEffect(() => {
    setSocket(io(ws))
  }, [])
  useEffect(() => {
    socket?.emit('addUser', user)
    socket?.on('getUsers', (users) => {
      console.log(users)
    })
  }, [socket])

  function handleChangeMessage(e) {
    setMessage(e.target.value)
  }
  function handleSendMessage() {
    if (message === '') return
    console.log(message)
    const newMessage = {
      sender: user,
      receiver: receiver,
      message: message,
      time: moment().format('lll'),
    }
    setMessages([...messages, newMessage])
    setMessage('')
  }
  function handleChangeReceiver(name) {
    setReceiver(name)
  }

  return (
    <div className="chat">
      <div className="userList">
        {userList.map((name, index) => {
          return (
            <div
              onClick={() => {
                handleChangeReceiver(name)
              }}
              className={name === receiver ? 'active' : ''}
              key={index}
            >
              {name}
            </div>
          )
        })}
      </div>
      <div className="messageArea">
        <div className="header">
          <div className="name">{user}</div>
          <button>登出</button>
        </div>
        <div className="conversation">
          {messages.map((item, index) => {
            const { sender, receiver, message, time } = item
            return (
              <div
                ref={scrollRef}
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
