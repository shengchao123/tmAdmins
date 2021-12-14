import Layout from '@/layout'
export default [
  {
    path: '/urban-integration',
    component: Layout,
    redirect: '/urban-integration/select-product',
    name: 'UrbanIntegration',
    meta: {
      title: '城乡融合'
    },
    children: [
      {
        path: 'select-product',
        name: 'SelectProduct',
        component: () => import('@v/urban-integration/select-product/index.vue'),
        meta: {
          title: '优选产品管理',
          keepAlive: true
        }
      },
      {
        path: 'add-product',
        name: 'AddProduct',
        component: () => import('@v/urban-integration/select-product/components/Add.vue'),
        meta: {
          title: '新增产品',
          activeMenu: 'SelectProduct'
        }
      },
      {
        path: 'edit-product',
        name: 'EditProduct',
        component: () => import('@v/urban-integration/select-product/components/Edit.vue'),
        meta: {
          title: '编辑产品',
          activeMenu: 'SelectProduct'
        }
      },
      {
        path: 'product-detail',
        name: 'ProductDetail',
        component: () => import('@v/urban-integration/select-product/components/Detail.vue'),
        meta: {
          title: '产品详情',
          activeMenu: 'SelectProduct'
        }
      },
      {
        path: 'merchants-booth',
        name: 'MerchantsBooth',
        component: () => import('@v/urban-integration/merchants-booth/index.vue'),
        meta: {
          title: '商家展位管理',
          keepAlive: true
        }
      },
      {
        path: 'edit-booth',
        name: 'EditBooth',
        component: () => import('@v/urban-integration/merchants-booth/components/Edit.vue'),
        meta: {
          title: '编辑展位',
          activeMenu: 'MerchantsBooth'
        }
      },
      {
        path: 'booth-detail',
        name: 'BoothDetail',
        component: () => import('@v/urban-integration/merchants-booth/components/Detail.vue'),
        meta: {
          title: '展位详情',
          activeMenu: 'MerchantsBooth'
        }
      },
      {
        path: 'custom-manage',
        name: 'CustomManage',
        component: () => import('@v/urban-integration/custom-manage/index.vue'),
        meta: { title: '定制管理' }
      },
      {
        path: 'custom-detail',
        name: 'CustomDetail',
        component: () => import('@v/urban-integration/custom-manage/Detail.vue'),
        meta: {
          title: '定制详情',
          activeMenu: 'CustomManage'
        }
      }
    ]
  }
]
