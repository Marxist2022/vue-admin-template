<template>
  <div>
    <!-- //组件 新增角色 按钮 -->
    <el-button
      type="primary"
      size="mini"
      @click="
        roleDialogVisible = true;
        isEdit = false;
        from = {};
      "
    >
      新增角色</el-button
    >
    <!-- //组件 表格 -->
    <el-table :data="roleList" border>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        label="角色名"
        prop="name"
        width="160px"
        sortable
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="description"
        sortable
      ></el-table-column>
      <el-table-column v-slot="scope" label="操作">
        <!-- //组件 三个按钮 -->
        <el-button type="text" @click="showRightDialog(scope.row.id)"
          >分配权限</el-button
        >
        <el-button type="text" @click="showRoleDialog(scope.row)"
          >修改</el-button
        >
        <el-button type="text" @click="del(scope.row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- //组件 分页 -->
    <el-row type="flex" justify="end">
      <el-pagination
        :current-page="paramsObj.page"
        :page-sizes="[2, 3, 4, 5, 6]"
        :page-size="paramsObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-row>
    <!-- //组件 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="rightVisible" width="30%">
      <el-tree
        v-if="rightVisible"
        ref="myTree"
        :data="permissions"
        :props="{ label: 'name' }"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="selectPedermissions"
      ></el-tree>
      <template #footer>
        <el-button type="primary" @click="save">确认</el-button>
        <el-button @click="rightVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- //组件 新增和编辑的对话框 -->
    <el-dialog title="新增" :visible.sync="roleDialogVisible" @close="reset">
      <!-- //组件 新增表单 -->
      <el-form ref="myForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onClick">确认</el-button>
        <el-button @click="roleDialogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, delRole, addRole, editRole } from '@/api/setting'
import { getPermissions, getPermissionsById, assignPermission } from '@/api/permission'
import { tranferListToTree } from '@/utils'
export default {
  filters: {},
  components: {},
  data () {
    return {
      // ====== 要发送的数据 ======
      id: null,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      // ====== 接收回来的数据 ======
      paramsObj: {
        page: 1, // 默认拿第一页数据
        pagesize: 5// 默认每页显示条数
      },
      roleList: [], // 角色列表
      total: null, // 总条数
      permissions: [], // 权限列表
      selectPedermissions: [], // 选中的权限
      // ====== 开关量 ======
      rightVisible: false, // 开关量 分配权限
      roleDialogVisible: false, // 开关量 新增角色
      isEdit: false // 开关量 编辑角色
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getRoleList()// 获取角色列表
  },
  methods: {
    showRoleDialog (id) {
      this.isEdit = true
      this.roleDialogVisible = true
      this.form = { ...id }// 浅拷贝
      // this.form = Object.assign({}, id)// 深拷贝
    },
    // ---- 重置表单 ----
    reset () {
      this.$refs.myForm.resetFields()
    },
    // ---- 表单校验和发送请求 ----
    onClick () {
      this.$refs.myForm.validate(
        async (bool) => {
          if (!bool) return this.$message.error('表单数据非法')
          if (this.isEdit) {
            await editRole(this.form)
          } else {
            await addRole(this.form)
          }
          this.getRoleList()
          this.roleDialogVisible = false
        })
    },
    // ---- 保存 树状图的选中 事件 ----
    async save () {
      // console.log(this.$refs.myTree.getCheckedKeys())// 树状图中的打勾 变成一个数组
      console.log('haha', this.id, this.$refs.myTree.getCheckedKeys())
      const res = await assignPermission(this.id, this.$refs.myTree.getCheckedKeys())// 发送请求
      console.log('返回值', res)
      this.rightVisible = false// 关闭弹窗
    },
    // ----删除按钮 事件 ----
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          // --- 删除角色 ---
          await delRole(id)
          if (this.paramsObj.page === 1 && this.paramsObj.page > 1) {
            this.paramsObj.page--
          }
          this.getRoleList()// 刷新页面
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } catch (error) {
          this.$message.error(error.message)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // ---- 编辑按钮触发时 事件 ----
    async showRightDialog (id) {
      this.id = id
      console.log('id123' + id)
      // --- 获取权限列表 ---
      const res = await getPermissions()
      console.log(res)
      this.permissions = tranferListToTree(res, '0')
      // 获取当前的权限点
      const res1 = await getPermissionsById(id)
      console.log(123, res1)
      this.selectPedermissions = res1.permIds// 返回是否被选中
      this.rightVisible = true
    },
    // ----- 每页显示的条数 -----
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.paramsObj.pagesize = val
      this.getRoleList()
    },
    // ----- 当前页面 -----
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.paramsObj.page = val
      this.getRoleList()
    },
    // ----- 获取角色列表 -----
    async getRoleList () {
      try {
        const res = await getRoleList(this.paramsObj)
        console.log(res)
        this.roleList = res.rows// 列表
        this.total = res.total// 总页数
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
