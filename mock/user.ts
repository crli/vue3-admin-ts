/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:46
 * @LastEditors: crli
 * @LastEditTime: 2021-10-14 15:02:36
 * @Description: file content
 */
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/ty-user/user/loginValid',
    method: 'post',
    response: () => {
      return {
        "flag":true,
        "code":20000,
        "msg":"操作成功!",
        "data":{"jwtToken":"eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzQxNzQwNDAsImV4cCI6MTYzNDQzMzI0MCwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoiYWRtaW4ifQ.K_ryoFi_rRMrWLf8-FSZP6qGn2VXFh_APFybuVgK-Zw","email":null,"username":"admin"}}
    }
  },
  {
    url: '/ty-user/user/loginOut',
    method: 'post',
    response: () => {
      return {
        code: 0,
        title: 'mock请求测试'
      }
    }
  },
  {
    url: '/ty-user/user/getUserInfo',
    method: 'post',
    response: () => {
      return {
        "flag":true,
        "code":20000,
        "msg":"操作成功!",
        "data":{"username":"admin"}
      }
    }
  },
] as MockMethod[]
