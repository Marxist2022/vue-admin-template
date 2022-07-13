import axios from 'axios'

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000// 超时时间
})

export default request
