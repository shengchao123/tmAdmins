import Layout from '@/layout'
export default [
  {
    path: '/talent-think-tank-manage',
    component: Layout,
    redirect: '/talent-think-tank-manage/personnel-manage',
    name: 'TalentThinkTankManage',
    meta: {
      title: '人才智库管理'
    },
    children: [
      {
        path: 'policy-manage',
        name: 'PolicyManage',
        component: () => import('@v/talent-think-tank-manage/policy-manage/index.vue'),
        meta: { title: '政策管理', keepAlive: true }
      },
      {
        path: 'add-policy',
        name: 'AddPolicy',
        component: () => import('@v/talent-think-tank-manage/policy-manage/add.vue'),
        meta: { title: '新增政策', activeMenu: 'PolicyManage' }
      },
      {
        path: 'edit-policy',
        name: 'EditPolicy',
        component: () => import('@v/talent-think-tank-manage/policy-manage/edit.vue'),
        meta: { title: '编辑政策', activeMenu: 'PolicyManage' }
      },
      {
        path: 'policy-detail',
        name: 'PolicyDetail',
        component: () => import('@v/talent-think-tank-manage/policy-manage/detail.vue'),
        meta: { title: '政策详情', activeMenu: 'PolicyManage' }
      },
      {
        path: 'personnel-manage',
        name: 'PersonnelManage',
        component: () => import('@v/talent-think-tank-manage/personnel-manage/index.vue'),
        meta: { title: '人才管理', keepAlive: true }
      },
      {
        path: 'add-personnel',
        name: 'AddPersonnel',
        component: () => import('@v/talent-think-tank-manage/personnel-manage/add.vue'),
        meta: { title: '新增人才', activeMenu: 'PersonnelManage' }
      },
      {
        path: 'edit-personnel',
        name: 'EditPersonnel',
        component: () => import('@v/talent-think-tank-manage/personnel-manage/edit.vue'),
        meta: { title: '编辑人才', activeMenu: 'PersonnelManage' }
      },
      {
        path: 'personnel-detail',
        name: 'PersonnelDetail',
        component: () => import('@v/talent-think-tank-manage/personnel-manage/detail.vue'),
        meta: { title: '人才详情', activeMenu: 'PersonnelManage' }
      },
      {
        path: 'subsidy-manage',
        name: 'SubsidyManage',
        component: () => import('@v/talent-think-tank-manage/subsidy-manage/index.vue'),
        meta: { title: '无感直补管理', keepAlive: true }
      },
      {
        path: 'add-subsidy',
        name: 'AddSubsidy',
        component: () => import('@v/talent-think-tank-manage/subsidy-manage/add.vue'),
        meta: { title: '新增项目', activeMenu: 'SubsidyManage' }
      },
      {
        path: 'edit-subsidy',
        name: 'EditSubsidy',
        component: () => import('@v/talent-think-tank-manage/subsidy-manage/edit.vue'),
        meta: { title: '编辑项目', activeMenu: 'SubsidyManage' }
      },
      {
        path: 'sersonnel-detail',
        name: 'SubsidyDetail',
        component: () => import('@v/talent-think-tank-manage/subsidy-manage/detail.vue'),
        meta: { title: '项目详情', activeMenu: 'SubsidyManage' }
      },
      {
        path: 'alliance-naxian',
        name: 'AllianceNaxian',
        component: () => import('@v/talent-think-tank-manage/alliance-naxian/index.vue'),
        meta: { title: '联盟纳贤', keepAlive: true }
      },
      {
        path: 'add-position',
        name: 'AddPosition',
        component: () => import('@v/talent-think-tank-manage/alliance-naxian/add.vue'),
        meta: { title: '新增职位', activeMenu: 'AllianceNaxian' }
      },
      {
        path: 'edit-position',
        name: 'EditPosition',
        component: () => import('@v/talent-think-tank-manage/alliance-naxian/edit.vue'),
        meta: { title: '编辑职位', activeMenu: 'AllianceNaxian' }
      },
      {
        path: 'position-detail',
        name: 'PositionDetail',
        component: () => import('@v/talent-think-tank-manage/alliance-naxian/detail.vue'),
        meta: { title: '职位详情', activeMenu: 'AllianceNaxian' }
      }
    ]
  }
]
