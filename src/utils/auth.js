// 不用改
import Cookies from 'js-cookie'

// ---------获取token-----------
const TokenKey = 'vue_admin_template_token'
// 获取token
export function getToken () {
  return Cookies.get(TokenKey)
}
// 设置token
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken () {
  return Cookies.remove(TokenKey)
}
// ---------获取时间戳-----------
const TimeKey = 'heima_time_key'
// 存时间戳
export function setTime (time) {
  return Cookies.set(TimeKey, time)
}
// 获取时间戳
export function getTime () {
  return Cookies.get(TimeKey)
}
