import instance from './config'
// import axios from 'axios'

// 请求
export function request(url, method = 'get', data = {}) {
  return new Promise((resolve, reject) => {

    let config = {
      url,
      method,
      timeout: 10000,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    if (method === 'get') {
      config.params = data
    } else if (method === 'post') {
      config.data = data
    }

    instance.request(config).then((res) => {
      // console.log(res)
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject('请求失败')
      }

    }).catch((err) => {
      console.error(err)
      reject(err)
    })
  })
}