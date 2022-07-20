import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// ------ 所有引入的组件都全部 变成全局组件 -------
Vue.component('svg-icon', SvgIcon)

// ------ 将所有svg目录下所有的 svg后缀的文件全部都引入到项目中 -------
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
