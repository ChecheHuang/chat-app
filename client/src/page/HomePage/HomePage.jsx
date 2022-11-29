import React, { useEffect } from 'react'
import { useState } from 'react'
import './homePage.scss'
import { registerRoute, loginRoute } from '../../utils/APIRoutes'
import axios from 'axios'
import {
  MdAccountCircle,
  MdPassword,
  MdConfirmationNumber,
} from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Lottie from 'lottie-react'
import loading from './chat.json'
import { useDispatch, useSelector } from 'react-redux'
import { updateStart, updateSuccess, updateError } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
const toastOption = {
  position: 'top-left',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
}
function HomePage() {
  const [isLoginStatus, setIsLoginStatus] = useState(true)
  const [registerInfo, setRegisterInfo] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
  })
  const [loginInfo, setLoginInfo] = useState({
    userName: '',
    password: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pending, error } = useSelector((state) => state.user)
  const handleRegister = async () => {
    if (!handleValid()) return
    try {
      dispatch(updateStart())

      const result = await axios.post(registerRoute, registerInfo)
      if (result.data.status === 'success') {
        // console.log(result.data.data)
        setTimeout(() => {
          dispatch(updateSuccess(result.data.data.userName))
          toast.success('註冊成功', toastOption)
          handleChangeLogin()
          setLoginInfo({
            userName: registerInfo.userName,
            password: registerInfo.password,
          })
        }, 1000)
      } else {
        setTimeout(() => {
          dispatch(updateSuccess(''))
          toast.error(result.data.message, toastOption)
        }, 1000)
      }
    } catch (err) {
      toast.error('連線失敗', toastOption)
      dispatch(updateError())
    }
  }
  const handleLogin = async () => {
    if (!handleLoginValid()) return
    try {
      const loginResult = await axios.post(loginRoute, loginInfo)
      // console.log(loginResult.data.status)
      if (loginResult.data.status === 'error') {
        toast.error('登入失敗', toastOption)
        return
      }
      dispatch(updateSuccess(loginInfo.userName))
      navigate('/chat')
    } catch (err) {
      toast.error('連線失敗', toastOption)
    }
  }
  function handleLoginValid() {
    return true
  }
  function handleValid() {
    const { userName, password, confirmPassword } = registerInfo

    if (userName === '') {
      toast.error('需要輸入名稱', toastOption)
      return false
    }

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
  useEffect(() => {
    if (error === true) {
      toast.error('連線錯誤', toastOption)
    }
  }, [error])
  if (pending === true) {
    return (
      <div style={{ width: '200px' }}>
        <Lottie animationData={loading} loop={true} />
      </div>
    )
  }
  return (
    <>
      <div className="container">
        <div className={isLoginStatus ? 'login active' : 'login'}>
          <h1>歡迎加入聊天</h1>
          <h2>Login</h2>
          <form action="">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, userName: e.target.value })
                }}
                value={loginInfo.userName}
                type="text"
                required="required"
              />
              <label>
                <MdAccountCircle />
                名稱
              </label>
            </div>
            <div className="inputBox">
              <input
                onChange={(e) => {
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }}
                value={loginInfo.password}
                type="password"
                required="required"
              />
              <label>
                <MdPassword />
                密碼
              </label>
            </div>
            <button onClick={handleLogin} type="button">
              登入
            </button>
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
