import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@/utils/login'

export function getMemberPage (params) { // 获取会员（C端用户）分页
  return request({
    url: urls.getMemberPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getMemberDetailById (params) { // 根据id获取会员（C端用户）
  return request({
    url: urls.getMemberDetailById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getRedHeartRecordPage (params) { // 获取红心值记录分页
  return request({
    url: urls.getRedHeartRecordPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function createMemberRelLabel (params) { // 给会员打标签
  return request({
    url: urls.createMemberRelLabel,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getMemberRelGroupAndLabel (params) { // 根据会员id获取标签组及标签
  return request({
    url: urls.getMemberRelGroupAndLabel,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getMemberRelLabel (params) { // 根据会员id获取标签
  return request({
    url: urls.getMemberRelLabel,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function removeMemberRelLabel (params) { // 删除标签
  return request({
    url: urls.removeMemberRelLabel,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyRedHeartProductPage (params) { // 分页获取红心商品
  return request({
    url: urls.getJourneyRedHeartProductPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function createJourneyRedHeartProduct (params) { // 创建红心商品
  return request({
    url: urls.createJourneyRedHeartProduct,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function deleteJourneyRedHeartProductById (params) { // 删除获取红心商品
  return request({
    url: urls.deleteJourneyRedHeartProductById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyProductById (params) { // 获取红心商品详情
  return request({
    url: urls.getJourneyProductById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyProductRedeemRecordPage (params) { // 分页获取兑换记录
  return request({
    url: urls.getJourneyProductRedeemRecordPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyRedHeartProductById (params) { // 修改红心商品
  return request({
    url: urls.modifyJourneyRedHeartProductById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyRedHeartProductShowStatusById (params) { // 修改红心商品展示状态
  return request({
    url: urls.modifyJourneyRedHeartProductShowStatusById,
    method: 'post',
    data: {
      ...params
    }
  })
}
