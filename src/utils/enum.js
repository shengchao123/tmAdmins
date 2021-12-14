import { timeFormat } from '@u/formatter'

export const pointType = [
  { name: '红色地标', id: '01' },
  { name: '党群服务', id: '02' },
  { name: '农产品基地', id: '03' },
  { name: '初心驿站', id: '04' },
  { name: '组织生活馆', id: '05' }
]

export function textForStatus (status) {
  return status === 1 ? '已停用' : '已启用'
}
export function textForHandle (status) {
  return status === 1 ? '停用' : '启用'
}
export const pointColConfig = Object.freeze([// 点位管理
  {
    label: 'ID',
    prop: 'code',
    width: 140
  },
  {
    label: '点位名称',
    prop: 'name',
    minWidth: 300
  },
  {
    label: '行政区域',
    prop: 'regionsName',
    width: 270
  },
  {
    label: '功能分类',
    prop: 'typeName',
    width: 220
  },
  {
    slot: 'data'
  },
  {
    slot: 'statusName'
  },
  {
    slot: 'operate'
  }
])

export const routeColConfig = Object.freeze([// 路线管理
  {
    label: 'ID',
    prop: 'code',
    width: 240
  },
  {
    label: '路线名称',
    prop: 'name',
    minWidth: 450
  },
  {
    label: '包含地标(个)',
    prop: 'scenicSpotQuantity',
    width: 276
  },
  {
    label: '行政区域',
    prop: 'regionsName',
    width: 276
  },
  {
    slot: 'statusName'
  },
  {
    slot: 'operate'
  }
])
export const VisitRouteOptions = Object.freeze([// 路线管理 游玩时长
  {
    name: '半天',
    id: '01'
  },
  {
    name: '1天',
    id: '02'
  },
  {
    name: '2天',
    id: '03'
  },
  {
    name: '3天',
    id: '04'
  }
])
export const talentColConfig = Object.freeze([// 风采管理
  {
    slot: 'index'
  },
  {
    label: '标题',
    prop: 'title',
    minWidth: 300
  },
  {
    label: '上传组织',
    prop: 'orgName',
    width: 369
  },
  {
    label: '更新时间',
    prop: 'createTime',
    width: 267,
    formatter: timeFormat
  },
  {
    slot: 'operate'
  }
])
export const activityColConfig = Object.freeze([// 活动管理
  {
    label: '活动ID',
    prop: 'id',
    width: 174
  },
  {
    label: '活动名称',
    prop: 'name',
    minWidth: 320
  },
  {
    slot: 'time'
  },
  {
    label: '组织单位',
    prop: 'orgName',
    width: 322
  },
  {
    label: '活动类型',
    prop: 'typeName',
    width: 120
  },
  {
    label: '状态',
    prop: 'statusName',
    width: 120
  },
  {
    slot: 'apply'
  },
  {
    label: '活动风采',
    prop: 'styleDescriptionStatus',
    width: 120
  },
  {
    slot: 'operate'
  }
])
export const afficheColConfig = Object.freeze([// 公告管理
  {
    label: '公告ID',
    prop: 'code',
    width: 200
  },
  {
    label: '公告标题',
    prop: 'title',
    width: 400
  },
  {
    label: '创建单位',
    prop: 'orgName',
    minWidth: 430
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 430,
    formatter: timeFormat
  },
  {
    slot: 'operate'
  }
])
export const noteManage = Object.freeze([// 帖子管理
  {
    label: '帖子ID',
    prop: 'code',
    width: 140
  },
  {
    label: '帖子标题',
    prop: 'title',
    minWidth: 300
  },
  {
    slot: 'nick'
  },
  {
    label: '发布时间',
    prop: 'createTime',
    width: 220,
    formatter: timeFormat
  },
  {
    label: '板块',
    prop: 'noteTypeName',
    width: 200
  },
  {
    slot: 'heat'
  },
  {
    slot: 'statusName'
  },
  {
    slot: 'isRecommend'
  },
  {
    slot: 'operate'
  }
])
export const commentManage = Object.freeze([// 评论管理
  {
    label: '评论ID',
    prop: 'code',
    width: 169
  },
  {
    slot: 'content'
  },
  {
    slot: 'name'
  },
  {
    label: '发布时间',
    prop: 'createTime',
    width: 254,
    formatter: timeFormat
  },
  {
    label: '帖子ID',
    prop: 'communityNoteCode',
    width: 224
  },
  {
    label: '状态',
    prop: 'statusName',
    width: 224
  },
  {
    slot: 'operate'
  }
])
export const evaluateManage = Object.freeze([// 帖子管理
  {
    label: 'ID',
    prop: 'code',
    width: 200
  },
  {
    label: '评价标题',
    prop: 'title',
    minWidth: 200
  },
  {
    slot: 'nick'
  },
  {
    label: '发布时间',
    prop: 'createTime',
    width: 304,
    formatter: timeFormat
  },
  {
    slot: 'heat'
  },
  {
    slot: 'statusName'
  },
  {
    slot: 'operate'
  }
])
export const userInfoColConfig = Object.freeze([// 用户信息
  {
    label: '用户ID',
    prop: 'code',
    width: 140
  },
  {
    label: '昵称',
    prop: 'nick',
    width: 182
  },
  {
    label: '手机号',
    prop: 'phone',
    width: 182
  },
  {
    label: '姓名',
    prop: 'name',
    width: 182
  },
  {
    label: '所属组织',
    prop: 'orgName',
    minWidth: 300
  },
  {
    slot: 'community'
  },
  {
    label: '来源',
    prop: 'sourceTypeName',
    width: 140
  },
  {
    label: '注册时间',
    prop: 'registeredTime',
    width: 190,
    formatter: timeFormat
  },
  {
    label: '红心值',
    prop: 'redHeartBalance',
    width: 140
  },
  {
    slot: 'operate'
  }
])

