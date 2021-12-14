import Layout from '@/layout'
export default [
  {
    path: '/grassroots-governance',
    component: Layout,
    redirect: '/grassroots-governance/good-hand',
    name: 'GrassrootsGovernance',
    meta: {
      title: '基层治理'
    },
    children: [
      {
        path: 'good-hand',
        name: 'GoodHand',
        component: () => import('@v/grassroots-governance/good-hand/build-unit/index.vue'),
        meta: { title: '好帮手' },
        children: [
          {
            path: 'build-unit',
            name: 'BuildUnit',
            component: () => import('@v/grassroots-governance/good-hand/build-unit/index.vue'),
            meta: {
              title: '共建单位管理',
              keepAlive: true
            }
          }
        ]
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@v/grassroots-governance/statistics/index.vue'),
        meta: {
          title: '城市党建日统计表',
          keepAlive: true
        }
      },
      {
        path: 'statistics-modify',
        name: 'StatisticsModify',
        component: () => import('@v/grassroots-governance/statistics/Modify.vue'),
        meta: {
          title: '录入',
          activeMenu: 'Statistics'
        }
      },
      {
        path: 'statistics-detail',
        name: 'StatisticsDetail',
        component: () => import('@v/grassroots-governance/statistics/Detail.vue'),
        meta: {
          title: '详情',
          activeMenu: 'Statistics'
        }
      },
      {
        path: 'community-manage',
        name: 'CommunityManage',
        component: () => import('@v/grassroots-governance/community/index.vue'),
        meta: {
          title: '社区单位管理',
          keepAlive: true
        }
      },
      {
        path: 'community-add',
        name: 'CommunityAdd',
        component: () => import('@v/grassroots-governance/community/add/index.vue'),
        meta: {
          title: '社区单位管理',
          activeMenu: 'CommunityManage'
        }
      },
      {
        path: 'community-detail',
        name: 'CommunityDetail',
        component: () => import('@v/grassroots-governance/community/detail/index.vue'),
        meta: {
          title: '社区单位详情',
          activeMenu: 'CommunityManage'
        }
      },
      {
        path: 'community-activity',
        name: 'CommunityActivity',
        component: () => import('@v/grassroots-governance/service/activity/index.vue'),
        meta: {
          title: '活动管理',
          keepAlive: true
        }
      },
      {
        path: 'community-add-activity',
        name: 'CommunityAddActivity',
        component: () => import('@v/grassroots-governance/service/activity/add-activity.vue'),
        meta: {
          title: '新增活动',
          activeMenu: 'CommunityActivity'
        }
      },
      {
        path: 'community-edit-activity',
        name: 'CommunityEditActivity',
        component: () => import('@v/grassroots-governance/service/activity/edit-activity.vue'),
        meta: {
          title: '编辑活动',
          activeMenu: 'CommunityActivity'
        }
      },
      {
        path: 'community-activity-detail',
        name: 'CommunityActivityDetail',
        component: () => import('@v/grassroots-governance/service/activity/activity-detail.vue'),
        meta: {
          title: '活动详情',
          activeMenu: 'CommunityActivity'
        }
      },
      {
        path: 'community-projects',
        name: 'CommunityProjects',
        component: () => import('@v/grassroots-governance/good-hand/community-projects/index.vue'),
        meta: {
          title: '社区项目管理',
          keepAlive: true
        }
      },
      {
        path: 'community-project-detail',
        name: 'CommunityProjectDetail',
        component: () => import('@v/grassroots-governance/good-hand/community-projects/components/Detail.vue'),
        meta: { title: '项目详情', activeMenu: 'CommunityProjects' }
      },
      {
        path: 'community-wish',
        name: 'CommunityWish',
        component: () => import('@v/grassroots-governance/service/wish/index.vue'),
        meta: { title: '微心愿管理' }
      },
      {
        path: 'community-add-edit-wish',
        name: 'CommunityAddEditWish',
        component: () => import('@v/grassroots-governance/service/wish/AddEdit.vue'),
        meta: { title: '新增微心愿' }
      },
      {
        path: 'community-wish-detail',
        name: 'CommunityWishDetail',
        component: () => import('@v/grassroots-governance/service/wish/Detail.vue'),
        meta: { title: '微心愿详情' }
      },
      {
        path: 'community-message',
        name: 'CommunityMessage',
        component: () => import('@v/grassroots-governance/service/message/index.vue'),
        meta: {
          title: '留言管理'
        }
      },
      {
        path: 'community-post',
        name: 'CommunityPost',
        component: () => import('@v/grassroots-governance/service/community/post-management/index.vue'),
        meta: {
          title: '话题管理'
        }
      },
      {
        path: 'community-post-detail',
        name: 'CommunityPostDetail',
        component: () => import('@v/grassroots-governance/service/community/post-management/post-detail.vue'),
        meta: {
          title: '话题详情',
          activeMenu: 'CommunityPost'
        }
      },
      {
        path: 'community-add-post',
        name: 'CommunityAddPost',
        component: () => import('@v/grassroots-governance/service/community/post-management/Add.vue'),
        meta: {
          title: '新增话题',
          activeMenu: 'CommunityPost'
        }
      },
      {
        path: 'community-comment',
        name: 'CommunityComment',
        component: () => import('@v/grassroots-governance/service/community/comment-management/index.vue'),
        meta: {
          title: '评论管理'
        }
      },
      {
        path: 'community-matter',
        name: 'CommunityMatter',
        component: () => import('@v/grassroots-governance/service/matter/index.vue'),
        meta: {
          title: '报事管理'
        }
      },
      {
        path: 'community-matter-detail',
        name: 'CommunityMatterDetail',
        component: () => import('@v/grassroots-governance/service/matter/Detail.vue'),
        meta: {
          title: '报事管理',
          activeMenu: 'CommunityMatter'
        }
      },
      {
        path: 'community-affiche',
        name: 'CommunityAffiche',
        component: () => import('@v/grassroots-governance/service/affiche/index.vue'),
        meta: { title: '公告管理' }
      },
      {
        path: 'community-affiche-detail',
        name: 'CommunityAfficheDetail',
        component: () => import('@v/grassroots-governance/service/affiche/AfficheDetail.vue'),
        meta: { title: '公告详情', activeMenu: 'CommunityAffiche' }

      },
      {
        path: 'community-add-affiche',
        name: 'CommunityAddAffiche',
        component: () => import('@v/grassroots-governance/service/affiche/Add.vue'),
        meta: {
          title: '新增公告',
          activeMenu: 'CommunityAffiche'
        }
      }
    ]
  }
]
