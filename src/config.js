module.exports = {
  title: '天目红盟数字化平台',
  abbreviation: 'base',

  apiPrefix: '/cb-api',

  localStorageKey: 'slzx_base',
  // 存入本地数据的 key
  localKeys: ['masterOrgId', 'moduleCode', 'moduleRoleId', 'appCode', 'orgId', 'token', 'first'],
  // layout 配置项
  navbar: {
    title: '天目红盟数字化平台',
    // 是否显示组织选择
    showOrg: true,
    // 右侧显示栏目
    rightItems: Object.freeze([
      // {
      //   name: 'LogManage', // 日志管理
      //   icon: 'icon_rizhi'
      // },
      // {
      //   name: 'NoticeManage', // 通知中心
      //   icon: 'icon_notice'
      // },
      {
        name: 'ThemeSet', // 主题管理
        icon: 'icon_zhuti'
      }
    ])
  },

  // 项目初始化需要发起请求
  request: [
    'user/setUserLimitList',
    'app/setOrgs',
    'app/setDistrictTree',
    'app/setSystemMenu',
    'user/setUserConfig'
  ],

  // 项目运行端口2
  port: 9527,
  // 项目请求代理地址
  proxy: {
    // api: 'http://172.168.102.2:9032'
    api: 'https://release.hzslonline.com.cn/cb-api'
    // sso: 'http://172.168.102.3:9020'
  }
}
