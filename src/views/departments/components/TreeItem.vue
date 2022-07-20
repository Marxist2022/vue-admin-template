<template>
  <div style="width: 100%">
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      style="height: 40px; padding: 30px 140px; font-size: 14px; width: 100%"
    >
      <el-col>
        <span>{{ node.data ? node.data.name : node.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col>{{ node.data ? node.data.manager : "负责人：" }}</el-col>
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown @command="onCommand">
              <span> 操作<i class="el-icon-arrow-down" /> </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">添加子部门</el-dropdown-item>
                <template v-if="node.data">
                  <el-dropdown-item command="b">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="c">删除部门</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- //------ 弹出框---- -->
    <el-dialog
      :title="title"
      :visible.sync="addDialogVisible"
      width="50%"
      @click.native.stop
      @close="resetForm('ruleForm')"
    >
      <el-form
        ref="addFormRef"
        label-width="100px"
        :model="addDeparmentForm"
        :rules="rules"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="addDeparmentForm.name"
            placeholder="1-50个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="addDeparmentForm.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <!-- <el-input v-model="addDeparmentForm.manager"></el-input> -->
          <el-select
            v-model="addDeparmentForm.manager"
            placeholder="请选择"
            style="width: 100%"
            filterable
          >
            <!-- //---- 添加部门 -->
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="addDeparmentForm.introduce"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delDepartment, addDepartment, getDepartmentsList, editDepartment } from '@/api/departments'
import { getSimpleUserList } from '@/api/user'
export default {
  filters: {

  },
  components: {},
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  data () {
    const validateName = async (rule, value, callback) => {
      // 拿到所有的部门数据
      const res = await getDepartmentsList()
      if (this.isEdit) {
        const pid = this.node.data.pid// 把当前要编辑的部分父级的id找到了 然后根据这个pid去找所有的兄弟元素
        // console.log(res.depts.filter(item => item.pid === pid && item.id !== this.node.data.id))
        res.depts.filter(item => item.pid === pid && item.id !== this.node.data.id).some(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      } else {
        // 待赛选的所有的子部门的pid值
        const id = this.node.data ? this.node.data.id : ''
        // fitler 筛选 只要子部门pid和当前部门id一样 说明是它的子部门
        // some 看有没有符合条件
        res.depts.filter(item => item.pid === id).some(item => item.name === value) ? callback(new Error('部门名称已存在')) : callback()
      }
    }

    return {
      addDialogVisible: false,
      // ------ 新增部门表单数据 ----------
      addDeparmentForm: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: ''// 部门介绍
      },
      // ------ 新增部门表单验证规则 ----------
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在3-10之间', trigger: 'blur' },
          { validator: validateName, trigger: 'change' }
        ], // 部门名称
        code: [{
        }], // 部门编码
        manager: [], // 部门负责人
        introduce: [] // 部门介绍
      },
      users: [], // 用户列表
      isEdit: false // 是否编辑
    }
  },
  computed: {
    title () {
      return this.isEdit ? '编辑部门' : '新增部门'
    }
  },
  watch: {},
  created () { },
  methods: {
    async onCommand (key) {
      if (this.users === 0) {
        this.getSimpleUserList()
      }
      if (key === 'a') {
        this.isEdit = false// 是否编辑
        this.addDialogVisible = true// 显示弹出框
        this.getSimpleUserList()// 获取用户列表
        console.log('添加子部门')
      } else if (key === 'b') {
        this.isEdit = true
        this.addDialogVisible = true
        console.log('编辑部门')
        this.addDeparmentForm = this.node.data
        // var obj = { a: 1, b: 2 } -- -> obj 把花括号去掉 —— 重新赋值上去
        this.addDeparmentForm = { ...this.node.data }
      } else if (key === 'c') {
        try {
          await this.$confirm('确定删除该部门吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          console.log('用户确定了')
          console.log(this.node.data.id)
          // ----- 删除部门 -----
          await delDepartment(this.node.data.id)
          this.$emit('delDepartment')
        } catch (error) {
          console.log(error)
          this.$notify({
            message: '取消了删除',
            duration: 1000
          })
        }
      }
    },
    async getSimpleUserList () {
      const res = await getSimpleUserList()
      console.log(res)
      this.users = res
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAddClose () {
      // this.$refs.addFormRef.resetFields()
      this.$refs.addFormRef.resetFields()
    },
    async onSubmit () {
      if (this.isEdit) {
        delete this.addDeparmentForm.children// 把对象的children属性删除掉
        await editDepartment(this.addDeparmentForm)
      } else {
        // 在哪一项上面新增部门，这一项id就是pid
        // 标题id在node下面 其他在node。data下面
        this.addDeparmentForm.pid = this.node.data ? this.node.data.id : ''
        await addDepartment(this.addDeparmentForm)
      }
      this.addDialogVisible = false
      this.$emit('delDepartment')// 子向父传值，数据更新要刷新tree
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
