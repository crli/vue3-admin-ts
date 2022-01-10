<!--
 * @Author: crli
 * @Date: 2021-10-15 09:27:35
 * @LastEditors: crli
 * @LastEditTime: 2022-01-10 10:16:13
 * @Description: XXX
-->
<template>
  <div class="container">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-form :inline="true" :model="state.listQuery">
            <el-row :gutter="10">
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="账户名：">
                  <el-input
                    size="small"
                    v-model="state.listQuery.account"
                    placeholder="请输入账户名"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="账号：">
                  <el-input
                    size="small"
                    v-model="state.listQuery.accountName"
                    placeholder="请输入账号"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="类型：">
                  <el-select size="small" clearable v-model="state.listQuery.accountType" placeholder="请选择类型">
                    <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item>
                  <el-button size="small" type="primary" v-action:btn_edit111>权限按钮隐藏</el-button>
                  <el-button size="small" type="primary" v-action:btn_edit>权限按钮显示</el-button>
                  <el-button size="small" type="primary" @click="getList" >查询</el-button>
                  <el-button size="small" type="primary" @click="addAccount">添加账号</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <el-table :data="tableData" border style="width: 100%" v-loading="state.loading">
        <el-table-column prop="account" label="账户名"></el-table-column>
        <el-table-column prop="accountName" label="账号"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.accountStatus === '1'" type="danger" size="medium">锁定</el-tag>
            <el-tag v-else type="success" size="medium">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="accountType" label="类型">
          <template #default="scope">
            <span v-if="scope.row.accountType === '0'">AAA</span>
            <span v-else-if="scope.row.accountType === '1'">BBB</span>
            <span v-else>CCC</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template #default="scope">{{ timeformat(scope.row.createdTime) }}</template>
        </el-table-column>
        <el-table-column prop="updatedTime" label="最后操作时间">
          <template #default="scope">{{ timeformat(scope.row.updatedTime) }}</template>
        </el-table-column>
        <el-table-column prop="operatorName" label="操作人"></el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :hidden="!Boolean(total)"
        :total="total"
        v-model:page="state.pageQuery.pageNum"
        v-model:limit="state.pageQuery.pageSize"
        :auto-scroll="false"
        @pagination="getList"
      />
      <addOrEdit :id="id" @close="getList" ref="refaddOrEdit"></addOrEdit>
    </el-card>
  </div>
</template>
<script lang="ts">
export default {
  name: 'accountMgt'
}
</script>
<script setup lang="ts">
import { onMounted, getCurrentInstance, ref, reactive } from 'vue'
import addOrEdit from './components/addOrEdit'
import { queryAccountList, deleteAccount } from '@/api/accountMgt'
import { ElMessage, ElMessageBox } from 'element-plus'
let { proxy }: any = getCurrentInstance()
import { ObjTy } from '@/types/common'
//响应式数据、props、emit 定义
const state = reactive({
  listQuery: {
    account: '',
    accountName: '',
    accountType: ''
  },
  pageQuery: {
    pageNum: 1,
    pageSize: 10
  },
  loading: false
})

let typeList = [
  {
    name: 'AAA',
    id: '0'
  },
  {
    name: 'BBB',
    id: '1'
  },
  {
    name: 'CCC',
    id: '2'
  }
]
let total = ref(100)
let tableData: any = ref([])
let id = ref('')
let refaddOrEdit: any = ref(null)

//生命周期以及 watch computed书写
onMounted(() => {
  console.log(proxy)
  getList()
})

//方法定义

let getList = () => {
  state.loading = true
  queryAccountList({
    entity: state.listQuery,
    ...state.pageQuery
  }).then((res: ObjTy) => {
    tableData.value = res.result.list
    total.value = res.result.total
    state.loading = false
  })
}
let handleEdit = (v: string) => {
  id.value = v
  refaddOrEdit.value.visible = true
}
let handleDelete = (v: string) => {
  ElMessageBox.confirm('确认删除？', '提示', {
    confirmButtonText: 'OK',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteAccount({
        entity: {
          accountId: v
        }
      }).then((res: ObjTy) => {
        if (res.status === '200') {
          ElMessage({ message: `删除成功`, type: 'success' })
          getList()
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消'
      })
    })
}
let addAccount = () => {
  id.value = ''
  refaddOrEdit.value.visible = true
}
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
}
.el-row {
  margin-top: 10px;
}
.box-card {
  height: calc(100vh - 150px);
  overflow: auto;
}
</style>
