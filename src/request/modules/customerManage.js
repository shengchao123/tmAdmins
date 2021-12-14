import request from '../index'
import { getGlobalParams } from '@/utils/login'
import { urls } from '../urls'

// 分页获取公开客群 /crm/memberGroup/getPublicMemberGroupPage
export function getPublicMemberGroupPage (params) {
  return request({
    url: urls.getPublicMemberGroupPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
// 获取会员分布
export function getMemberGroupSpread (params) {
  return request({
    url: urls.getMemberGroupSpread,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 修改客群收藏状态 /crm/memberGroup/modifyMemberGroupFavoritesStatus
export function modifyMemberGroupFavoritesStatus (params) {
  return request({
    url: urls.modifyMemberGroupFavoritesStatus,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 修改客群状态 /crm/memberGroup/modifyMemberGroupStatus
export function modifyMemberGroupStatus (params) {
  return request({
    url: urls.modifyMemberGroupStatus,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 获取客群详情 /crm/memberGroup/getMemberGroupDetail
export function getMemberGroupDetail (params) {
  return request({
    url: urls.getMemberGroupDetail,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

// 获取客群信息 /crm/memberGroup/getMemberGroup
export function getMemberGroup (params) {
  return request({
    url: urls.getMemberGroup,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 分页获取客群下会员列表 /crm/memberGroup/getMembersPage
export function getMembersPage (params) {
  return request({
    url: urls.getMembersPage,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 分页查询客群相关活动统计信息(营销记录) /activity/activityStatistics/findGuestGroupActivityStatisticsByPage
export function findGuestGroupActivityStatisticsByPage (params) {
  return request({
    url: urls.findGuestGroupActivityStatisticsByPage,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 分页获取我创建的客群 /crm/memberGroup/getMyMemberGroupCreatedPage
export function getMyMemberGroupCreatedPage (params) {
  return request({
    url: urls.getMyMemberGroupCreatedPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

// 分页获取我收藏的客群 /crm/memberGroup/getMyMemberGroupFavoritesPage
export function getMyMemberGroupFavoritesPage (params) {
  return request({
    url: urls.getMyMemberGroupFavoritesPage,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 创建我的客群 /crm/memberGroup/createMemberGroup
export function createMemberGroup (params) {
  return request({
    url: urls.createMemberGroup,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

// 修改我的客群 /crm/memberGroup/modifyMemberGroup
export function modifyMemberGroup (params) {
  return request({
    url: urls.modifyMemberGroup,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

// 验证客群名称是否重复 /crm/memberGroup/verificationMemberGroupName
export function verificationMemberGroupName (params) {
  return request({
    url: urls.verificationMemberGroupName,
    method: 'post',
    data: {
      ...params
    }
  })
}

// 根据关键字获取会员标签列表 /crm/memberLabelManagement/getMemberLabelListByKeyword
export function getMemberLabelListByKeyword (params) {
  return request({
    url: urls.getMemberLabelListByKeyword,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

// 查询用户给客群查询搜索框使用使用 /user/user/getListByKeyword
export function getListByKeyword (params) {
  return request({
    url: urls.getListByKeyword,
    method: 'post',
    data: {
      ...params
    }
  })
}
