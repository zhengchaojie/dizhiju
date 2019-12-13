import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    config.headers['Accept-Language'] = 'zh-CN,zh;q=0.9'
    if (store.getters.token) {
      config.headers['X-flyAdmin-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      if (res.errno === 1001) {
        Message({ message: '参数错误', type: 'error', duration: 5 * 1000 })
      }
      if (res.code === 400) {
        Message({ message: res.errmsg, type: 'error', duration: 5 * 1000 })
      }
      if (res.code === 401) {
        Message({ message: '删除失败', type: 'error', duration: 5 * 1000 })
      }
      if (res.code === 402) {
        Message({ message: '提交失败', type: 'error', duration: 5 * 1000 })
      }
      if (res.code === 404) {
        Message({ message: '查询失败', type: 'error', duration: 5 * 1000 })
      }
      if (res.code === 40000 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return res
    } else {
      return res
    }
  },
  error => {
    Message({
      message: '网络错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
