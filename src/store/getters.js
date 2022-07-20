const getters = {
  sidebar: state => state.app.sidebar, // 获取侧边栏状态
  device: state => state.app.device // 获取设备
  // 1 ------ user初始化模版已经删除了下面的功能 ------
  // token: state => state.user.token, // 获取token
  // name: state => state.user.userInfo.username, // 获取用户名
  // avatar: state => state.user.userInfo.staffPhoto// 获取用户头像
  // ------ user 自己后期写的 请写在下面------

}
export default getters
