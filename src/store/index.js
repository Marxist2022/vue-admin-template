import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// ------ Vuex注册 ------
Vue.use(Vuex)

// ------ Vuex实例化 ------
const store = new Vuex.Store({
  // ------ Vuex模块化 ------
  modules: {
    app, // -折叠展开
    settings, // -logo头部
    user// -用户信息
  },
  // ------ 对子模块的快捷访问 ------
  getters
})

export default store
