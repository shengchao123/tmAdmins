import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@/utils/login'

export function findLoginMenu (params) { // 通过组织查找所属角色列表
  return request({
    url: '/setting/sysMenu/findLoginMenu',
    method: 'post',
    data: {}
  })
}

export function getTopOrganizationByUserId (params) { // 获取顶级组织根据用户Id
  return request({
    url: '/organization/topOrganization/findTopOrganizationByUserId',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getOrgSysModuleDetail (params) { // 查找组织下的模块和模块下的应用
  return request({
    url: urls.findOrgSysModuleDetail,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function findSubstantiveOrganizationByUser () { // 根据用户获取实体组织信息
  return request({
    url: urls.findSubstantiveOrganizationByUser,
    method: 'post',
    data: {
    }
  })
}
