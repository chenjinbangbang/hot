import instance from './config'
import { message } from 'antd'
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

// 上传文件，判断支持格式图片，支持则返回blob
export function checkFile(file) {
  // console.log(file)
  // 仅支持jpg,png,gif,jpeg格式的图片
  if (!/(jpg|png|gif|jpeg)/.test(file.type)) {
    message.error('仅支持jpg，png，gif，jpeg格式的图片')
    return false
  }

  let windowURL = window.URL || window.webkitUrl
  let src = windowURL.createObjectURL(file)
  // console.log(src)
  return src
}

// 根据是否是VIP会员，返回金币兑换汇率
export function getRate() {
  let isVip = 1
  return isVip === 1 ? 0.9 : 0.8
}

// 保留两位小数
// export function fixed(val) { 
//   return val.toFixed(2)
// }