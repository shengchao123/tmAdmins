import Layout from '@/layout'
export default [
  {
    path: '/map-settings',
    component: Layout,
    redirect: '/map-settings/point-manage',
    name: 'MapSettings',
    meta: {
      title: '地图设置'
    },
    children: [
      {
        path: 'travel-bill',
        name: 'TravelBill',
        component: () => import('@v/map-settings/travel-bill/index.vue'),
        meta: {
          title: '行程单管理',
          keepAlive: true
        }
      },
      {
        path: 'travel-detail',
        name: 'TravelDetail',
        component: () => import('@v/map-settings/travel-bill/Detail.vue'),
        meta: {
          title: '行程单详情',
          activeMenu: 'TravelBill'
        }
      },
      {
        path: 'point-manage',
        name: 'PointManage',
        component: () => import('@v/map-settings/point-manage/index.vue'),
        meta: {
          title: '点位管理',
          keepAlive: true
        }
      },
      {
        path: 'point-detail',
        name: 'PointDetail',
        component: () => import('@v/map-settings/point-manage/point-detail.vue'),
        meta: {
          title: '点位详情',
          activeMenu: 'PointManage'
        }

      },
      {
        path: 'add-point',
        name: 'AddPoint',
        component: () => import('@v/map-settings/point-manage/point-add.vue'),
        meta: {
          title: '新增点位',
          activeMenu: 'PointManage'
        }
      },
      {
        path: 'edit-point',
        name: 'EditPoint',
        component: () => import('@v/map-settings/point-manage/point-edit.vue'),
        meta: {
          title: '编辑点位',
          activeMenu: 'PointManage'
        }
      },
      {
        path: 'route-manage',
        name: 'RouteManage',
        component: () => import('@v/map-settings/route-manage/index.vue'),
        meta: {
          title: '路线管理',
          keepAlive: true
        }
      },
      {
        path: 'route-detail',
        name: 'RouteDetail',
        component: () => import('@v/map-settings/route-manage/route-detail.vue'),
        meta: {
          title: '路线详情',
          activeMenu: 'RouteManage'
        }
      },
      {
        path: 'add-route',
        name: 'AddRoute',
        component: () => import('@v/map-settings/route-manage/route-add.vue'),
        meta: {
          title: '新增路线',
          activeMenu: 'RouteManage'
        }
      },
      {
        path: 'edit-route',
        name: 'EditRoute',
        component: () => import('@v/map-settings/route-manage/route-edit.vue'),
        meta: {
          title: '编辑路线',
          activeMenu: 'RouteManage'
        }
      },
      {
        path: 'evaluate-manage',
        name: 'EvaluateManage',
        component: () => import('@v/map-settings/evaluate-manage/index.vue'),
        meta: { title: '评价管理' }
      },
      {
        path: 'evaluate-detail',
        name: 'EvaluateDetail',
        component: () => import('@v/map-settings/evaluate-manage/evaluate-detail.vue'),
        meta: { title: '评价详情' }
      }
    ]
  }
]
