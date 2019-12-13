<template>
  <div class="app-container">
     <el-row>
       <el-col :span="23">
         <div class="control-strip">

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
  </div>
</template>

<script>
export default {
  name: 'Insurance'
}
</script>

<style scoped>

</style>