export const unionContact = Object.freeze([// 新增联盟联络人
  {
    slot: 'orgName'
  },
  {
    slot: 'contactPerson'
  },
  {
    slot: 'tel'
  }
])

export const unionContactDetail = Object.freeze([// 联盟联络人详情
  {
    label: '职务',
    prop: 'orgName',
    minWidth: 264
  },
  {
    label: '联络人',
    prop: 'contactPerson',
    width: 152
  },
  {
    label: '联系电话',
    prop: 'tel',
    width: 256
  }
])

export const journeyProduct = Object.freeze([// 农产品列表
  {
    slot: 'production'
  },
  {
    label: '选送联盟',
    prop: 'orgName',
    width: 252
  },
  {
    slot: 'sort'
  },
  {
    slot: 'operate'
  }
])
// 类型 (01:蔬菜种植; 02:水果种植; 03:林木种植; 04:花木种植; 05:竹子种植; 06:山核桃种植; 07:畜牧养殖; 08:家禽养殖; 09:水产养殖)
export const personnelTypeOptions = Object.freeze([
  {
    label: '蔬菜种植',
    value: '蔬菜种植'
  },
  {
    label: '水果种植',
    value: '水果种植'
  },
  {
    label: '林木种植',
    value: '林木种植'
  },
  {
    label: '花木种植',
    value: '花木种植'
  },
  {
    label: '竹子种植',
    value: '竹子种植'
  },
  {
    label: '山核桃种植',
    value: '山核桃种植'
  },
  {
    label: '畜牧养殖',
    value: '畜牧养殖'
  },
  {
    label: '家禽养殖',
    value: '家禽养殖'
  },
  {
    label: '水产养殖',
    value: '水产养殖'
  }
])

// 1:周一; 2:周二; 3:周三; 4:周四; 5:周五; 6:周六; 7:周日
export const weekOptions = Object.freeze(new Map([
  [1, '周一'],
  [2, '周二'],
  [3, '周三'],
  [4, '周四'],
  [5, '周五'],
  [6, '周六'],
  [7, '周日']
]))

// 工作经验 (01:1-3年; 02:3-5年; 03:5年以上)
export const workExperienceOptions = Object.freeze([
  {
    label: '不限',
    value: '01'
  },
  {
    label: '1-3年',
    value: '02'
  },
  {
    label: '3-5年',
    value: '03'
  },
  {
    label: '5年以上',
    value: '04'
  }
])

