import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@u/login'

export function findProductClassification (params) { // 创建产品
  return request({
    url: urls.findProductClassification,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function createJourneyProduct (params) { // 创建产品
  return request({
    url: urls.createJourneyProduct,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function deleteJourneyProductById (params) { // 删除产品
  return request({
    url: urls.deleteJourneyProductById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyProductByIdReq (params) { // 获取产品详情
  return request({
    url: urls.getJourneyProductByIdReq,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyProductPage (params) { // 分页获取产品
  return request({
    url: urls.getJourneyProductPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyProductById (params) { // 修改产品
  return request({
    url: urls.modifyJourneyProductById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyProductShowStatusById (params) { // 修改产品展示状态
  return request({
    url: urls.modifyJourneyProductShowStatusById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function deleteJourneyMerchantBoothById (params) { // 删除商家展位
  return request({
    url: urls.deleteJourneyMerchantBoothById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyMerchantBoothById (params) { // 获取商家展位详情
  return request({
    url: urls.getJourneyMerchantBoothById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyMerchantBoothPage (params) { // 分页获取商家展位
  return request({
    url: urls.getJourneyMerchantBoothPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyMerchantBoothById (params) { // 编辑商家展位
  return request({
    url: urls.modifyJourneyMerchantBoothById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyMerchantBoothShowStatusById (params) { // 修改商家展位展示状态
  return request({
    url: urls.modifyJourneyMerchantBoothShowStatusById,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function deleteJourneyPlayCustomizationById (params) { // 删除游玩定制
  return request({
    url: urls.deleteJourneyPlayCustomizationById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyPlayCustomizationById (params) { // 获取游玩定制详情
  return request({
    url: urls.getJourneyPlayCustomizationById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyPlayCustomizationOrdersPage (params) { // 分页获取游玩定制接单商家信息
  return request({
    url: urls.getJourneyPlayCustomizationOrdersPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyPlayCustomizationPage (params) { // 分页获取游玩定制
  return request({
    url: urls.getJourneyPlayCustomizationPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyPlayCustomizationById (params) { // 修改游玩定制
  return request({
    url: urls.modifyJourneyPlayCustomizationById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyPlayCustomizationShowStatusById (params) { // 修改游玩定制展示状态
  return request({
    url: urls.modifyJourneyPlayCustomizationShowStatusById,
    method: 'post',
    data: {
      ...params
    }
  })
}
