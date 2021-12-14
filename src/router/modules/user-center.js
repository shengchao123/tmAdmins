import Layout from '@/layout'
export default [
  {
    path: '/user-center',
    component: Layout,
    redirect: '/user-center/user-info',
    name: 'UserCenter',
    meta: {
      title: '用户中心'
    },
    children: [
      {
        path: 'user-info',
        name: 'UserInfo',
        component: () => import('@v/user-center/user-info/index.vue'),
        meta: { title: '用户信息' }
      },
      {
        path: 'user-detail',
        name: 'UserDetail',
        component: () => import('@v/user-center/user-info/user-detail.vue'),
        meta: {
          title: '用户详情',
          activeMenu: 'UserInfo'
        }
      },
      {
        path: 'marking',
        name: 'Marking',
        component: () => import('@v/user-center/user-info/components/Marking.vue'),
        meta: {
          title: '打标签'
        }
      },
      // 会员标签
      {
        path: '/member-label',
        name: 'memberLabel',
        redirect: '/user-center/user-group-label/member-label/label-group',
        component: () => import('@/views/user-center/user-group-label/member-label/index.vue'),
        meta: { title: '会员标签' },
        children: [
          {
            path: 'label-group-manage',
            name: 'labelGroupManage',
            component: () => import('@/views/user-center/user-group-label/member-label/label-group/index.vue'),
            meta: {
              title: '标签组管理'
            }
          },
          {
            path: 'label-manage',
            name: 'labelManage',
            component: () => import('@/views/user-center/user-group-label/member-label/label-manage/index.vue'),
            meta: {
              title: '标签管理'
            }
          },
          {
            path: 'label-new',
            name: 'LabelNew',
            component: () => import('@/views/user-center/user-group-label/member-label/label-manage/label-new/index.vue'),
            meta: {
              title: '新增标签',
              activeMenu: 'labelManage'
            }
          },
          {
            path: 'label-edit',
            name: 'LabelEdit',
            component: () => import('@/views/user-center/user-group-label/member-label/label-manage/label-edit/index.vue'),
            meta: {
              title: '编辑标签',
              activeMenu: 'labelManage'
            }
          }
        ]
      },
      // 客群标签
      {
        path: '/customerLabel',
        name: 'customerLabel',
        component: () => import('@/views/user-center/user-group-label/customer-label/open-customer/index.vue'),
        meta: {
          title: '客群管理',
          keepAlive: true
        }
      },
      {
        path: 'label-manage-public-detail',
        name: 'labelManagePublicDetail',
        component: () => import('@/views/user-center/user-group-label/customer-label/detail/PublicDetail.vue'),
        meta: {
          title: '公开客群详情',
          activeMenu: 'customerLabel'
        }
      },

      {
        path: '/customer-label',
        name: 'customerLabel',
        redirect: '/user-center/user-group-label/customer-label/open-customer',
        component: () => import('@/views/user-center/user-group-label/customer-label/index.vue'),
        meta: { title: '客群标签' },
        children: [
          {
            path: 'open-customer',
            name: 'openCustomer',
            component: () => import('@/views/user-center/user-group-label/customer-label/open-customer/index.vue'),
            meta: {
              title: '公开客群'
            }
          },
          {
            path: 'my-customer',
            name: 'myCustomer',
            component: () => import('@/views/user-center/user-group-label/customer-label/my-customer/index.vue'),
            meta: {
              title: '我的客群'
            }
          },
          {
            path: 'label-manage-public-detail',
            name: 'labelManagePublicDetail',
            component: () => import('@/views/user-center/user-group-label/customer-label/detail/PublicDetail.vue'),
            meta: {
              title: '公开客群详情',
              activeMenu: 'openCustomer'
            }
          },
          {
            path: 'label-manage-my-detail',
            name: 'labelManageMyDetail',
            component: () => import('@/views/user-center/user-group-label/customer-label/detail/MyDetail.vue'),
            meta: {
              title: '我的客群详情',
              activeMenu: 'myCustomer'

            }
          },
          {
            path: 'add-customer',
            name: 'AddCustomer',
            component: () => import('@/views/user-center/user-group-label/customer-label/my-customer/add-customer/index.vue'),
            meta: {
              title: '新增客群',
              noTag: true,
              activeMenu: 'customerLabel',
              keepAlive: true
            }
          },
          {
            path: 'edit-customer',
            name: 'EditCustomer',
            component: () => import('@/views/user-center/user-group-label/customer-label/my-customer/edit-customer/index.vue'),
            meta: {
              title: '编辑客群',
              noTag: true,
              activeMenu: 'myCustomer',
              keepAlive: true
            }
          }
        ]
      },
      {
        path: 'shop-manager',
        name: 'ShopManager',
        component: () => import('@v/user-center/user-info/shop-manager.vue'),
        meta: { title: '红心商城管理' }
      },
      {
        path: 'shop-product-edit',
        name: 'ShopProductEdit',
        component: () => import('@v/user-center/user-info/shop-product-edit.vue'),
        meta: { title: '编辑产品' }
      },
      {
        path: 'shop-product-add',
        name: 'ShopProductAdd',
        component: () => import('@v/user-center/user-info/shop-product-add.vue'),
        meta: { title: '新增产品' }
      },
      {
        path: 'shop-product-detail',
        name: 'ShopProductDetail',
        component: () => import('@v/user-center/user-info/shop-product-detail.vue'),
        meta: { title: '产品详情' }
      },
      {
        path: 'red-heart',
        name: 'RedHeart',
        component: () => import('@v/user-center/user-info/red-heart.vue'),
        meta: { title: '兑换记录' }
      }
      // 客群标签管理
      // {
      //   path: '/user-group-label',
      //   name: 'userGroupLabel',
      //   redirect: '/member-label',
      //   children: [
      //     // 会员标签
      //     {
      //       path: '/member-label',
      //       name: 'memberLabel',
      //       redirect: '/user-center/user-group-label/member-label/label-group',
      //       component: () => import('@/views/user-center/user-group-label/member-label/index.vue'),
      //       meta: { title: '会员标签' },
      //       children: [
      //         {
      //           path: 'label-group-manage',
      //           name: 'labelGroupManage',
      //           component: () => import('@/views/user-center/user-group-label/member-label/label-group/index.vue'),
      //           meta: {
      //             title: '标签组管理'
      //           }
      //         },
      //         {
      //           path: 'label-manage',
      //           name: 'labelManage',
      //           component: () => import('@/views/user-center/user-group-label/member-label/label-manage/index.vue'),
      //           meta: {
      //             title: '标签管理'
      //           }
      //         },
      //         {
      //           path: 'label-new',
      //           name: 'LabelNew',
      //           component: () => import('@/views/user-center/user-group-label/member-label/label-manage/label-new/index.vue'),
      //           meta: {
      //             title: '新增标签',
      //             activeMenu: 'labelManage'
      //           }
      //         },
      //         {
      //           path: 'label-edit',
      //           name: 'LabelEdit',
      //           component: () => import('@/views/user-center/user-group-label/member-label/label-manage/label-edit/index.vue'),
      //           meta: {
      //             title: '编辑标签',
      //             activeMenu: 'labelManage'
      //           }
      //         }
      //       ]
      //     },
      //     // 客群标签
      //     {
      //       path: 'customer-label',
      //       name: 'customerLabel',
      //       redirect: '/user-center/user-group-label/customer-label/open-customer',
      //       component: () => import('@/views/user-center/user-group-label/customer-label/index.vue'),
      //       meta: { title: '客群标签' },
      //       children: [
      //         {
      //           path: 'open-customer',
      //           name: 'openCustomer',
      //           component: () => import('@/views/user-center/user-group-label/customer-label/open-customer/index.vue'),
      //           meta: {
      //             title: '公开客群'
      //           }
      //         },
      //         {
      //           path: 'my-customer',
      //           name: 'myCustomer',
      //           component: () => import('@/views/user-center/user-group-label/customer-label/my-customer/index.vue'),
      //           meta: {
      //             title: '我的客群'
      //           }
      //         },
      //         {
      //           path: 'label-manage-public-detail',
      //           name: 'labelManagePublicDetail',
      //           component: () => import('@/views/user-center/user-group-label/customer-label/detail/PublicDetail.vue'),
      //           meta: {
      //             title: '公开客群详情',
      //             activeMenu: 'openCustomer'
      //           }
      //         },
      //         {
      //           path: 'label-manage-my-detail',
      //           name: 'labelManageMyDetail',
      //           component: () => import('@/views/user-center/user-group-label/customer-label/detail/MyDetail.vue'),
      //           meta: {
      //             title: '我的客群详情',
      //             activeMenu: 'myCustomer'

      //           }
      //         },
      //         {
      //           path: 'add-customer',
      //           name: 'AddCustomer',
      //           component: () => import('@/views/user-center/user-group-label/customer-label/my-customer/add-customer/index.vue'),
      //           meta: {
      //             title: '添加客群',
      //             noTag: true,
      //             activeMenu: 'myCustomer',
      //             keepAlive: true
      //           }
      //         },
      //         {
      //           path: 'edit-customer',
      //           name: 'EditCustomer',
      //           component: () => import('@/views/user-center/user-group-label/customer-label/my-customer/edit-customer/index.vue'),
      //           meta: {
      //             title: '编辑客群',
      //             noTag: true,
      //             activeMenu: 'myCustomer',
      //             keepAlive: true
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // }
      // {
      //   path: 'customers-manage',
      //   name: 'CustomersManage',
      //   component: () => import('@v/user-center/customers-manage/index.vue'),
      //   meta: { title: '客群管理' }
      // }
    ]
  }
]