// 学历 (01:大专; 02:本科; 03:硕士; 04:博士)
export const educationOptions = Object.freeze([
  {
    label: '不限',
    value: '01'
  },
  {
    label: '大专',
    value: '02'
  },
  {
    label: '本科',
    value: '03'
  },
  {
    label: '硕士',
    value: '04'
  },
  {
    label: '博士',
    value: '05'
  }
])

export const formListMap = Object.freeze(new Map([
  [0, [
    {
      title: '今日游客数',
      keyName: 'todayVisitorsNumber',
      unit: '人',
      msg: '请输入今日游客数'
    },
    {
      title: '昨日游客数',
      keyName: 'yesterdayVisitorsNumber',
      unit: '人',
      msg: '请输入昨日游客数'
    },
    {
      title: '游客总数',
      keyName: 'totalVisitorsNumber',
      unit: '人次',
      msg: '请输入游客总数'
    },
    {
      title: '累计行程',
      keyName: 'accumulativeItinerary',
      unit: '个',
      msg: '请输入累计行程'
    },
    {
      title: '累计打卡',
      keyName: 'accumulativeSignIn',
      unit: '人',
      msg: '请输入累计打卡'
    },
    {
      title: '评价热度',
      keyName: 'evaluationHeat',
      unit: '',
      msg: '请输入评价热度'
    },
    {
      title: '最受欢迎路线Top3',
      keyName: 'firstPopularLineId',
      unit: '',
      child: [{
        selectId: 'firstPopularLineId',
        inputKeyName: 'firstPopularLineHeat',
        selectMsg: '请选择路线',
        inputMsg: '请输入热度'
      },
      {
        selectId: 'secondPopularLineId',
        inputKeyName: 'secondPopularLineHeat',
        selectMsg: '请选择路线',
        inputMsg: '请输入热度'
      },
      {
        selectId: 'thirdPopularLineId',
        inputKeyName: 'thirdPopularLineHeat',
        selectMsg: '请选择路线',
        inputMsg: '请输入热度'
      }]
    }]
  ],
  [1, [
    {
      title: '优选产品数',
      keyName: 'productNumber',
      unit: '个',
      msg: '请输入优选产品数'
    },
    {
      title: '活动开展数',
      keyName: 'activityNumber',
      unit: '个',
      msg: '请输入活动开展数'
    },
    {
      title: '活动报名人数',
      keyName: 'activitySignUpNumber',
      unit: '人',
      msg: '请输入活动报名人数'
    },
    {
      title: '定制需求接单',
      keyName: 'customizationOrdersNumber',
      unit: '单',
      msg: '请输入定制需求接单'
    },
    {
      title: '资源共享热度',
      keyName: 'resourceSharingHeat',
      unit: '',
      msg: '请输入资源共享热度'
    },
    {
      title: '共富贷申请人数',
      keyName: 'loanApplicantsNumber',
      unit: '人',
      msg: '请输入共富贷申请人数'
    }]
  ],
  [2, [
    {
      title: '基层党组织数',
      keyName: 'grassrootsPartyOrganizationsNumber',
      unit: '个',
      msg: '请输入基层党组织数'
    },
    {
      title: '好案例个数',
      keyName: 'goodsCaseNumber',
      unit: '个',
      msg: '请输入好案例个数'
    },
    {
      title: '磋商性接单数',
      keyName: 'consultativeOrdersNumber',
      unit: '单',
      msg: '请输入磋商性接单数'
    },
    {
      title: '竞争性抢单数',
      keyName: 'competitiveOrdersNumber',
      unit: '单',
      msg: '请输入竞争性抢单数'
    },
    {
      title: '办结率',
      keyName: 'closingRate',
      unit: '%',
      msg: '请输入办结率'
    },
    {
      title: '好评率',
      keyName: 'praiseRate',
      unit: '%',
      msg: '请输入好评率'
    }]
  ],
  [3, [
    {
      title: '联盟活动开展数',
      keyName: 'allianceActivityNumber',
      unit: '个',
      msg: '请输入联盟活动开展数'
    },
    {
      title: '联盟活动报名人数',
      keyName: 'allianceActivitySignUpNumber',
      unit: '人',
      msg: '请输入联盟活动报名人数'
    },
    {
      title: '论坛热度',
      keyName: 'forumHeat',
      unit: '',
      msg: '请输入论坛热度'
    },
    {
      title: '未开始工作数',
      keyName: 'notStartWorkNumber',
      unit: '项',
      msg: '请输入未开始工作数'
    },
    {
      title: '进行中工作数',
      keyName: 'workingNumber',
      unit: '项',
      msg: '请输入进行中工作数'
    },
    {
      title: '已完成工作数',
      keyName: 'finishWorkNumber',
      unit: '项',
      msg: '请输入已完成工作数'
    },
    {
      title: '联盟活跃度Top3',
      keyName: 'firstActiveAllianceId',
      unit: '',
      child: [{
        selectId: 'firstActiveAllianceId',
        inputKeyName: 'firstActiveAllianceHeat',
        selectMsg: '选择联盟',
        inputMsg: '请输入热度'
      },
      {
        selectId: 'secondActiveAllianceId',
        inputKeyName: 'secondActiveAllianceHeat',
        selectMsg: '选择联盟',
        inputMsg: '请输入热度'
      },
      {
        selectId: 'thirdActiveAllianceId',
        inputKeyName: 'thirdActiveAllianceHeat',
        selectMsg: '选择联盟',
        inputMsg: '请输入热度'
      }]
    }]
  ],
  [4, [
    {
      title: '政策发布',
      keyName: 'policyNumber',
      unit: '项',
      msg: '请输入政策发布'
    },
    {
      title: '直补申请',
      keyName: 'directApplicationNumber',
      unit: '个',
      msg: '请输入直补申请'
    },
    {
      title: '专家入驻',
      keyName: 'expertNumber',
      unit: '人',
      msg: '请输入专家入驻'
    },
    {
      title: '联盟纳贤需求',
      keyName: 'postNumber',
      unit: '个',
      msg: '请输入联盟纳贤需求'
    },
    {
      title: '浏览热度',
      keyName: 'postBrowseHeat',
      unit: '',
      msg: '请输入浏览热度'
    },
    {
      title: '线上问诊满意率',
      keyName: 'onlineConsultationSatisfactionRate',
      unit: '%',
      msg: '请输入线上问诊满意率'
    },
    {
      title: '线上问诊总次数',
      keyName: 'concatTotalNum',
      unit: '次',
      msg: '请输入线上问诊总次数'
    },
    {
      title: '电话次数',
      keyName: 'callsNumber',
      unit: '次',
      msg: '请输入电话次数'
    },
    {
      title: '留言次数',
      keyName: 'messageNumber',
      unit: '次',
      msg: '请输入留言次数'
    },
    {
      title: '实地走访',
      keyName: 'visitNumber',
      unit: '次',
      msg: '请输入实地走访'
    }]
  ],
  [5, [
    {
      title: '累计访问人次',
      keyName: 'accumulativeVisitsNumber',
      unit: '次',
      msg: '请输入累计访问人次'
    },
    {
      title: '累计用户',
      keyName: 'accumulativeUser',
      unit: '人',
      msg: '请输入累计用户'
    },
    {
      title: '今日新增用户',
      keyName: 'todayNewUserNumber',
      unit: '人',
      msg: '请输入今日新增用户'
    },
    {
      title: '昨日新增用户',
      keyName: 'yesterdayNewUserNumber',
      unit: '人',
      msg: '请输入昨日新增用户'
    }]
  ]
]))
export const classificationOptions = Object.freeze([// 优选产品 分类
  {
    id: '01',
    name: '水果鲜花'
  },
  {
    id: '02',
    name: '蔬菜'
  },
  {
    id: '03',
    name: '肉禽蛋'
  },
  {
    id: '04',
    name: '粮油调味'
  },
  {
    id: '05',
    name: '方便速食'
  },
  {
    id: '06',
    name: '干货坚果'
  },
  {
    id: '07',
    name: '酒水茶饮'
  },
  {
    id: '08',
    name: '其他'
  }
])

export const smsColConfig = Object.freeze([// 短信管理
  {
    label: '短信内容',
    prop: 'cont',
    minWidth: 300
  },
  {
    label: '发送时间',
    prop: 'cont',
    width: 320,
    formatter: timeFormat
  },
  {
    slot: 'status'
  },
  {
    slot: 'sum'
  }
])
