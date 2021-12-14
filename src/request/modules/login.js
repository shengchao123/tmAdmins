import request from '../index'
import config from '@/config.js'

export const getCaptchaUrl = config.apiPrefix + '/user/validateCode/getValidateCode?uuid='

export function login (params) {
  return request({
    url: '/user/user/login',
    method: 'post',
    data: params
  })
}

export function logout (params) {
  return request({
    url: '/user/user/loginOut',
    method: 'post',
    data: params
  })
}

export function findLoginMenu (params) { // 通过组织查找所属角色列表
  return request({
    url: '/setting/sysMenu/findLoginMenu',
    method: 'post',
    data: {}
  })
}

export function getAuthCode (params) {
  const url = `/auth/oauth/authorize?response_type=code&appid=browser&redirect_uri=${params}`
  return request({
    url: url,
    method: 'get'
  })
}
