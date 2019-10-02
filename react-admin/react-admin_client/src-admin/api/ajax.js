// 封装ajax库, 返回结果是promise
// 优化: 统一处理请求异常
//       外层包一个自己创建的promise对象
//       在请求出错时, 不reject(error), 而是显示错误提示

import axios from 'axios'
import { message } from "antd"

export default function ajax(url, data={}, type='GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else if (type === 'POST') {
      promise = axios.post(url, data)
    }
    promise.then(
      respones => {resolve(respones.data)}
    ).catch(
      error => {message.error('请求出错了: ' + error.message)}
    )
  })

}