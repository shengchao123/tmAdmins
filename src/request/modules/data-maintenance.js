import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@/utils/login'

export function getCockpitData (params) { // 获取驾驶舱数据
  return request({
    url: urls.getCockpitData,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function saveCockpitData (params) { // 保存驾驶舱数据
  return request({
    url: urls.saveCockpitData,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
