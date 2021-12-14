import Vue from 'vue'
import { urls, fileHost } from './urls'
import * as user from './modules/user'
import * as app from './modules/app'
import * as login from './modules/login'
import * as org from './modules/org'
import * as msg from './modules/msg'
import * as map from './modules/map'
import * as union from './modules/union'
import * as userCenter from './modules/user-center'
import * as platform from './modules/platform'
import * as customerManage from './modules/customerManage'
import * as labelManage from './modules/labelManage'
import * as urban from './modules/urban'
import * as talentThinkTank from './modules/talent-think-tank'
import * as dataMaintenance from './modules/data-maintenance'
import * as goodHand from './modules/goodHand'
import * as grassroots from './modules/grassroots'
export const api = {
  ...platform,
  ...user,
  ...app,
  ...org,
  ...login,
  ...msg,
  ...map,
  ...union,
  ...userCenter,
  ...customerManage,
  ...labelManage,
  ...urban,
  ...talentThinkTank,
  ...dataMaintenance,
  ...goodHand,
  ...grassroots
}

Vue.prototype.$fileHost = fileHost
Vue.prototype.$api = api
Vue.prototype.$urls = urls
