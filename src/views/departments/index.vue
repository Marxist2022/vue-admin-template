<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="isLoading" style="min-height: 700px">
        <el-tabs>
          <el-tab-pane label="用户管理"
            ><!-- 用了一个行列布局 -->
            <!-- //----- 用户管理 ----- -->
            <TreeItem
              :node="titleObj"
              @delDepartment="getDepartmentsList"
            ></TreeItem>
            <!-- //----- 树 ----- -->
            <el-tree :data="data" default-expand-all>
              <template v-slot="scope">
                <TreeItem
                  :node="scope.node"
                  @delDepartment="getDepartmentsList"
                ></TreeItem>
              </template>
            </el-tree>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- //组件 返回顶部 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { getDepartmentsList } from '@/api/departments'
import TreeItem from './components/TreeItem.vue'
export default {
  filters: {},
  components: { TreeItem },
  data () {
    return {
      // ----- 树 -----
      data:
        [{
          label: '浙江黑马科技有限公司',
          children: [{
            label: '二级 1-1'
          }]
        }],
      titleObj: {},
      deletdeArr: [],
      isLoading: true

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDepartmentsList()
  },
  methods: {
    // ----- 获取数据 -----
    async getDepartmentsList () {
      const res = await getDepartmentsList()
      console.log(res)
      // ----- 数据处理 -----
      function tranferListToTree (list, pid) {
        var list1 = []
        list.forEach(item => {
          if (item.pid === pid) {
            list1.push(item)
            item.children = tranferListToTree(list, item.id)
          }
        })
        return list1
      }
      const res1 = tranferListToTree(res.depts, '')
      // ----- /数据处理 -----
      console.log(res1)
      this.data = res1
      this.titleObj = res.depts[0]
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-tree-node {
  padding: 10px !important;
  span,
  div {
    font-size: 20px;
  }
}
::v-deep .el-tree-node__content {
  padding: 20px 0 !important;
}
</style>
