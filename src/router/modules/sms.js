import Layout from '@/layout'
export default [
    {
        path: '/sms-manage',
        component: Layout,
        children: [
            {
                component: () => import('@v/sms-manage/index.vue'),
                path: '/sms-manage',
                name: 'SmsManage',
                meta: {
                    title: '短信管理'
                }
            },
            {
                component: () => import('@v/sms-manage/add.vue'),
                path: '/add-sms',
                name: 'AddSms',
                meta: {
                    title: '新增短信'
                }
            },
            {
                component: () => import('@v/sms-manage/add-label.vue'),
                path: '/add-label',
                name: 'AddLabel',
                meta: {
                    title: '添加标签'
                }
            }
        ]
    }
]
