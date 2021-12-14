import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@u/login'

export function createJourneyAlliance (params) { // 新建联盟
  return request({
    url: urls.createJourneyAlliance,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyAllianceById (params) { // 根据id获取联盟信息
  return request({
    url: urls.getJourneyAllianceById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyAllianceList (params) { // 获取联盟列表
  return request({
    url: urls.getJourneyAllianceList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyAlliancePage (params) { // 分页获取联盟列表
  return request({
    url: urls.getJourneyAlliancePage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyAlliance (params) { // 修改联盟
  return request({
    url: urls.modifyJourneyAlliance,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function removeJourneyAlliance (params) { // 删除联盟
  return request({
    url: urls.removeJourneyAlliance,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function createJourneyKeyWork (params) { // 新建重点工作
  return request({
    url: urls.createJourneyKeyWork,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyKeyWorkById (params) { // 根据id获取重点工作
  return request({
    url: urls.getJourneyKeyWorkById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyKeyWorkPage (params) { // 分页获取重点工作
  return request({
    url: urls.getJourneyKeyWorkPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyKeyWork (params) { // 编辑重点工作
  return request({
    url: urls.modifyJourneyKeyWork,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function modifyJourneyKeyWorkStatus (params) { // 修改重点工作状态
  return request({
    url: urls.modifyJourneyKeyWorkStatus,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function removeJourneyKeyWork (params) { // 删除重点工作
  return request({
    url: urls.removeJourneyKeyWork,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getJourneyRegionsList (params) { // 获取行政区域列表
  return request({
    url: urls.getJourneyRegionsList,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function modifyJourneyPointShowStatusById (params) { // 修改点位展示状态
  return request({
    url: urls.modifyJourneyPointShowStatusById,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function getGraphicPage (params) { // 分页获取风采图文信息
  return request({
    url: urls.getGraphicPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function createGraphic (params) { // 创建风采图文信息
  return request({
    url: urls.createGraphic,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function deleteGraphicById (params) { // 删除风采图文
  return request({
    url: urls.deleteGraphicById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getGraphicById (params) { // 获取风采图文详情
  return request({
    url: urls.getGraphicById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyGraphic (params) { // 修改风采图文
  return request({
    url: urls.modifyGraphic,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findOrganizationList (params) { // 获取联盟组织列表
  return request({
    url: urls.findOrganizationList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function createJourneyActivity (params) { // 创建活动
  return request({
    url: urls.createJourneyActivity,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyActivityById (params) { // 根据id获取活动
  return request({
    url: urls.getJourneyActivityById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyActivityManagementPage (params) { // 获取活动分页
  return request({
    url: urls.getJourneyActivityManagementPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyActivitySignUpList (params) { // 获取报名单
  return request({
    url: urls.getJourneyActivitySignUpList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyActivity (params) { // 修改活动
  return request({
    url: urls.modifyJourneyActivity,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function removeJourneyActivity (params) { // 删除活动
  return request({
    url: urls.removeJourneyActivity,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyAnnouncementPage (params) { // 获取公告管理分页
  return request({
    url: urls.getJourneyAnnouncementPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getJourneyAnnouncementById (params) { // 根据id获取公告
  return request({
    url: urls.getJourneyAnnouncementById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function removeJourneyAnnouncement (params) { // 删除公告
  return request({
    url: urls.removeJourneyAnnouncement,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function createJourneyAnnouncement (params) { // 创建公告
  return request({
    url: urls.createJourneyAnnouncement,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getSystemGroupMemberLabelList (params) { // 获取系统组标签列表
  return request({
    url: urls.getSystemGroupMemberLabelList,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function createCommunityNoteRecommendRecord (params) { // 新增推荐记录(新增、取消推荐)
  return request({
    url: urls.createCommunityNoteRecommendRecord,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getCommunityNoteInfoById (params) { // 根据id查询笔记详细信息
  return request({
    url: urls.getCommunityNoteInfoById,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getCommunityNotePage (params) { // 分页查询笔记信息
  return request({
    url: urls.getCommunityNotePage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function getCommunityNoteStatisticsInfoById (params) { // 根据笔记ID查询笔记热度统计信息
  return request({
    url: urls.getCommunityNoteStatisticsInfoById,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyCommunityNoteStatus (params) { // 修改笔记状态(显示、隐藏、删除)
  return request({
    url: urls.modifyCommunityNoteStatus,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getCommunityNoteCommentDetailPage (params) { // 分页获取社区笔记评论详情
  return request({
    url: urls.getCommunityNoteCommentDetailPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getCommunityNoteCommentDetail (params) { // 获取社区笔记评论详情
  return request({
    url: urls.getCommunityNoteCommentDetail,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getCommunityNoteCommentPage (params) { // 分页获取社区笔记评论
  return request({
    url: urls.getCommunityNoteCommentPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function removeCommunityNoteComment (params) { // 删除社区笔记评论
  return request({
    url: urls.removeCommunityNoteComment,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function modifyJourneyActivityStyle (params) { // 修改活动风采
  return request({
    url: urls.modifyJourneyActivityStyle,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getJourneyProductList (params) { // 获取产品列表
  return request({
    url: urls.getJourneyProductList,
    method: 'post',
    data: {
      ...params
    }
  })
}
