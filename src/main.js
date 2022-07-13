import Vue from 'vue' // 引入vue
// 保持在不同游览器中，标签都一致
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// --------------------------------------------------
// ElementUI的固定引入
import ElementUI from 'element-ui' // ElementUI
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// --------------------------------------------------
// 国际化语言包
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// --------------------------------------------------
// 全局公共样式
import '@/styles/index.scss' // global css
// --------------------------------------------------
// 根组件
import App from './App' // 引入App.vue
// vuex
import store from './store'// vuex
// 路由
import router from './router'// 路由

import '@/icons' // icon//svg图标
import '@/permission' // permission control//权限控制

// --------------------------------------------------
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// 如果您不想使用mock-server，您想将MockJs用于模拟API，您可以执行：模拟XHR()

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
// --------------------------------------------------

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 控制台有个生成的错误，暂时屏蔽
Vue.config.productionTip = false

new Vue({
  el: '#app', // 定义渲染的元素
  router, // 定义路由
  store, // 定义vuex
  render: h => h(App)// 定义渲染的函数
})
