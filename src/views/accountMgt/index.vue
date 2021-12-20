<!--
 * @Author: crli
 * @Date: 2021-10-15 09:27:35
 * @LastEditors: crli
 * @LastEditTime: 2021-12-20 13:34:29
 * @Description: 账号管理
-->
<template>
  <div class="container">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-form :inline="true" :model="listQuery">
            <el-row :gutter="10">
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="账户名：">
                  <el-input size="small" v-model="listQuery.account" placeholder="请输入账户名" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="账号：">
                  <el-input size="small" v-model="listQuery.accountName" placeholder="请输入账号" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item label="类型：">
                  <el-select size="small" clearable v-model="listQuery.accountType" placeholder="请选择类型">
                    <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="6" :xs="24" :offset="0">
                <el-form-item>
                  <el-button size="small" type="primary" @click="getList">查询</el-button>
                  <el-button size="small" type="primary" @click="addAccount">添加账号</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="account" label="账户名"></el-table-column>
        <el-table-column prop="accountName" label="账号"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.state === '1'" type="danger" size="medium">锁定</el-tag>
            <el-tag v-else type="success" size="medium">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="accountType" label="类型">
          <template #default="scope">
            <span v-if="scope.row.state === '0'">dedededede</span>
            <span v-else-if="scope.row.state === '1'">eeeeeeeeeeeeeee</span>
            <span v-else>dededededededeeeeeeeeee</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="lastTime" label="最后操作时间"></el-table-column>
        <el-table-column prop="user" label="操作人"></el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" plain size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" plain size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            <el-button type="primary" plain size="small" @click="lock(scope.row.id)">锁定</el-button>

            <el-button type="primary" v-if="scope.row.state === '2'" size="small" @click="resetPassword(scope.row.id)">
              重置密码
            </el-button>
            <el-button type="primary" v-else plain size="small" @click="showDiolog(scope.row.id)">重置密码</el-button>
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
      <addOrEdit v-model="visible" :id="id"></addOrEdit>
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
let { proxy }: any = getCurrentInstance()

//响应式数据、props、emit 定义
let listQuery = reactive({
  account: '',
  accountName: '',
  accountType: '',
  pageNum: 1,
  pageSize: 10
})
let typeList = [
  {
    name: 'dedededede',
    id: 0
  },
  {
    name: 'eeeeeeeeeeeeeee',
    id: 1
  },
  {
    name: 'dededededededeeeeeeeeee',
    id: 2
  }
]
let total = ref(100)
let tableData: any = ref([])
let visible = ref(false)
let passwordVisible = ref(false)
let id = ref('')
//生命周期以及 watch computed书写
onMounted(() => {
  console.log(proxy)
  tableData.value = [
    {
      operatorId: null,
      id: 'f519ece775ab4d63a2874b77de89594e',
      accountLoginId: null,
      accountId: null,
      loginType: null,
      account: 'app25395781',
      password: null,
      lastLoginTime: null,
      accountType: '2',
      accountTypeName: '应用dededededededeeeeeeeeee',
      accountName: '测试应用1_测试网关_20210713',
      accountStatus: '0',
      accountStatusName: '正常',
      tenantId: '10001',
      applicationId: '20001',
      gatewayId: '30001',
      lockId: null,
      termOfValidity: null,
      mobile: null,
      email: null,
      operatorName: null,
      applicationStatus: null,
      tenantStatus: null,
      createdTime: null,
      updatedTime: null
    },
    {
      operatorId: null,
      id: '2f1582a29c324660ac2aaa94e04e8988',
      accountLoginId: null,
      accountId: null,
      loginType: null,
      account: 'app74622218',
      password: null,
      lastLoginTime: null,
      accountType: '2',
      accountTypeName: '应用dededededededeeeeeeeeee',
      accountName: '测试应用1_测试网关_20210713',
      accountStatus: '0',
      accountStatusName: '正常',
      tenantId: '10001',
      applicationId: '20001',
      gatewayId: '30001',
      lockId: null,
      termOfValidity: null,
      mobile: null,
      email: null,
      operatorName: null,
      applicationStatus: null,
      tenantStatus: null,
      createdTime: null,
      updatedTime: null
    },
    {
      operatorId: null,
      id: '6aeb55acaedd44edb9dcd36d3515ebc2',
      accountLoginId: null,
      accountId: null,
      loginType: null,
      account: 'app56172455',
      password: null,
      lastLoginTime: null,
      accountType: '2',
      accountTypeName: '应用dededededededeeeeeeeeee',
      accountName: '测试应用1_测试网关_20210713',
      accountStatus: '0',
      accountStatusName: '正常',
      tenantId: '10001',
      applicationId: '20001',
      gatewayId: '30001',
      lockId: null,
      termOfValidity: null,
      mobile: null,
      email: null,
      operatorName: null,
      applicationStatus: null,
      tenantStatus: null,
      createdTime: null,
      updatedTime: null
    }
  ]
})

//方法定义

let getList = () => {}
let handleEdit = (v: string) => {
  id.value = v
  visible.value = true
}
let handleDelete = (v: string) => {}
let lock = (v: string) => {}
let resetPassword = (v: string) => {}
let addAccount = () => {
  visible.value = true
}
let showDiolog = (v: string) => {
  id.value = v
  passwordVisible.value = true
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
