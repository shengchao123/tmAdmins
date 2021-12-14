import Layout from '@/layout'
export default [
  {
    path: '/data-maintenance',
    component: Layout,
    children: [
      {
        component: () => import('@v/data-maintenance/index.vue'),
        path: '/data-maintenance',
        name: 'DataMaintenance',
        meta: {
          title: '数据维护'
        }
      }
    ]
  }
]
