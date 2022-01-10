/*
 * @Author: crli
 * @Date: 2021-10-13 15:50:46
 * @LastEditors: crli
 * @LastEditTime: 2022-01-10 13:13:16
 * @Description: file content
 */
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: `/manager/xxxx/getToken`,
    method: 'post',
    response: () => {
      return {
        "flag":true,
        "status":'200',
        "message":"操作成功!",
        "result": {
          "token": 'swsw'
        }
      }
    }
  },
  {
    url: '/manager/xxxx/loginOut',
    method: 'post',
    response: () => {
      return {
        "flag":true,
        "status":'200',
        "message":"操作成功!",
        "result": ''
      }
    }
  },
  {
    url: '/manager/xxxx/getUserInfo',
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
