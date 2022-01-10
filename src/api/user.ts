/*
 * @Author: crli
 * @Date: 2021-10-25 16:11:36
 * @LastEditors: crli
 * @LastEditTime: 2022-01-10 13:12:50
 * @Description: file content
 */
import request from '@/utils/axiosReq'
import { ObjTy } from '@/types/common'

export function loginReq(data: ObjTy) {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/xxxx/getToken`,
    data,
    method: 'post'
  })
}

export function getInfoReq() {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/xxxx/getUserInfo`,
    bfLoading: false,
    method: 'post'
  })
}

export function logoutReq() {
  return request({
    url: `${import.meta.env.VITE_APP_BASE_URL}/xxxx/loginOut`,
    method: 'post'
  })
}
