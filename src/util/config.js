import axios from 'axios'

// 自定义axios实例添加拦截器
let instance = axios.create()

// 拦截请求
instance.interceptors.request.use((config) => {
  // console.log('拦截请求：', config)
  return config
})

// 拦截响应
instance.interceptors.response.use((config) => {
  // console.log('拦截响应：', config)
  return config
})

export default instance