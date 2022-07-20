import { login, getInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken, setTime } from '@/utils/auth'
//1 ------ 模版代码 作为参考 真真多写在 user.js里面  ------
const state = {
  token: getToken(), // token
  userInfo: {}// 用户信息
}
const mutations = {
  // 设置token
  setToken (state, payload) {
    state.token = payload
  },
  // 设置用户信息
  setUserInfo (state, payload) {
    state.userInfo = payload
  },
  removeToken (state) {
    state.token = null
    removeToken()// 删除token 在auth.js中
  },
  removeUserInfo (state) {
    state.userInfo = {}
  }

}
const actions = {
  // ----------------------------------
  // 登录
  async login (context, data) {
    const res = await login(data)
    context.commit('setToken', res)
    setToken(res)// 储存用户token给cookie
    setTime(Date.now())// 存时间戳
  },
  // ----------------------------------
  // 获取用户信息
  async getInfo (context) {
    const res = await getInfo()// 获取用户信息
    const res1 = await getUserDetailById(res.userId)// 获取用户的基本信息
    console.log(res1)// 获取用户的基本信息
    console.log(res)// 获取用户信息
    context.commit('setUserInfo', { ...res, ...res1 })// 设置用户信息
  },
  logout (context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
  // ----------------------------------
}

export default {
  namespaced: true,// 开启命名空间
  state,
  mutations,
  actions
}
