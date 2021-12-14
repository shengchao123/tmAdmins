
export const fileHost = 'https://hzslzx.oss-cn-hangzhou.aliyuncs.com/' // 文件显示地址
export const officePreviewHost = 'http://view.officeapps.live.com/op/view.aspx?src=' + fileHost

export const aliOssConfig = {
  region: 'oss-cn-hangzhou',
  // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
  accessKeyId: 'LTAI4GDGpRzW9FYmSkdtPU3h',
  accessKeySecret: 'tCwBOjdC8YHUDuG8020eAKi3yqvzeS',
  bucket: 'hzslzx'
}
export const urls = {
  // 红心商城管理
  getJourneyRedHeartProductPage: '/linanJourney/journeyRedHeartProductManagement/getJourneyProductPage',
  createJourneyRedHeartProduct: '/linanJourney/journeyRedHeartProductManagement/createJourneyRedHeartProduct',
  deleteJourneyRedHeartProductById: '/linanJourney/journeyRedHeartProductManagement/deleteJourneyRedHeartProductById',
  getJourneyProductById: '/linanJourney/journeyRedHeartProductManagement/getJourneyProductById',
  getJourneyProductRedeemRecordPage: '/linanJourney/journeyRedHeartProductManagement/getJourneyProductRedeemRecordPage',
  modifyJourneyRedHeartProductById: '/linanJourney/journeyRedHeartProductManagement/modifyJourneyProductById',
  modifyJourneyRedHeartProductShowStatusById: '/linanJourney/journeyRedHeartProductManagement/modifyJourneyProductShowStatusById',

  // 党建日管理
  exportJourneyCoConstructionUnitPartyStatistics: '/excel/export/exportJourneyCoConstructionUnitPartyStatistics',
  findJourneyCoConstructionUnitPartyStatisticsPage: '/linanJourney/JourneyCoConstructionUnitPartyStatistics/findJourneyCoConstructionUnitPartyStatisticsPage',
  insertJourneyCoConstructionUnitPartyStatistics: '/linanJourney/JourneyCoConstructionUnitPartyStatistics/insertJourneyCoConstructionUnitPartyStatistics',
  modifyJourneyCoConstructionUnitPartyStatistics: '/linanJourney/JourneyCoConstructionUnitPartyStatistics/modifyJourneyCoConstructionUnitPartyStatistics',
  // 单位管理
  exportJourneyItineraryList: '/excel/export/exportJourneyItineraryList',
  findJourneyItinerarySignUpPage: '/linanJourney/journeyItineraryManager/findJourneyItinerarySignUpPage',
  findJourneyItinerarySignInPage: '/linanJourney/journeyItineraryManager/findJourneyItinerarySignInPage',
  // 单位管理
  findJourneyItineraryPage: '/linanJourney/journeyItineraryManager/findJourneyItineraryPage',
  findRankingJourneyCommunityOwnerList: '/linanJourney/journeyCommunityOwnerManagement/findRankingJourneyCommunityOwnerList',
  batchUpdateJourneyCommunityOwnerRanking: '/linanJourney/journeyCommunityOwnerManagement/batchUpdateJourneyCommunityOwnerRanking',
  getCommunityNotePage: '/community/communityNoteManagement/getCommunityNotePage',
  createJourneyResourceSharing: '/community/communityNoteManagement/createJourneyResourceSharing',
  communitygetCommunityNoteCommentPage: '/community/communityNoteCommentManagement/getCommunityNoteCommentPage',
  insertJourneyCommunityPartyGraphic: '/linanJourney/journeyCommunityPartyManagement/insertJourneyCommunityPartyGraphic',
  updateJourneyCommunityPartyGraphic: '/linanJourney/journeyCommunityPartyManagement/updateJourneyCommunityPartyGraphic',
  updateOrgServiceHotline: '/organization/org/updateOrgServiceHotline',
  findRankingJourneyCommunityStewardList: '/linanJourney/journeyCommunityStewardManagement/findRankingJourneyCommunityStewardList',
  batchUpdateJourneyCommunityStewardRanking: '/linanJourney/journeyCommunityStewardManagement/batchUpdateJourneyCommunityStewardRanking',
  findJourneyCommunityStewardList: '/linanJourney/journeyCommunityStewardManagement/findJourneyCommunityStewardList',
  updateJourneyCommunitySteward: '/linanJourney/journeyCommunityStewardManagement/updateJourneyCommunitySteward',
  updateJourneyCommunityBuilding: '/linanJourney/journeyCommunityBuildingManagement/updateJourneyCommunityBuilding',
  findJourneyCommunityBuildingList: '/linanJourney/journeyCommunityBuildingManagement/findJourneyCommunityBuildingList',
  findRankingJourneyCommunityBuildingList: '/linanJourney/journeyCommunityBuildingManagement/findRankingJourneyCommunityBuildingList',
  batchUpdateJourneyCommunityBuildingRanking: '/linanJourney/journeyCommunityBuildingManagement/batchUpdateJourneyCommunityBuildingRanking',
  // 单位管理
  findJourneyCommunityPropertyList: '/linanJourney/journeyCommunityPropertyManagement/findJourneyCommunityPropertyList',
  updateJourneyCommunityProperty: '/linanJourney/journeyCommunityPropertyManagement/updateJourneyCommunityProperty',
  findJourneyCommunityOwnerList: '/linanJourney/journeyCommunityOwnerManagement/findJourneyCommunityOwnerList',
  insertJourneyCommunityOwner: '/linanJourney/journeyCommunityOwnerManagement/insertJourneyCommunityOwner',
  updateJourneyCommunityOwner: '/linanJourney/journeyCommunityOwnerManagement/updateJourneyCommunityOwner',
  insertJourneyCommunityAlliance: '/linanJourney/journeyCommunityAllianceManagement/insertJourneyCommunityAlliance',
  updateJourneyCommunityAlliance: '/linanJourney/journeyCommunityAllianceManagement/updateJourneyCommunityAlliance',
  findJourneyCommunityAllianceList: '/linanJourney/journeyCommunityAllianceManagement/findJourneyCommunityAllianceList',
  batchUpdateJourneyCommunityPartyRanking: '/linanJourney/journeyCommunityPartyManagement/batchUpdateJourneyCommunityPartyRanking',
  findRankingJourneyCommunityPartyList: '/linanJourney/journeyCommunityPartyManagement/findRankingJourneyCommunityPartyList',
  insertJourneyCommunityParty: '/linanJourney/journeyCommunityPartyManagement/insertJourneyCommunityParty',
  findJourneyCommunityPartyList: '/linanJourney/journeyCommunityPartyManagement/findJourneyCommunityPartyList',
  updateJourneyCommunityParty: '/linanJourney/journeyCommunityPartyManagement/updateJourneyCommunityParty',
  findJourneyCommunityPage: '/linanJourney/journeyCommunityManagement/findJourneyCommunityPage',
  // 报事
  findJourneyCommunityProblemPage: '/linanJourney/journeyCommunityProblemManagement/findJourneyCommunityProblemPage',
  modifyJourneyCommunityProblemStatus: '/linanJourney/journeyCommunityProblemManagement/modifyJourneyCommunityProblemStatus',
  findJourneyCommunityProblemById: '/linanJourney/journeyCommunityProblemManagement/findJourneyCommunityProblemById',
  deleteJourneyCommunityProblem: '/linanJourney/journeyCommunityProblemManagement/deleteJourneyCommunityProblem',
  // 留言管理
  getJourneyCommunityMessagePage: '/linanJourney/journeyCommunityMessageManagement/getJourneyCommunityMessagePage',
  removeJourneyCommunityMessage: '/linanJourney/journeyCommunityMessageManagement/removeJourneyCommunityMessage',
  replyJourneyCommunityMessage: '/linanJourney/journeyCommunityMessageManagement/replyJourneyCommunityMessage',
  // 微心愿管理
  createJourneyCommunityWish: '/linanJourney/journeyCommunityWishManagement/createJourneyCommunityWish',
  deleteJourneyCommunityWish: '/linanJourney/journeyCommunityWishManagement/deleteJourneyCommunityWish',
  getJourneyCommunityWish: '/linanJourney/journeyCommunityWishManagement/getJourneyCommunityWish',
  getJourneyCommunityWishPage: '/linanJourney/journeyCommunityWishManagement/getJourneyCommunityWishPage',
  modifyJourneyCommunityWish: '/linanJourney/journeyCommunityWishManagement/modifyJourneyCommunityWish',

  findJourneyCommunityList: '/linanJourney/journeyCommunityManagement/findJourneyCommunityList',

  batchUpdateJourneyHelperProjectRanking: '/linanJourney/journeyHelperProjectManagement/batchUpdateJourneyHelperProjectRanking',
  insertJourneyAdvertisement: '/linanJourney/journeyAdvertisementManagement/insertJourneyAdvertisement',
  updateJourneyAdvertisement: '/linanJourney/journeyAdvertisementManagement/updateJourneyAdvertisement',
  deleteJourneyAdvertisement: '/linanJourney/journeyAdvertisementManagement/deleteJourneyAdvertisement',
  checkJourneyAdvertisementByTime: '/linanJourney/journeyAdvertisementManagement/checkJourneyAdvertisementByTime',
  findJourneyAdvertisementById: '/linanJourney/journeyAdvertisementManagement/findJourneyAdvertisementById',

  findJourneyAdvertisementsByPage: '/linanJourney/journeyAdvertisementManagement/findJourneyAdvertisementsByPage',
  getFinishJourneyHelperProjectList: '/linanJourney/journeyHelperProjectManagement/getFinishJourneyHelperProjectList', // 修改项目排名
  getRankingJourneyHelperProjectList: '/linanJourney/journeyHelperProjectManagement/getRankingJourneyHelperProjectList', // 已排名列表
  // 数据维护
  getCockpitData: '/linanJourney/cockpitDataManagement/getCockpitData', // 获取驾驶舱数据
  saveCockpitData: '/linanJourney/cockpitDataManagement/saveCockpitData', // 保存驾驶舱数据
  // 好帮手-共建单位管理
  createJourneyCoConstructionUnit: '/linanJourney/journeyCoConstructionUnitManagement/createJourneyCoConstructionUnit', // 新增共建单位管理
  getJourneyCoConstructionUnitPage: '/linanJourney/journeyCoConstructionUnitManagement/getJourneyCoConstructionUnitPage', // 分页查询共建单位管理
  getJourneyCoConstructionUnitPointRecord: '/linanJourney/journeyCoConstructionUnitManagement/getJourneyCoConstructionUnitPointRecord', // 积分明细
  findCommunityOrganizationTree: '/organization/org/findCommunityOrganizationTree', // 获取街道社区组织树
  findUnitOrganizationList: '/organization/org/findUnitOrganizationList', // 获取共建单位组织列表
  findPlotOrganizationList: '/organization/org/findPlotOrganizationList', // 获取共建单位组织列表
  modifyJourneyCoConstructionUnit: '/linanJourney/journeyCoConstructionUnitManagement/modifyJourneyCoConstructionUnit', // 修改共建单位管理
  modifyClearJourneyCoConstructionUnit: '/linanJourney/journeyCoConstructionUnitManagement/modifyClearJourneyCoConstructionUnit', // 批量数据清空
  getClearJourneyCoConstructionUnitByPage: '/linanJourney/journeyCoConstructionUnitManagement/getClearJourneyCoConstructionUnitByPage', // 分页数据清空记录
  // 好帮手-社区项目管理
  createJourneyHelperProject: '/linanJourney/journeyHelperProjectManagement/createJourneyHelperProject', // 新增社区项目管理
  deleteJourneyHelperProject: '/linanJourney/journeyHelperProjectManagement/deleteJourneyHelperProject', // 删除社区项目管理
  getJourneyHelperProject: '/linanJourney/journeyHelperProjectManagement/getJourneyHelperProject', // 查询社区项目管理详情
  getJourneyHelperProjectPage: '/linanJourney/journeyHelperProjectManagement/getJourneyHelperProjectPage', // 分页查询社区项目管理
  modifyJourneyHelperProject: '/linanJourney/journeyHelperProjectManagement/modifyJourneyHelperProject', // 修改社区项目管理

  // 城乡融合
  // 优选产品管理
  findProductClassification: '/setting/district/findProductClassification', // 产品分类
  createJourneyProduct: '/linanJourney/journeyProductManagement/createJourneyProduct', // 创建产品
  deleteJourneyProductById: '/linanJourney/journeyProductManagement/deleteJourneyProductById', // 删除产品
  getJourneyProductByIdReq: '/linanJourney/journeyProductManagement/getJourneyProductByIdReq', // 获取产品详情
  getJourneyProductList: '/linanJourney/journeyProductManagement/getJourneyProductList', // 获取产品列表
  getJourneyProductPage: '/linanJourney/journeyProductManagement/getJourneyProductPage', // 分页获取产品
  modifyJourneyProductById: '/linanJourney/journeyProductManagement/modifyJourneyProductById', // 修改产品
  modifyJourneyProductShowStatusById: '/linanJourney/journeyProductManagement/modifyJourneyProductShowStatusById', // 修改产品展示状态
  // 商家展位管理
  deleteJourneyMerchantBoothById: '/linanJourney/journeyMerchantBoothManagement/deleteJourneyMerchantBoothById', // 删除商家展位
  getJourneyMerchantBoothById: '/linanJourney/journeyMerchantBoothManagement/getJourneyMerchantBoothById', // 获取商家展位详情
  getJourneyMerchantBoothPage: '/linanJourney/journeyMerchantBoothManagement/getJourneyMerchantBoothPage', // 分页获取商家展位
  modifyJourneyMerchantBoothById: '/linanJourney/journeyMerchantBoothManagement/modifyJourneyMerchantBoothById', // 编辑商家展位
  modifyJourneyMerchantBoothShowStatusById: '/linanJourney/journeyMerchantBoothManagement/modifyJourneyMerchantBoothShowStatusById', // 修改商家展位展示状态
  // 定制管理
  deleteJourneyPlayCustomizationById: '/linanJourney/journeyPlayCustomizationManagement/deleteJourneyPlayCustomizationById', // 删除游玩定制
  getJourneyPlayCustomizationById: '/linanJourney/journeyPlayCustomizationManagement/getJourneyPlayCustomizationById', // 获取游玩定制详情
  getJourneyPlayCustomizationOrdersPage: '/linanJourney/journeyPlayCustomizationManagement/getJourneyPlayCustomizationOrdersPage', // 分页获取游玩定制接单商家信息
  getJourneyPlayCustomizationPage: '/linanJourney/journeyPlayCustomizationManagement/getJourneyPlayCustomizationPage', // 分页获取游玩定制
  modifyJourneyPlayCustomizationById: '/linanJourney/journeyPlayCustomizationManagement/modifyJourneyPlayCustomizationById', // 修改游玩定制
  modifyJourneyPlayCustomizationShowStatusById: '/linanJourney/journeyPlayCustomizationManagement/modifyJourneyPlayCustomizationShowStatusById', // 修改游玩定制展示状态

  // 政策管理
  getJourneyPolicyPage: '/linanJourney/journeyPolicyManagement/getJourneyPolicyPage', // 政策分页
  createJourneyPolicy: '/linanJourney/journeyPolicyManagement/createJourneyPolicy', // 新增政策
  modifyJourneyPolicy: '/linanJourney/journeyPolicyManagement/modifyJourneyPolicy', // 修改政策
  getJourneyPolicyById: '/linanJourney/journeyPolicyManagement/getJourneyPolicyById', // 根据id获取政策详情
  removeJourneyPolicy: '/linanJourney/journeyPolicyManagement/removeJourneyPolicy', // 删除政策

  // 人才管理
  getJourneyTalentsPage: '/linanJourney/journeyTalentsManagement/getJourneyTalentsPage', // 人才分页
  createJourneyTalents: '/linanJourney/journeyTalentsManagement/createJourneyTalents', // 创建人才
  modifyJourneyTalents: '/linanJourney/journeyTalentsManagement/modifyJourneyTalents', // 修改人才
  getJourneyTalentsById: '/linanJourney/journeyTalentsManagement/getJourneyTalentsById', // 根据id获取人才详情
  removeJourneyTalents: '/linanJourney/journeyTalentsManagement/removeJourneyTalents', // 删除人才
  displayJourneyTalents: '/linanJourney/journeyTalentsManagement/displayJourneyTalents', // 显示人才
  hideJourneyTalents: '/linanJourney/journeyTalentsManagement/hideJourneyTalents', // 隐藏人才
  exportTalentsList: '/excel/export/exportTalentsList', //导出人才列表
  getJourneyTalentsEvaluatePage: '/linanJourney/journeyTalentsManagement/getJourneyTalentsEvaluatePage',//根据id获取人才评价列表
  getJourneyTalentsScore: '/linanJourney/journeyTalentsManagement/getJourneyTalentsScore',//根据id获取人才服务次数和评价分
  removeJourneyTalentsEvaluate: '/linanJourney/journeyTalentsManagement/removeJourneyTalentsEvaluate',//删除人才评价

  // 无感直补管理
  getAgricultureRelatedProjectsPage: '/linanJourney/journeyAgricultureRelatedProjectsManagement/getAgricultureRelatedProjectsPage', // 涉农项目分页
  createAgricultureRelatedProjects: '/linanJourney/journeyAgricultureRelatedProjectsManagement/createAgricultureRelatedProjects', // 新增涉农项目
  modifyAgricultureRelatedProjects: '/linanJourney/journeyAgricultureRelatedProjectsManagement/modifyAgricultureRelatedProjects', // 修改涉农项目
  getAgricultureRelatedProjectsById: '/linanJourney/journeyAgricultureRelatedProjectsManagement/getAgricultureRelatedProjectsById', // 根据id获取涉农项目
  removeAgricultureRelatedProjects: '/linanJourney/journeyAgricultureRelatedProjectsManagement/removeAgricultureRelatedProjects', // 删除涉农项目
  // 留言管理
  getJourneyTalentsMessagePage: '/linanJourney/journeyTalentsMessageManagement/getJourneyTalentsMessagePage', // 人才留言分页
  removeJourneyTalentsMessage: '/linanJourney/journeyTalentsMessageManagement/removeJourneyTalentsMessage', // 删除人才留言
  // 联盟纳贤
  getJourneyPostPage: '/linanJourney/journeyPostManagement/getJourneyPostPage', // 岗位分页
  createJourneyPost: '/linanJourney/journeyPostManagement/createJourneyPost', // 创建岗位
  modifyJourneyPost: '/linanJourney/journeyPostManagement/modifyJourneyPost', // 修改岗位
  getJourneyPostById: '/linanJourney/journeyPostManagement/getJourneyPostById', // 根据id获取岗位详情
  removeJourneyPost: '/linanJourney/journeyPostManagement/removeJourneyPost', // 删除岗位
  modifyJourneyPostShowStatus: '/linanJourney/journeyPostManagement/modifyJourneyPostShowStatus', // 修改岗位状态
  // 会员标签
  validateMemberLabelGroupName: '/crm/memberLabelGroupManagement/validateMemberLabelGroupName', // 验证标签组名
  createMemberLabelGroup: '/crm/memberLabelGroupManagement/createMemberLabelGroup', // 创建标签组
  modifyMemberLabelGroup: '/crm/memberLabelGroupManagement/modifyMemberLabelGroup', // 编辑标签组
  getMemberLabelGroupById: '/crm/memberLabelGroupManagement/getMemberLabelGroupById', // 根据id获取标签组
  getMemberLabelGroupListByOrgId: '/crm/memberLabelGroupManagement/getMemberLabelGroupListByOrgId', // 根据顶级组织id获取标签组
  getMemberLabelGroupPage: '/crm/memberLabelGroupManagement/getMemberLabelGroupPage', // 获取标签组分页
  getMemberLabelPage: '/crm/memberLabelManagement/getMemberLabelPage', // 获取会员标签分页
  modifyMemberLabelGroupStatus: '/crm/memberLabelGroupManagement/modifyMemberLabelGroupStatus', // 修改会员标签组状态
  createMemberLabel: '/crm/memberLabelManagement/createMemberLabel', // 创建会员标签
  modifyMemberLabel: '/crm/memberLabelManagement/modifyMemberLabel', // 修改会员标签
  modifyMemberLabelStatus: '/crm/memberLabelManagement/modifyMemberLabelStatus', // 修改会员标签状态
  switchMemberLabelGroupSequence: '/crm/memberLabelGroupManagement/switchMemberLabelGroupSequence',
  findCouponByPage: '/activity/coupon/findCouponByPage', // 分页获取优惠券列表
  getMemberLabelById: '/crm/memberLabelManagement/getMemberLabelById', // 根据id获取会员标签详情
  getGroupLabelByOrg: '/crm/memberLabelManagement/getGroupLabelByOrg', // 获取标签组及组里的标签
  getManualGroupLabelByOrg: '/crm/memberLabelManagement/getManualGroupLabelByOrg', // 获取标签组及组里的标签（仅手动标签）

  // 客群管理
  getPublicMemberGroupPage: '/crm/memberGroup/getPublicMemberGroupPage',
  modifyMemberGroupFavoritesStatus: '/crm/memberGroup/modifyMemberGroupFavoritesStatus',
  getMemberGroupDetail: '/crm/memberGroup/getMemberGroupDetail',
  getMembersPage: '/crm/memberGroup/getMembersPage',
  findGuestGroupActivityStatisticsByPage: '/activity/activityStatistics/findGuestGroupActivityStatisticsByPage',
  getMyMemberGroupCreatedPage: '/crm/memberGroup/getMyMemberGroupCreatedPage',
  createMemberGroup: '/crm/memberGroup/createMemberGroup',
  verificationMemberGroupName: '/crm/memberGroup/verificationMemberGroupName',
  getListByKeyword: '/user/user/getListByKeyword',
  getMyMemberGroupFavoritesPage: '/crm/memberGroup/getMyMemberGroupFavoritesPage',
  getMemberGroup: '/crm/memberGroup/getMemberGroup',
  modifyMemberGroup: '/crm/memberGroup/modifyMemberGroup',
  modifyMemberGroupStatus: '/crm/memberGroup/modifyMemberGroupStatus',
  getMemberLabelListByKeyword: '/crm/memberLabelManagement/getMemberLabelListByKeyword',

  // ------------ 用户信息
  getMemberDetailById: '/crm/memberManagement/getMemberDetailById', // 根据id获取会员（C端用户）
  getMemberPage: '/crm/memberManagement/getMemberPage', // 获取会员（C端用户）分页
  getRedHeartRecordPage: '/linanJourney/journeyMemberRedHeartRecordManagement/getRedHeartRecordPage', // 获取红心值记录分页
  createMemberRelLabel: '/crm/memberRelLabelManagement/createMemberRelLabel', // 给会员打标签
  getMemberRelGroupAndLabel: '/crm/memberRelLabelManagement/getMemberRelGroupAndLabel', // 根据会员id获取标签组及标签
  getMemberRelLabel: '/crm/memberRelLabelManagement/getMemberRelLabel', // 根据会员id获取标签
  removeMemberRelLabel: '/crm/memberRelLabelManagement/removeMemberRelLabel', // 删除标签

  // ------------ 评价管理
  getItineraryEvaluationInfoById: '/linanJourney/journeyItineraryEvaluationManagement/getItineraryEvaluationInfoById', // 根据id查询询行程评价详细信息
  getItineraryEvaluationPage: '/linanJourney/journeyItineraryEvaluationManagement/getItineraryEvaluationPage', // 分页查询行程评价信息
  getItineraryEvaluationStatisticsInfoById: '/linanJourney/journeyItineraryEvaluationManagement/getItineraryEvaluationStatisticsInfoById', // 根据询行程评价ID查询询行程评价热度统计信息
  modifyItineraryEvaluationStatus: '/linanJourney/journeyItineraryEvaluationManagement/modifyItineraryEvaluationStatus', // 修改询行程评价状态(显示、隐藏、删除)

  // ------------ 评论管理
  getCommunityNoteCommentDetail: '/community/communityNoteCommentManagement/getCommunityNoteCommentDetail', // 获取社区笔记评论详情
  getCommunityNoteCommentPage: '/community/communityNoteCommentManagement/getCommunityNoteCommentPage', // 分页获取社区笔记评论
  removeCommunityNoteComment: '/community/communityNoteCommentManagement/removeCommunityNoteComment', // 删除社区笔记评论

  // ------------ 公告管理
  createJourneyAnnouncement: '/linanJourney/journeyAnnouncementManagement/createJourneyAnnouncement', // 创建公告
  getJourneyAnnouncementById: '/linanJourney/journeyAnnouncementManagement/getJourneyAnnouncementById', // 根据id获取公告
  getJourneyAnnouncementPage: '/linanJourney/journeyAnnouncementManagement/getJourneyAnnouncementPage', // 获取公告管理分页
  getSystemGroupMemberLabelList: '/crm/memberLabelManagement/getSystemGroupMemberLabelList', // 获取系统组标签列表
  removeJourneyAnnouncement: '/linanJourney/journeyAnnouncementManagement/removeJourneyAnnouncement', // 删除公告

  // ------------ 帖子管理
  createCommunityNoteRecommendRecord: '/community/communityNoteManagement/createCommunityNoteRecommendRecord', // 新增推荐记录(新增、取消推荐)
  getCommunityNoteInfoById: '/community/communityNoteManagement/getCommunityNoteInfoById', // 根据id查询笔记详细信息
  getCommunityNotePage: '/community/communityNoteManagement/getCommunityNotePage', // 分页查询笔记信息
  getCommunityNoteStatisticsInfoById: '/community/communityNoteManagement/getCommunityNoteStatisticsInfoById', // 根据笔记ID查询笔记热度统计信息
  modifyCommunityNoteStatus: '/community/communityNoteManagement/modifyCommunityNoteStatus', // 修改笔记状态(显示、隐藏、删除)
  getCommunityNoteCommentDetailPage: '/community/communityNoteCommentManagement/getCommunityNoteCommentDetailPage', // 分页获取社区笔记评论详情

  // ------------ 活动管理
  createJourneyActivity: '/linanJourney/journeyActivityManagement/createJourneyActivity', // 创建活动
  getJourneyActivityById: '/linanJourney/journeyActivityManagement/getJourneyActivityById', // 根据id获取活动
  getJourneyActivityManagementPage: '/linanJourney/journeyActivityManagement/getJourneyActivityManagementPage', // 获取活动分页
  getJourneyActivitySignUpList: '/linanJourney/journeyActivityManagement/getJourneyActivitySignUpList', // 获取报名单
  modifyJourneyActivity: '/linanJourney/journeyActivityManagement/modifyJourneyActivity', // 修改活动
  removeJourneyActivity: '/linanJourney/journeyActivityManagement/removeJourneyActivity', // 删除活动
  modifyJourneyActivityStyle: '/linanJourney/journeyActivityManagement/modifyJourneyActivityStyle', // 修改活动风采

  // ------------ 风采管理
  createGraphic: '/party/partyGraphicManagement/createGraphic', // 创建风采图文信息
  deleteGraphicById: '/party/partyGraphicManagement/deleteGraphicById', // 删除风采图文
  getGraphicById: '/party/partyGraphicManagement/getGraphicById', // 获取风采图文详情
  getGraphicPage: '/party/partyGraphicManagement/getGraphicPage', // 分页获取风采图文信息
  modifyGraphic: '/party/partyGraphicManagement/modifyGraphic', // 修改风采图文

  // ------------ 点位管理
  createJourneyPoint: '/linanJourney/journeyPointManagement/createJourneyPoint', // 新增点位
  deleteJourneyPointById: '/linanJourney/journeyPointManagement/deleteJourneyPointById', // 删除点位
  getJourneyPointById: '/linanJourney/journeyPointManagement/getJourneyPointById', // 获取点位详情
  getJourneyPointList: '/linanJourney/journeyPointManagement/getJourneyPointList', // 获取点位列表
  getJourneyPointPage: '/linanJourney/journeyPointManagement/getJourneyPointPage', // 分页获取点位
  modifyJourneyPoint: '/linanJourney/journeyPointManagement/modifyJourneyPoint', // 修改点位
  getJourneyRegionsList: '/linanJourney/journeyRegionsManagement/getJourneyRegionsList', // 获取行政区域列表
  modifyJourneyPointShowStatusById: '/linanJourney/journeyPointManagement/modifyJourneyPointShowStatusById', // 修改点位展示状态

  // ------------ 线路管理
  createJourneyLine: '/linanJourney/journeyLineManagement/createJourneyLine', // 新增线路
  deleteJourneyLineById: '/linanJourney/journeyLineManagement/deleteJourneyLineById', // 删除线路
  getJourneyLineById: '/linanJourney/journeyLineManagement/getJourneyLineById', // 获取线路详情
  getJourneyLineList: '/linanJourney/journeyLineManagement/getJourneyLineList', // 获取线路列表
  getJourneyLinePage: '/linanJourney/journeyLineManagement/getJourneyLinePage', // 分页获取线路
  modifyJourneyLine: '/linanJourney/journeyLineManagement/modifyJourneyLine', // 修改线路
  modifyJourneyLineShowStatusById: '/linanJourney/journeyLineManagement/modifyJourneyLineShowStatusById', // 修改线路展示状态

  // ------------ 联盟管理
  createJourneyAlliance: '/linanJourney/journeyAllianceManagement/createJourneyAlliance', // 新建联盟
  getJourneyAllianceById: '/linanJourney/journeyAllianceManagement/getJourneyAllianceById', // 根据id获取联盟信息
  getJourneyAllianceList: '/linanJourney/journeyAllianceManagement/getJourneyAllianceList', // 获取联盟列表
  getJourneyAlliancePage: '/linanJourney/journeyAllianceManagement/getJourneyAlliancePage', // 分页获取联盟列表
  modifyJourneyAlliance: '/linanJourney/journeyAllianceManagement/modifyJourneyAlliance', // 修改联盟
  removeJourneyAlliance: '/linanJourney/journeyAllianceManagement/removeJourneyAlliance', // 删除联盟
  findOrganizationList: '/organization/org/findOrganizationList', // 获取联盟组织列表

  // ------------- 重点工作管理
  createJourneyKeyWork: '/linanJourney/journeyKeyWorkManagement/createJourneyKeyWork', // 新建重点工作
  getJourneyKeyWorkById: '/linanJourney/journeyKeyWorkManagement/getJourneyKeyWorkById', // 根据id获取重点工作
  getJourneyKeyWorkPage: '/linanJourney/journeyKeyWorkManagement/getJourneyKeyWorkPage', // 分页获取重点工作
  modifyJourneyKeyWork: '/linanJourney/journeyKeyWorkManagement/modifyJourneyKeyWork', // 编辑重点工作
  modifyJourneyKeyWorkStatus: '/linanJourney/journeyKeyWorkManagement/modifyJourneyKeyWorkStatus', // 修改重点工作状态
  removeJourneyKeyWork: '/linanJourney/journeyKeyWorkManagement/removeJourneyKeyWork', // 删除重点工作

  // ------------ 组织管理
  findSysMenuByModuleCode: '/setting/sysMenu/findSysMenuByModuleCode',
  findSysModuleRoleEnableList: '/setting/sysModuleRole/findSysModuleRoleEnableList',
  findOrganizationFilterTree: '/organization/org/findOrganizationFilterTree',
  findOrganizationFullTree: '/organization/org/findOrganizationFullTree',
  findOrganizationTreeByOrgId: '/organization/org/findOrganizationTreeByOrgId',
  findOrgClassEnList: '/organization/orgClass/findOrgClassEnList',
  findOrgLabelEnList: '/organization/orgLabel/findOrgLabelEnList',
  findOrganizationPage: '/organization/org/findOrganizationPage',
  findOrganizationById: '/organization/org/findOrganizationById',
  updateOrganizationCheck: '/organization/org/updateOrganizationCheck',
  updateOrganization: '/organization/org/updateOrganization',
  insertOrganizationCheckName: '/organization/org/insertOrganizationCheckName',
  deleteOrganization: '/organization/org/deleteOrganization',
  batchDeleteOrganization: '/organization/org/batchDeleteOrganization',
  insertOrganization: '/organization/org/insertOrganization',
  updateUserFilterOrg: '/organization/userFilterOrg/updateUserFilterOrg',
  findUserFilterOrg: '/organization/userFilterOrg/findUserFilterOrg',
  findOrganizationFilterDepartmentTree: '/organization/org/findOrganizationFilterDepartmentTree',

  findOrgClassList: '/organization/orgClass/findOrgClassList', // 组织类型列表
  insertOrgClassReq: '/organization/orgClass/insertOrgClassReq', // 新增组织类型
  deleteOrgClass: '/organization/orgClass/deleteOrgClass', // 删除组织类型
  updateOrgClass: '/organization/orgClass/updateOrgClass', // 更新组织类型
  findOrgClassById: '/organization/orgClass/findOrgClassById', // 获取组织类型详情
  findOrgClassRelatedOrganizationsPage: '/organization/orgClass/findOrgClassRelatedOrganizationsPage', // 获取组织类型详情

  findOrgLabelPage: '/organization/orgLabel/findOrgLabelPage', // 组织标签分页
  findOrgLabelByOrgId: '/organization/orgLabel/findOrgLabelByOrgId', // 获取标签详情
  insertOrgLabel: '/organization/orgLabel/insertOrgLabel', // 新增组织标签
  deleteOrgLabel: '/organization/orgLabel/deleteOrgLabel', // 删除组织标签
  updateOrgLabel: '/organization/orgLabel/updateOrgLabel', // 更新组织标签
  findOrgLabelById: '/organization/orgLabel/findOrgLabelById', // 更新组织标签
  findOrgLabelRelatedOrganizationsPage: '/organization/orgLabel/findOrgLabelRelatedOrganizationsPage', // 查找标签相关组织

  // ------------- 角色管理
  findRolePageByOrgId: '/authentication/role/findRolePageByOrgId',
  findCanUseRoleListByOrgId: '/authentication/role/findCanUseRoleListByOrgId',
  insertGeneralRole: '/authentication/role/insertGeneralRole',
  deleteRoleByIds: '/authentication/role/deleteRoleByIds',
  deleteRoleById: '/authentication/role/deleteRoleById',
  disableRole: '/authentication/role/disableRole',
  enableRole: '/authentication/role/enableRole',
  updateRole: '/authentication/role/updateRole',
  copyRole: '/authentication/role/copyRole',
  findAuthenticationGroupByModuleCode: '/authentication/auth/findAuthenticationGroupByModuleCode',
  findAuthenticationGroupByRoleId: '/authentication/auth/findAuthenticationGroupByRoleId',
  setRoleDetails: '/authentication/auth/setRoleDetails',

  // ------------ 用户管理
  insertUser: '/user/user/insertUser',
  findUserInfoById: '/user/user/findUserInfoById',
  findUserAuth: '/user/user/findUserAuth',
  updateUserInfo: '/user/user/updateUserInfo',
  findUserInfo: '/user/user/findUserInfo',
  restPassword: '/user/user/restPassword',
  updateUserStatus: '/user/user/updateUserStatus',
  deleteUser: '/user/user/deleteUser',

  // ------------ 冻结用户管理
  findUserFrozenRecordByPage: '/user/userFrozenRecord/findUserFrozenRecordByPage',
  findUserHistoryFrozenRecordByPage: '/user/userFrozenRecord/findUserHistoryFrozenRecordByPage',
  unfreezeUser: '/user/userFrozenRecord/unfreezeUser',

  // ------------ 用户日志管理
  userLogPage: '/log/userLog/userLogPage'
}
