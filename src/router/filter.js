import router from '../router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import config from '@/config.js'
import { clearPending } from '@/request/cancel.js'

router.beforeEach(async (to, from, next) => {
  // 清除队列中的请求
  clearPending()
  // start progress bar
  NProgress.start()

  document.title = config.title + '-' + to.meta.title
  next()
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})
