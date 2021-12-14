import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@/utils/login'

export function batchUpdateJourneyHelperProjectRanking (params) { // batchUpdateJourneyHelperProjectRanking: '/linanJourney/journeyHelperProjectManagement/batchUpdateJourneyHelperProjectRanking', // 修改项目排名
  return request({
    url: urls.batchUpdateJourneyHelperProjectRanking,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getFinishJourneyHelperProjectList (params) { // batchUpdateJourneyHelperProjectRanking: '/linanJourney/journeyHelperProjectManagement/batchUpdateJourneyHelperProjectRanking', // 修改项目排名
  return request({
    url: urls.getFinishJourneyHelperProjectList,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getRankingJourneyHelperProjectList (params) { // getRankingJourneyHelperProjectList: '/linanJourney/journeyHelperProjectManagement/getRankingJourneyHelperProjectList', // 已排名列表
  return request({
    url: urls.getRankingJourneyHelperProjectList,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 新增共建单位管理
export function createJourneyCoConstructionUnit (params) {
  return request({
    url: urls.createJourneyCoConstructionUnit,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 分页查询共建单位管理
export function getJourneyCoConstructionUnitPage (params) {
  return request({
    url: urls.getJourneyCoConstructionUnitPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 积分明细
export function getJourneyCoConstructionUnitPointRecord (params) {
  return request({
    url: urls.getJourneyCoConstructionUnitPointRecord,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 获取街道社区组织树
export function findCommunityOrganizationTree (params) {
  return request({
    url: urls.findCommunityOrganizationTree,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
// 获取共建单位组织列表
export function findUnitOrganizationList (params) {
  return request({
    url: urls.findUnitOrganizationList,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 获取共建单位组织列表
export function findPlotOrganizationList (params) {
  return request({
    url: urls.findPlotOrganizationList,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 修改共建单位管理
export function modifyJourneyCoConstructionUnit (params) {
  return request({
    url: urls.modifyJourneyCoConstructionUnit,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 批量数据清空
export function modifyClearJourneyCoConstructionUnit (params) {
  return request({
    url: urls.modifyClearJourneyCoConstructionUnit,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 分页数据清空记录
export function getClearJourneyCoConstructionUnitByPage (params) {
  return request({
    url: urls.getClearJourneyCoConstructionUnitByPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 新增社区项目管理
export function createJourneyHelperProject (params) {
  return request({
    url: urls.createJourneyHelperProject,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 删除社区项目管理
export function deleteJourneyHelperProject (params) {
  return request({
    url: urls.deleteJourneyHelperProject,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 查询社区项目管理详情
export function getJourneyHelperProject (params) {
  return request({
    url: urls.getJourneyHelperProject,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 分页查询社区项目管理
export function getJourneyHelperProjectPage (params) {
  return request({
    url: urls.getJourneyHelperProjectPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
// 修改社区项目管理
export function modifyJourneyHelperProject (params) {
  return request({
    url: urls.modifyJourneyHelperProject,
    method: 'post',
    data: {
      ...params
    }
  })
}
