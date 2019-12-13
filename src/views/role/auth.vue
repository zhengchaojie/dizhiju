<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="control-strip">
          <el-button type="primary" @click="handeleNewAdd()">
            新增
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="listData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="index" min-width="60" align="center" fixed="left" />
      <el-table-column label="角色名称" align="center" min-width="120px" prop="name" />
      <el-table-column label="机构" align="center" min-width="120px" prop="institutionInfo.name" />
      <el-table-column label="校区" align="center" min-width="150px" prop="schoolInfo.name" />
      <el-table-column label="角色类型" align="center" min-width="120px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | colorFilter">
            {{ scope.row.type | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="经办人" align="center" min-width="150px" prop="createInfo.nickName" />
      <el-table-column align="center" prop="updatedAt" label="操作时间" min-width="120">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ dayjs(scope.row.updatedAt).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" min-width="150px"	header-align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handelRemoveRole(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建用户 -->
    <el-dialog
      :title="dialogTittle"
      :visible.sync="dialog"
      width="50%"
      top="10vh"
      center
    >
      <el-form ref="form" :model="form" label-width="120px" height=" 500px" auto-complete="on">
        <el-form-item label="角色名称" required>
          <el-input v-model="form.name" placeholder="请填写角色名称" style="width:50%" @keyup.enter.native="inputRoleAdd()" />
        </el-form-item>
        <el-form-item label="访问权限" required>
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
            全选权限
          </el-checkbox>
        </el-form-item>
        <el-form-item v-for="(items,index) in rolesMap" :key="index" :label="items.resourceType">
          <el-checkbox-group v-model="form.roleList" @change="handleCheckedChange">
            <el-checkbox v-for="item in items.subResourceInfoList" :key="item.resourceCode" :label="item.resourceCode">
              {{ item.resourceName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="inputRoleAdd()">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <pagination :hidden="listQuery.total <= listQuery.pageSize" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" :auto-scroll="false" @pagination="fetchData" />
  </div>
</template>

<script>
import { isStringLength } from '@/utils/validate'
import { roleMap } from '@/utils/roleMap'
import Pagination from '@/components/Pagination'
import { rolelist, roleAdd, roleEdit, roleDelete } from '@/api/admin'

export default {
  filters: {
    statusFilter(type) {
      const statusMap = {
        1: '平台管理员',
        2: '机构管理员',
        3: '校区管理员',
        4: '项目负责人'
      }
      return statusMap[type]
    },
    colorFilter(type) {
      const statusMap = {
        1: '',
        2: 'success',
        3: 'warning',
        4: 'info'
      }
      return statusMap[type]
    }
  },
  components: { Pagination },
  data() {
    return {
      listData: [],
      listLoading: true,
      dialog: false,
      dialogType: null, // 1为新增，2为编辑
      dialogTittle: '',
      checkAll: false,
      checkAllList: [],
      form: {
        authList: this.$store.state.operationList,
        roleList: [],
        type: 1,
        name: ''
      },
      rolesMap: [],
      listQuery: {
        total: 0,
        page: 1,
        pageSize: 10
      }
    }
  },
  computed: {
  },
  mounted() {
    if (this.$store.state.user.adminType == 4) {
      this.$router.push('404')
      return
    }
    this.rolesMap = roleMap
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await rolelist({ page: this.listQuery.page, pageSize: this.listQuery.pageSize })
      this.listData = res.data
      this.listQuery.total = res.count
      this.listLoading = false
    },
    dealOptionsList() {
      // 处理chekBox
      if (!this.checkAllList.length) {
        roleMap.map(items => {
          items.subResourceInfoList.map(item => {
            this.checkAllList.push(item.resourceCode)
          })
        })
      }
      if (this.form.roleList.length == this.checkAllList.length || this.form.roleList.indexOf('fly00') > -1) {
        this.checkAll = true
        this.form.roleList = this.checkAllList
      } else {
        this.checkAll = false
      }
    },
    handleCheckAllChange(value) {
      if (value == true) {
        this.form.roleList = this.checkAllList
      } else {
        this.form.roleList = []
      }
    },
    handleCheckedChange(value) {
      if (this.form.roleList.length == this.checkAllList.length || this.form.roleList.indexOf('fly00') > -1) {
        this.checkAll = true
        this.form.roleList = this.checkAllList
      } else {
        this.checkAll = false
      }
    },
    async handelRemoveRole(id) {
      this.$confirm('确认删除角色?', '删除角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await roleDelete({ id })
        if (res.code == 200) {
          this.$message({ message: '删除成功', type: 'success' })
          this.fetchData()
        }
      })
    },
    async inputRoleAdd() {
      if (isStringLength(this.form.name, 20) == 1) {
        this.$message({ type: 'error', message: '角色名称过长!' }); return
      } else if (isStringLength(this.form.name, 20) == 0) {
        this.$message({ type: 'error', message: '请输入角色名称!' }); return
      }
      if (this.form.roleList.length == 0) {
        this.$message({ type: 'error', message: '角色权限不能为空!' }); return
      }
      if (!this.form.type) {
        this.$message({ type: 'error', message: '请选择角色类型' }); return
      }
      if (this.form.authList.length == 0) {
        this.$message({ type: 'error', message: '请配置角色操作权限' }); return
      }
      let res
      if (this.dialogType == 1) {
        res = await roleAdd(this.form)
      } else {
        res = await roleEdit(this.form)
      }
      if (res.code == 200) {
        this.$message({ message: '提交成功', type: 'success' })
        this.dialog = false
        this.fetchData()
      }
    },
    handleEdit(item) {
      this.dialogTittle = '编辑角色'
      this.form.name = item.name
      this.form.id = item.id
      this.form.roleList = JSON.parse(item.roleList)
      this.form.type = item.type
      this.form.authList = JSON.parse(item.authList)
      this.dealOptionsList()
      this.dialogType = 2
      this.dialog = true
    },
    handeleNewAdd() {
      this.form.name = ''
      this.dialogTittle = '新增角色'
      this.dealOptionsList()
      this.dialogType = 1
      this.dialog = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.el-form-item{
  margin-bottom: 5px
}
</style>
