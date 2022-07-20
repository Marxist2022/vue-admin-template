import axios from 'axios'
import { Message } from 'element-ui'
import { getTime } from '@/utils/auth'
import store from '@/store'
import router from '@/router'
// 1创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000// 超时时间
})
// ----------------------请求拦截器----------------------
// 1 添加请求拦截器request
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const token = store.state.user.token// 获取token
  if (token) {
    const timeout = Date.now() - getTime()// 获取时间差值
    // 判断token是否过期
    if (timeout > 2 * 60 * 60 * 1000) { // 超过2小时
      store.dispatch('user/logout')// 清除token
      router.push('/login')// 跳转到登录页面
    }
    config.headers.Authorization = 'Bearer ' + token// 设置请求头
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// ----------------------响应拦截器----------------------
// 1 添加响应拦截器response
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 解构返回来的数据
  const { data, success, message } = response.data
  // 如果成功 布尔值为true
  if (success) {
    return data
  } else {
    Message.error(message)// 错误提示
    return Promise.reject(new Error(message))
  }
}, function (error) {
  console.dir(error)// 请求错误
  if (error.response && error.response.data && error.response.data.code === 10002) { // 如果返回的code是10002
    store.dispatch('user/logout')// 清除token
    router.push('/login')// 跳转到登录页面
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
