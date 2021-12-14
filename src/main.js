import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './directives.js'
import '@/router/filter.js'
import '@/plugins'
import '@/request/api.js'
import '@/components'
import '@/utils'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
