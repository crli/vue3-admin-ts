<!--
 * @Author: crli
 * @Date: 2021-12-15 11:02:20
 * @LastEditors: crli
 * @LastEditTime: 2021-12-20 13:34:47
 * @Description: file content
-->
<template>
  <el-dialog
    :title="(id ? '编辑' : '添加') + '账户'"
    @open="open"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="form" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="账号类型" prop="accountType">
        <el-select size="small" v-model="ruleForm.accountType" placeholder="请选择类型" @change="changeAccountType">
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属租户" prop="tenant">
        <el-select size="small" v-model="ruleForm.tenant" placeholder="请选择类型" filterable>
          <el-option v-for="item in tenantList.arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="环境" prop="ededed" v-if="ruleForm.accountType === 2">
        <el-select v-model="ruleForm.ededed" placeholder="请选择环境">
          <el-option v-for="item in edededList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应用" prop="ddddd" v-if="ruleForm.accountType === 2">
        <el-select v-model="ruleForm.ddddd" placeholder="请选择环境">
          <el-option v-for="item in dddddList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户名" prop="account">
        <el-input v-model="ruleForm.account" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="accountName">
        <el-input v-model="ruleForm.accountName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="ruleForm.confirmPassword" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile" v-if="Number(ruleForm.accountType) < 2">
        <el-input v-model="ruleForm.mobile" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" v-if="Number(ruleForm.accountType) < 2">
        <el-input v-model="ruleForm.email" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
//相关引入
import { reactive, getCurrentInstance } from 'vue'
interface ObjTy {
  [propName: string]: any
}
let { proxy }: any = getCurrentInstance()
//响应式数据、props、emit 定义
const state = reactive({
  xxx: ''
})
let ruleForm = reactive({
  accountType: null,
  tenant: '',
  ededed: '',
  ddddd: '',
  account: '',
  accountName: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  email: ''
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

let tenantList: ObjTy = reactive({
  arr: []
})

let rules = {
  accountType: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'change'
    }
  ],
  tenant: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'change'
    }
  ],
  ededed: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'change'
    }
  ],
  ddddd: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'change'
    }
  ],
  account: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur'
    }
  ],
  accountName: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur'
    }
  ]
}
let edededList = reactive([
  {
    name: 'dddddddddded',
    id: 0
  },
  {
    name: 'sssssssssss',
    id: 1
  }
])
let dddddList = reactive([
  {
    name: 'ddddddddddw',
    id: 0
  },
  {
    name: 'wwwwwwwded',
    id: 1
  }
])
const props = defineProps({
  id: {
    type: String
  }
})
let open = () => {
  if (props.id) state.xxx = '查详情' + Math.random()
  else state.xxx = ''
}
let changeAccountType = () => {
  ruleForm.tenant = ''
  tenantList.arr = [
    {
      name: 'wwwwwwwq111',
      id: 0
    },
    {
      name: 'ww11112',
      id: 1
    }
  ]
}
let cancel = () => {
  clearForm()
  proxy.$emit('update:model-value', false)
}
let clearForm = () => {
  ruleForm = Object.assign(ruleForm, {
    accountType: null,
    tenant: '',
    ededed: '',
    ddddd: '',
    account: '',
    accountName: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    email: ''
  })
  proxy.$refs['form'].resetFields()
}
let submitForm = (formName: string) => {
  proxy.$refs[formName].validate((valid: boolean) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped></style>
