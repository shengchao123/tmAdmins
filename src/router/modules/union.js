import Layout from '@/layout'
export default [
  {
    path: '/union-manage',
    component: Layout,
    redirect: '/union-manage/union-list',
    name: 'UnionManage',
    meta: {
      title: '联盟管理'
    },
    children: [
      {
        path: 'union-list',
        name: 'UnionList',
        component: () => import('@v/union-manage/union-list/index.vue'),
        meta: {
          title: '联盟管理',
          keepAlive: true
        }
      },
      {
        path: 'add-union',
        name: 'AddUnion',
        component: () => import('@v/union-manage/union-list/components/Add.vue'),
        meta: { title: '新增联盟', activeMenu: 'UnionList' }
      },
      {
        path: 'edit-union',
        name: 'EditUnion',
        component: () => import('@v/union-manage/union-list/components/Edit.vue'),
        meta: { title: '编辑联盟', activeMenu: 'UnionList' }
      },
      {
        path: 'union-detail',
        name: 'UnionDetail',
        component: () => import('@v/union-manage/union-list/components/Detail.vue'),
        meta: { title: '联盟详情', activeMenu: 'UnionList' }
      },
      {
        path: 'key-work-manage',
        name: 'KeyWorkManage',
        component: () => import('@v/union-manage/key-work-manage/index.vue'),
        meta: {
          title: '重点工作管理',
          keepAlive: true
        }
      },
      {
        path: 'add-key-work',
        name: 'AddKeyWork',
        component: () => import('@v/union-manage/key-work-manage/components/Add.vue'),
        meta: { title: '新增工作', activeMenu: 'KeyWorkManage' }
      },
      {
        path: 'edit-key-work',
        name: 'EditKeyWork',
        component: () => import('@v/union-manage/key-work-manage/components/Edit.vue'),
        meta: { title: '编辑工作', activeMenu: 'KeyWorkManage' }
      },
      {
        path: 'talent-management',
        name: 'TalentManagement',
        component: () => import('@v/union-manage/talent-management/index.vue'),
        meta: { title: '风采管理' }
      },
      {
        path: 'add-talent',
        name: 'AddTalent',
        component: () => import('@v/union-manage/talent-management/add-talent.vue'),
        meta: {
          title: '新增风采',
          activeMenu: 'TalentManagement'
        }
      },
      {
        path: 'edit-talent',
        name: 'EditTalent',
        component: () => import('@v/union-manage/talent-management/edit-talent.vue'),
        meta: {
          title: '编辑风采',
          activeMenu: 'TalentManagement'
        }
      },
      {
        path: 'talent-detail',
        name: 'TalentDetail',
        component: () => import('@v/union-manage/talent-management/talent-detail.vue'),
        meta: {
          title: '风采详情',
          activeMenu: 'TalentManagement'
        }
      },
      {
        path: 'activity-management',
        name: 'ActivityManagement',
        component: () => import('@v/union-manage/activity-management/index.vue'),
        meta: {
          title: '活动管理',
          keepAlive: true
        }
      },
      {
        path: 'add-activity',
        name: 'AddActivity',
        component: () => import('@v/union-manage/activity-management/add-activity.vue'),
        meta: {
          title: '新增活动',
          activeMenu: 'ActivityManagement'
        }
      },
      {
        path: 'edit-activity',
        name: 'EditActivity',
        component: () => import('@v/union-manage/activity-management/edit-activity.vue'),
        meta: {
          title: '编辑活动',
          activeMenu: 'ActivityManagement'
        }
      },
      {
        path: 'activity-detail',
        name: 'ActivityDetail',
        component: () => import('@v/union-manage/activity-management/activity-detail.vue'),
        meta: {
          title: '活动详情',
          activeMenu: 'ActivityManagement'
        }
      },
      {
        path: 'upload-demeanour',
        name: 'UploadDemeanour',
        component: () => import('@v/union-manage/activity-management/upload-demeanour.vue'),
        meta: {
          title: '上传风采',
          activeMenu: 'ActivityManagement'
        }
      },
      {
        path: 'affiche-management',
        name: 'AfficheManagement',
        component: () => import('@v/union-manage/affiche-management/index.vue'),
        meta: { title: '公告管理' }
      },
      {
        path: 'add-affiche',
        name: 'AddAffiche',
        component: () => import('@v/union-manage/affiche-management/add-affiche.vue'),
        meta: {
          title: '新增公告',
          activeMenu: 'AfficheManagement'
        }
      },
      {
        path: 'affiche-detail',
        name: 'AfficheDetail',
        component: () => import('@v/union-manage/affiche-management/affiche-detail.vue'),
        meta: {
          title: '公告详情',
          activeMenu: 'AfficheManagement'
        }
      },
      {
        path: 'community-management',
        name: 'CommunityManagement',
        component: () => import('@v/union-manage/community-management/post-management/index.vue'),
        meta: { title: '社区管理' },
        children: [
          {
            path: 'post-management',
            name: 'PostManagement',
            component: () => import('@v/union-manage/community-management/post-management/index.vue'),
            meta: {
              title: '帖子管理'
            }
          }
        ]
      },
      {
        path: 'post-detail',
        name: 'PostDetail',
        component: () => import('@v/union-manage/community-management/post-management/post-detail.vue'),
        meta: {
          title: '帖子详情',
          activeMenu: 'PostManagement'
        }
      },
      {
        path: 'comment-management',
        name: 'CommentManagement',
        component: () => import('@v/union-manage/community-management/comment-management/index.vue'),
        meta: {
          title: '评论管理'
        }
      }
    ]
  }
]
