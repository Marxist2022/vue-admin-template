<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- //组件 标签页 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <!-- //组件 角色管理组件 -->
            <RoleManage></RoleManage>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>

// 组件
// - 标签分割
// 注 解释给以后自己看的
// @ 可以调整的数据
import RoleManage from './components/RoleManage'
export default {

  filters: {},
  components: { RoleManage },
  data () {
    return {
      // ====== 要发送的数据 ======

      // ====== 接收回来的数据 ======

      // ====== 开关量 ======
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {

    // ====== 带有请求的ajax 事件 ======

  }
}
</script>

<style scoped>
</style>
