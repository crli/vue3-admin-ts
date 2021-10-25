<!--
 * @Author: crli
 * @Date: 2021-10-15 09:27:35
 * @LastEditors: crli
 * @LastEditTime: 2021-10-22 09:48:50
 * @Description: file content
-->
<template>
  <div class="container">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-form :inline="true" :model="listQuery">
            <el-row :gutter="10">
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="租户名称/租户ID：">
                  <el-input
                    size="small"
                    v-model="listQuery.tenantName"
                    placeholder="请输入租户名称/租户ID"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item>
                  <el-button size="small" type="primary" @click="getList">查询</el-button>
                  <el-button size="small" type="primary" @click="createTenant">创建租户</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="租户名称" align="center"></el-table-column>
        <el-table-column prop="id" label="租户ID" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'">
              {{ getStatusName(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="应用数" align="center">
          <template #default="scope">
            <el-button type="text" @click="appListView(scope.row.id)">{{ scope.row.num }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="lastOperationTime" label="最后操作时间" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template #default="scope">
            <el-button v-action:btn_auth type="primary" plain size="small" @click="authSetting(scope.row.id)">
              权限设置
            </el-button>
            <el-button v-action:btn_edit type="primary" plain size="small" @click="edit(scope.row.id)">编辑</el-button>
            <el-button v-action:btn_del type="danger" plain size="small" @click="toDelete(scope.row.id)">
              删除
            </el-button>
            <el-button v-action:btn_lock type="warning" plain size="small" @click="locked(scope.row.id)">
              锁定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :hidden="!Boolean(total)"
        :total="total"
        v-model:page="listQuery.pageNum"
        v-model:limit="listQuery.pageSize"
        :auto-scroll="false"
        @pagination="getList"
      />
    </el-card>
    <appListDlg v-model="visible" :id="id"></appListDlg>
    <tenantDlg v-model="tntVisible" :id="id"></tenantDlg>
  </div>
</template>
<script lang="ts">
export default {
  name: 'tenantMgt'
}
</script>
<script setup lang="ts">
//相关引入
import { onMounted, getCurrentInstance, ref, reactive } from 'vue'
import appListDlg from './components/appListDlg'
import tenantDlg from './components/tenantDlg'
let { proxy }: any = getCurrentInstance()

//响应式数据、props、emit 定义
let listQuery = reactive({
  tenantName: '',
  pageNum: 1,
  pageSize: 10
})
let total = ref(100)
let tableData: any = ref([])
let visible = ref(false)
let tntVisible = ref(false)
let id = ref('')
//生命周期以及 watch computed书写
onMounted(() => {
  console.log(111)
  tableData.value = [
    {
      name: '张三',
      id: '1',
      status: '1',
      num: '5',
      createTime: '2021-06-30 13:00:00',
      lastOperationTime: '2021-07-01 13:00:00',
      operator: '管理员'
    },
    {
      name: '李四',
      id: '2',
      status: '0',
      num: '6',
      createTime: '2021-06-30 13:00:00',
      lastOperationTime: '2021-07-01 13:00:00',
      operator: '管理员'
    },
    {
      name: '王五',
      id: '3',
      status: '1',
      num: '10',
      createTime: '2021-06-30 13:00:00',
      lastOperationTime: '2021-07-01 13:00:00',
      operator: '管理员'
    },
    {
      name: '赵六',
      id: '4',
      status: '0',
      num: '4',
      createTime: '2021-06-30 13:00:00',
      lastOperationTime: '2021-07-01 13:00:00',
      operator: '管理员'
    }
  ]
})

//方法定义
let getStatusName = (v: string) => {
  return v === '1' ? '正常' : '锁定'
}
let getList = () => {
  let reqConfig = {
    url: '/xxxxx/xx',
    method: 'post',
    data: listQuery
  }
  proxy.$axiosReq(reqConfig).then((resData: any) => {
    tableData.value = resData.data?.records
    total.value = resData.data?.total
  })
  // let reqConfig = {
  //   url: '/xxxxx/xx',
  //   method: 'get',
  //   data: listQuery,
  //   isParams: true,
  // }
  // proxy.$axiosReq(reqConfig).then((resData: ObjTy) => {
  //   tableData.value = resData.data?.records
  //   total = resData.data?.total
  // })
}
let createTenant = () => {
  id.value = ''
  tntVisible.value = true
}
let appListView = (v: string) => {
  id.value = v
  visible.value = true
}
let edit = (v: string) => {
  tntVisible.value = true
  id.value = v
}
let toDelete = (v: string) => {
  console.log(v)
}
let locked = (v: string) => {
  console.log(v)
}
let authSetting = (v: string) => {
  console.log(v)
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
