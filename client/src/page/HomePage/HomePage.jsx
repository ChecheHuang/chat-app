import React from 'react'
import { useState } from 'react'
import './homePage.scss'
import { registerRoute } from '../../utils/APIRoutes'
import axios from 'axios'
import {
  MdAccountCircle,
  MdMarkEmailUnread,
  MdPassword,
  MdConfirmationNumber,
} from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const toastOption = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
}
function HomePage() {
  const [isLoginStatus, setIsLoginStatus] = useState(true)
  const [registerInfo, setRegisterInfo] = useState({
    userName: '',
    // email: '',
    password: '',
    confirmPassword: '',
  })
  async function handleRegister() {
    if (!handleValid()) return
    try {
      const result = await axios.post(registerRoute, registerInfo)
      console.log(result.data)
    } catch (err) {
      toast.error('連線錯誤', toastOption)
    }
  }
  function handleValid() {
    const { userName, password, confirmPassword } = registerInfo

    if (userName === '') {
      toast.error('需要輸入名稱', toastOption)
      return false
    }
    // const emailRule =
    //   /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    // if (!emailRule.test(email)) {
    //   toast.error('不是email格式', toastOption)
    //   return false
    // }
    if (password === '') {
      toast.error('需要輸入密碼', toastOption)
      return false
    }
    if (password !== confirmPassword) {
      toast.error('確認密碼與密碼不相同', toastOption)
      return false
    }
    return true
  }

  function handleChangeRegister() {
    setIsLoginStatus(false)
  }
  function handleChangeLogin() {
    setIsLoginStatus(true)
  }
  return (
    <>
      <div className="container">
        <div className={isLoginStatus ? 'login active' : 'login'}>
          <h1>歡迎加入聊天</h1>
          <h2>Login</h2>
          <form action="">
            <div className="inputBox">
              <input type="text" required="required" />
              <label>
                <MdAccountCircle />
                名稱
              </label>
            </div>
            <div className="inputBox">
              <input type="text" required="required" />
              <label>
                <MdPassword />
                密碼
              </label>
            </div>
            <button type="button">登入</button>
          </form>
          <div className="turn">
            還沒有註冊嗎~馬上去註冊
            <button onClick={handleChangeRegister}>去註冊</button>
          </div>
        </div>
        <div className={isLoginStatus ? 'register active' : 'register'}>
          <h1>歡迎加入聊天</h1>
          <h2>register</h2>
          <form action="">
            <div className="inputBox">
              <input
                value={registerInfo.userName}
                onChange={(e) => {
                  setRegisterInfo({ ...registerInfo, userName: e.target.value })
                }}
                type="text"
                required="required"
              />
              <label>
                <MdAccountCircle />
                名稱
              </label>
            </div>
            {/* <div className="inputBox">
              <input
                value={registerInfo.email}
                onChange={(e) => {
                  setRegisterInfo({ ...registerInfo, email: e.target.value })
                }}
                type="text"
                required="required"
              />
              <label>
                <MdMarkEmailUnread />
                信箱
              </label>
            </div> */}
            <div className="inputBox">
              <input
                value={registerInfo.password}
                onChange={(e) => {
                  setRegisterInfo({ ...registerInfo, password: e.target.value })
                }}
                type="password"
                required="required"
              />
              <label>
                <MdPassword />
                密碼
              </label>
            </div>
            <div className="inputBox">
              <input
                value={registerInfo.confirmPassword}
                onChange={(e) => {
                  setRegisterInfo({
                    ...registerInfo,
                    confirmPassword: e.target.value,
                  })
                }}
                type="password"
                required="required"
              />
              <label>
                <MdConfirmationNumber />
                確認密碼
              </label>
            </div>
            <button onClick={handleRegister} type="button">
              註冊
            </button>
          </form>
          <div className="turn">
            已經有帳號了嗎?
            <button onClick={handleChangeLogin}>去登入</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default HomePage
