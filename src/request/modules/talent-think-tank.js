import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@/utils/login'

export function getJourneyPolicyPage (params) { // 政策分页
  return request({
    url: urls.getJourneyPolicyPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function createJourneyPolicy (params) { // 新增政策
  return request({
    url: urls.createJourneyPolicy,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyPolicy (params) { // 修改政策
  return request({
    url: urls.modifyJourneyPolicy,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyPolicyById (params) { // 根据id获取政策详情
  return request({
    url: urls.getJourneyPolicyById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function removeJourneyPolicy (params) { // 删除政策
  return request({
    url: urls.removeJourneyPolicy,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getJourneyTalentsPage (params) { // 人才分页
  return request({
    url: urls.getJourneyTalentsPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function createJourneyTalents (params) { // 创建人才
  return request({
    url: urls.createJourneyTalents,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyTalents (params) { // 修改人才
  return request({
    url: urls.modifyJourneyTalents,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyTalentsById (params) { // 根据id获取人才详情
  return request({
    url: urls.getJourneyTalentsById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function removeJourneyTalents (params) { // 删除人才
  return request({
    url: urls.removeJourneyTalents,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function displayJourneyTalents (params) { // 显示人才
  return request({
    url: urls.displayJourneyTalents,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function hideJourneyTalents (params) { // 隐藏人才
  return request({
    url: urls.hideJourneyTalents,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getJourneyTalentsMessagePage (params) { // 人才留言分页
  return request({
    url: urls.getJourneyTalentsMessagePage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function removeJourneyTalentsMessage (params) { // 删除人才留言
  return request({
    url: urls.removeJourneyTalentsMessage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getAgricultureRelatedProjectsPage (params) { // 涉农项目分页
  return request({
    url: urls.getAgricultureRelatedProjectsPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function createAgricultureRelatedProjects (params) { // 新增涉农项目
  return request({
    url: urls.createAgricultureRelatedProjects,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyAgricultureRelatedProjects (params) { // 修改涉农项目
  return request({
    url: urls.modifyAgricultureRelatedProjects,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getAgricultureRelatedProjectsById (params) { // 根据id获取涉农项目
  return request({
    url: urls.getAgricultureRelatedProjectsById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function removeAgricultureRelatedProjects (params) { // 删除涉农项目
  return request({
    url: urls.removeAgricultureRelatedProjects,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getJourneyPostPage (params) { // 岗位分页
  return request({
    url: urls.getJourneyPostPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function createJourneyPost (params) { // 创建岗位
  return request({
    url: urls.createJourneyPost,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyPost (params) { // 修改岗位
  return request({
    url: urls.modifyJourneyPost,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyPostById (params) { // 根据id获取岗位详情
  return request({
    url: urls.getJourneyPostById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function removeJourneyPost (params) { // 删除岗位
  return request({
    url: urls.removeJourneyPost,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyPostShowStatus (params) { // 修改岗位状态
  return request({
    url: urls.modifyJourneyPostShowStatus,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getJourneyTalentsEvaluatePage (params) { // 根据id获取人才评价列表
  return request({
    url: urls.getJourneyTalentsEvaluatePage,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getJourneyTalentsScore (params) { // 根据id获取人才服务次数和评价分
  return request({
    url: urls.getJourneyTalentsScore,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function removeJourneyTalentsEvaluate (params) { // 删除热播才评论
  return request({
    url: urls.removeJourneyTalentsEvaluate,
    method: 'post',
    data: {
      ...params
    }
  })
}

