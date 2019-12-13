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
      <el-table-column type="index" min-width="60" align="center" />
      <el-table-column label="所属角色" align="center" prop="roleInfo.name" min-width="100" />
      <el-table-column label="昵称" align="center" prop="nickName" min-width="150" />
      <el-table-column v-permission="['institution']" label="负责机构" align="center" min-width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.institutionInfo">
            <el-tag v-if="scope.row.institutionInfo.id" type="success">
              {{ scope.row.institutionInfo.name }}
            </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column v-permission="['school']" label="负责校区" align="center" min-width="120px">
        <template slot-scope="scope">
          <div style="display:flex;flex-wrap: wrap;">
            <el-tag v-for="(item,index) in scope.row.schoolList" :key="index" type="warning" style="margin-left:5px;margin-top:5px">
              {{ item.name }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-permission="['project']" label="负责项目" align="center" min-width="120px">
        <template slot-scope="scope">
          <div style="display:flex;flex-wrap: wrap;">
            <el-tag v-for="(item,index) in scope.row.projectList" :key="index" type="info" style="margin-left:5px;margin-top:5px">
              {{ item.name }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="phone" min-width="110px" />
      <el-table-column label="用户类型" align="center" min-width="100px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.roleInfo.type | colorFilter">
            {{ scope.row.roleInfo.type | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updatedAt" label="操作时间" min-width="120">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ dayjs(scope.row.updatedAt).format('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经办人" align="center" min-width="150px" prop="createInfo.nickName" />
      <el-table-column class-name="status-col" label="操作" min-width="250px" align="left" header-align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
            修改
          </el-button>
          <el-button type="warning" size="mini" @click="handleRepwd(scope.row.id)">
            重置密码
          </el-button>
          <el-button v-show="!scope.row.isDelete" type="danger" size="mini" @click="removeBgm(scope.row.id)">
            注销
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新建用户 -->
    <el-dialog
      :visible.sync="dialog"
      :title="dialogType == 1 ? '新增用户' : '编辑用户'"
      width="30%"
      top="10vh"
      center
    >
      <el-form ref="form" :model="form" label-width="120px" height=" 500px" auto-complete="on">
        <el-form-item label="所属角色：" required>
          <el-select v-model="form.role_id" placeholder="请选择" clearable filterable>
            <el-option
              v-for="(item, index) in roleSelects"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="昵称：" required>
          <el-input v-model="form.nickName" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="手机号：" required>
          <el-input v-model="form.phone" placeholder="请填写" />
        </el-form-item>
        <el-form-item v-show="dialogType==1" label="密码：" required>
          <el-input v-model="password" placeholder="请填写" type="password" show-password />
        </el-form-item>
        <el-form-item v-show="dialogType==1" label="确认密码：" required>
          <el-input v-model="repassword" placeholder="请填写" type="password" show-password />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="inputBgmAdd()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <pagination :hidden="listQuery.total <= listQuery.pageSize" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" :auto-scroll="false" @pagination="fetchData" />
  </div>
</template>

<script>
import { isStringLength, isPassword, isPoneAvailable } from '@/utils/validate'
import Pagination from '@/components/Pagination'
import { adminlist, rolelist, registerUser, repassword, deleteAdmin, editAdmin } from '@/api/admin'
import _md5 from 'md5'

export default {
  components: { Pagination },
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
  data() {
    return {
      listData: [],
      listLoading: true,
      dialog: false,
      dialogType: 1,
      form: {},
      password: '',
      repassword: '',
      roleSelects: [],
      listQuery: {
        total: 1,
        page: 1,
        pageSize: 10
      },
      totalData: []
    }
  },
  computed: {
    roleMap() {
      const obj = {}
      this.roleSelects.forEach(item => {
        obj[item.id] = item
      })
      return obj
    }
  },
  async mounted() {
    if (this.$store.state.user.adminType == 4) {
      this.$router.push('404')
      return
    }
    this.listLoading = true
    const res1 = await adminlist({ page: this.listQuery.page, pageSize: this.listQuery.pageSize })
    const res2 = await rolelist({ pageSize: 0 })
    this.roleSelects = res2
    this.listQuery.total = res1.count
    this.listLoading = false
    this.listData = res1.data
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await adminlist({ page: this.listQuery.page, pageSize: this.listQuery.pageSize })
      this.listData = res.data
      this.listLoading = false
    },
    async inputBgmAdd() {
      if (!this.form.role_id) {
        this.$message({ type: 'error', message: '请选择所属角色' }); return
      }
      if (isStringLength(this.form.nickName, 20) === 1) {
        this.$message({ type: 'error', message: '昵称过长!' }); return
      } else if (isStringLength(this.form.nickName, 20) === 0) {
        this.$message({ type: 'error', message: '请输入昵称!' }); return
      }
      if (!isPoneAvailable(this.form.phone)) {
        this.$message({ type: 'error', message: '手机号格式不正确!' }); return
      }
      if (this.dialogType == 2) {
        const res = await editAdmin({
          id: this.form.id,
          nickName: this.form.nickName,
          role_id: this.form.role_id,
          phone: this.form.phone
        })
        if (res.code == 200) {
          this.$message({ message: '提交成功', type: 'success' })
        }
        if (this.$store.state.user.userId == this.form.id) {
          this.$store.dispatch('user/LogOut').then(() => {
            location.reload()
          })
        } else {
          this.fetchData()
          this.dialog = false
          this.form = {}
        }
      } else {
        if (!isPassword(this.password)) {
          this.$message({ type: 'error', message: '初始密码必须为8-16位的数字加字母的格式' }); return
        }
        if (this.password !== this.repassword) {
          this.$message({ type: 'error', message: '两次密码不一致' }); return
        }
        this.form.password = _md5(_md5(this.password) + 'flynn')
        const res = await registerUser(this.form)
        if (res.code == 200) {
          if (this.roleMap[this.form.role_id].type == 2 && this.$store.state.user.adminType == 1) {
            this.$message({ message: '提交成功，请添加机构并绑定该用户', type: 'success' })
            setTimeout(() => {
              this.$router.push({ path: '/institution/index' })
            }, 1000)
          } else {
            this.$message({ message: '提交成功', type: 'success' })
            this.dialog = false
            this.form = {}
            this.fetchData()
          }
        }
      }
    },
    removeBgm(id) {
      this.$confirm('确认注销用户？', '注销用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteAdmin({ id })
        if (res.code == 200) {
          this.$message({ message: '删除成功', type: 'success' })
          this.fetchData()
        }
      })
    },
    handleRepwd(id) {
      this.$prompt('请输入新密码,请反复确认！！！', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'text',
        inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
        inputErrorMessage: '密码必须为8-16位的数字加字母的格式'
      }).then(async({ value }) => {
        const res = await repassword({ id, password: _md5(_md5(value) + 'flynn') })
        if (res.code == 200) {
          this.$message({ message: '重置密码成功', type: 'success' })
          this.fetchData()
        }
        if (this.$store.state.user.userId == id) {
          this.$store.dispatch('user/LogOut').then(() => {
            location.reload()
          })
        }
      })
    },
    handleEdit(item) {
      this.dialogTittle = '编辑用户'
      this.form = item
      this.dialogType = 2
      this.dialog = true
    },
    handeleNewAdd() {
      this.dialogTittle = '新增用户'
      this.dialogType = 1
      this.dialog = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.control-strip{
    height: 60px;
    button{
        margin-right: 30px;
    }
}
</style>
