import request from '../index'
import { getGlobalParams } from '@/utils/login'
import { urls } from '../urls'

export function createMemberLabelGroup (params) {
  // 创建标签组
  return request({
    url: urls.createMemberLabelGroup,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function modifyMemberLabelGroup (params) {
  // 编辑标签组
  return request({
    url: urls.modifyMemberLabelGroup,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function switchMemberLabelGroupSequence (params) {
  // 标签组顺序调换
  return request({
    url: urls.switchMemberLabelGroupSequence,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function validateMemberLabelGroupName (params) {
  // 验证标签组名
  return request({
    url: urls.validateMemberLabelGroupName,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getMemberLabelGroupById (params) {
  // 获取标签组
  return request({
    url: urls.getMemberLabelGroupById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId')
    }
  })
}

export function getMemberLabelGroupListByOrgId (params) {
  // 根据组织id获取标签组
  return request({
    url: urls.getMemberLabelGroupListByOrgId,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId')
    }
  })
}

export function getMemberLabelGroupPage (params) {
  // 获取标签组分页
  return request({
    url: urls.getMemberLabelGroupPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getMemberLabelPage (params) {
  // 获取会员标签分页
  return request({
    url: urls.getMemberLabelPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function modifyMemberLabelGroupStatus (params) {
  // 修改会员标签组状态
  return request({
    url: urls.modifyMemberLabelGroupStatus,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function createMemberLabel (params) {
  // 创建会员标签
  return request({
    url: urls.createMemberLabel,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function modifyMemberLabel (params) {
  // 修改会员标签
  return request({
    url: urls.modifyMemberLabel,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function modifyMemberLabelStatus (params) {
  // 修改会员标签状态
  return request({
    url: urls.modifyMemberLabelStatus,
    method: 'post',
    data: {
      // orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function findCouponByPage (params) {
  // 分页获取优惠券列表
  return request({
    url: urls.findCouponByPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getMemberLabelById (params) {
  // 根据id获取会员标签详情
  return request({
    url: urls.getMemberLabelById,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getGroupLabelByOrg () {
  // 获取标签组及组里的标签
  return request({
    url: urls.getGroupLabelByOrg,
    method: 'post',
    data: {}
  })
}

export function getManualGroupLabelByOrg () {
  // 获取标签组及组里的标签（仅手动标签）
  return request({
    url: urls.getManualGroupLabelByOrg,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId')
    }
  })
}
