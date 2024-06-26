import React, { useState, useEffect } from 'react'
import './chat.scss'
import { io } from 'socket.io-client'
import { ws } from '../../utils/APIRoutes'
import { useSelector } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import { getMessagesRoute } from '../../utils/APIRoutes'
import { useNavigate } from 'react-router-dom'

function Chat() {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [receiver, setReceiver] = useState({})
  const [userList, setUserList] = useState([])
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const conversation = document?.getElementById('conversation')
    conversation?.scrollTo({
      top: conversation.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  useEffect(() => {
    if (user === '') {
      navigate('/')
    }
    setSocket(io(ws))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    socket?.emit('addUser', user)
    socket?.on('getUsers', (users) => {
      setUserList(users.filter((item) => item.user !== user))
    })
    socket?.on('getMessage', (item) => {
      setMessages((prev) => {
        return [...prev, item]
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  useEffect(() => {
    if (JSON.stringify(receiver) === '{}') return
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
  async function handleSendMessage(e) {
    e.preventDefault()

    if (message === '') return
    const newMessage = {
      sender: user,
      receiver: receiver.user,
      message: message,
      time: moment().format('YYYY/MM/DD HH:mm:ss'),
    }
    setMessages([...messages, newMessage])

    socket.emit('sendMessage', {
      ...newMessage,
      socketId: receiver.socketId,
    })
    setMessage('')
  }

  return (
    <div className="chat">
      <div className="userList">
        {userList.map((item, index) => {
          const { user, socketId } = item
          const className = socketId === '' ? '' : 'online '
          return (
            <div
              onClick={() => {
                setReceiver({ user, socketId })
              }}
              className={
                user === receiver.user ? `${className}+ active` : className
              }
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
          <a href="./">登出</a>
        </div>
        <div id="conversation" className="conversation">
          {JSON.stringify(receiver) !== '{}' &&
            messages.map((item, index) => {
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
          {JSON.stringify(receiver) === '{}' ? (
            <div>請先選擇聊天對象</div>
          ) : (
            <>
              <form>
                <input
                  value={message}
                  onChange={handleChangeMessage}
                  type="text"
                />
                <button type="submit" onClick={handleSendMessage}>
                  送出
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
