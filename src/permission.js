// import router from '@/router'
// // 进度条
// import NProgress from 'nprogress'// 引入nprogress
// import 'nprogress/nprogress.css'// 进度条样式
// import store from '@/store'// 引入vuex
// const whiteList = ['/login', '/404']// 白名单
// // to 去哪，from 哪来，next 是否继续
// // 前置路由守卫
// router.beforeEach((to, from, next) => {
//   // 开启进度条
//   NProgress.start()
//   const token = store.state.user.token// 获取token

//   if (token) {
//     // 如果token存在，且想要去登录就跳转到默认页面
//     if (to.path === '/login') {
//       NProgress.done()// 关闭进度条
//       next('/')// 跳转到默认页面
//     } else {
//       if (!store.state.user.userInfo.id) {
//         // 当前用户手里有token，并且不算登录页面，那就应该请求个人资料
//         // 这块ajax只会发送一次，优化了一下
//         store.dispatch('user/getInfo')// 发送获取用户信息请求
//       }
//       next()// 放行
//     }
//   } else {
//     // 如果没有token，想去白名单里面的就放行
//     if (whiteList.includes(to.path)) {
//       next()
//     } else {
//       // token没有，想去其他页面就跳转到登录页面
//       next('/login')
//     }
//   }
// })
// // 后置路由守卫
// router.afterEach(() => {
//   // 进度条结束
//   NProgress.done()
// })

