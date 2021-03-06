// import axios from 'axios'
import { message } from 'antd'
import { request } from '@/util/api'

const AUTH_SUCCESS = 'AUTH_SUCCESS' // 登录，注册成功
const LOGOUT = 'LOGOUT' // 退出登录
const ERROR_MSG = 'ERROR_MSG' // 处理错误

const initState = {
  redirectTo: '',
  username: localStorage.getItem('username') || ''
}

// reducer
export function user(state = initState, action) {
  // console.log('reducer：', state, action)
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.data,
        redirectTo: '/home'
      }
    case LOGOUT:
      return {
        ...initState,
        redirectTo: '/login'
      }
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg
      }
    default:
      return state
  }
}


// 登录
export function login({ username, password }) {
  return dispatch => {
    // 模拟登录
    // setTimeout(() => {
    //   localStorage.setItem('username', username)
    //   dispatch({ type: AUTH_SUCCESS, data: { username } })
    // }, 1000)

    request('/auth/login', 'post', { username, password }).then(res => { 
      console.log(res)
    })

  }
}

// 注册
export function register({ username, password }) {
  return dispatch => {
    // 模拟登录
    setTimeout(() => {
      localStorage.setItem('username', username)
      dispatch({ type: AUTH_SUCCESS, data: { username } })
    }, 1000)
  }
}
// 退出登录
export function logout(val) {
  return dispatch => {
    setTimeout(() => {
      localStorage.clear()
      message.success({
        content: '退出成功', duration: 1, onClose: () => {
          dispatch({ type: LOGOUT })
        }
      })
    })
  }
}