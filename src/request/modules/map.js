import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@u/login'

export function findJourneyItinerarySignUpPage (params) { // 行程单
  return request({
    url: urls.findJourneyItinerarySignUpPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function findJourneyItinerarySignInPage (params) { // 行程单
  return request({
    url: urls.findJourneyItinerarySignInPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function findJourneyItineraryPage (params) { // 行程单
  return request({
    url: urls.findJourneyItineraryPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function createJourneyPoint (params) { // 新增点位
  return request({
    url: urls.createJourneyPoint,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function deleteJourneyPointById (params) { // 删除点位
  return request({
    url: urls.deleteJourneyPointById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyPointById (params) { // 获取点位详情
  return request({
    url: urls.getJourneyPointById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyPointList (params) { // 获取点位列表
  return request({
    url: urls.getJourneyPointList,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyPointPage (params) { // 分页获取点位
  return request({
    url: urls.getJourneyPointPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyPoint (params) { // 修改点位
  return request({
    url: urls.modifyJourneyPoint,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function createJourneyLine (params) { // 新增线路
  return request({
    url: urls.createJourneyLine,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function deleteJourneyLineById (params) { // 删除线路
  return request({
    url: urls.deleteJourneyLineById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyLineShowStatusById (params) { // 修改线路展示状态
  return request({
    url: urls.modifyJourneyLineShowStatusById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyLineById (params) { // 获取线路详情
  return request({
    url: urls.getJourneyLineById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyLineList (params) { // 获取线路列表
  return request({
    url: urls.getJourneyLineList,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyLinePage (params) { // 分页获取线路
  return request({
    url: urls.getJourneyLinePage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyLine (params) { // 修改线路
  return request({
    url: urls.modifyJourneyLine,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getItineraryEvaluationInfoById (params) { // 根据id查询询行程评价详细信息
  return request({
    url: urls.getItineraryEvaluationInfoById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getItineraryEvaluationPage (params) { // 分页查询行程评价信息
  return request({
    url: urls.getItineraryEvaluationPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getItineraryEvaluationStatisticsInfoById (params) { // 根据询行程评价ID查询询行程评价热度统计信息
  return request({
    url: urls.getItineraryEvaluationStatisticsInfoById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyItineraryEvaluationStatus (params) { // 修改询行程评价状态(显示、隐藏、删除)
  return request({
    url: urls.modifyItineraryEvaluationStatus,
    method: 'post',
    data: {
      ...params
    }
  })
}
