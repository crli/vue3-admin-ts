/*
 * @Author: crli
 * @Date: 2021-10-25 16:11:36
 * @LastEditors: crli
 * @LastEditTime: 2021-11-23 16:09:35
 * @Description: file content
 */
import request from '@/utils/axiosReq'
import { ObjTy } from '@/types/common'

export function dddddd(data: ObjTy) {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/vue-admin-template/table/list`,
    method: 'post',
    data
  })
}
export function loginReq(data: ObjTy) {
  return request({
    url: '/ty-user/user/loginValid',
    data,
    method: 'post',
    bfLoading: false,
    isParams: true,
    isAlertErrorMsg: false
  })
}

export function getInfoReq() {
  return request({
    url: '/ty-user/user/getUserInfo',
    bfLoading: false,
    method: 'post'
  })
}

export function logoutReq() {
  return request({
    url: '/ty-user/user/loginOut',
    method: 'post'
  })
}
