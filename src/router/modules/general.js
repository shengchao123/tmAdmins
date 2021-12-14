import Layout from '@/layout'
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        component: () => import('@v/general/Home.vue'),
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/shortcut',
    component: Layout,
    children: [
      {
        component: () => import('@/layout/components/shortcut/index.vue'),
        path: '/shortcut',
        name: 'Shortcut',
        meta: {
          title: '快捷导航'
        }
      }
    ]
  },
  {
    path: '/no-auth',
    component: Layout,
    children: [
      {
        component: () => import('@v/general/NoAuth.vue'),
        path: '/no-auth',
        name: 'NoAuth',
        meta: {
          title: '暂无权限',
          noTag: true
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    children: [
      {
        component: () => import('@v/Example.vue'),
        path: '/example',
        name: 'Example',
        meta: {
          title: '示例'
        }
      }
    ]
  },

  {
    path: '*',
    name: '404',
    component: () => import('@v/general/404.vue'),
    meta: {
      title: '找不到页面'
    }
  }
]
