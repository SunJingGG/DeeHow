// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import 'hover.css/css/hover-min.css'
import 'zui/dist/css/zui.min.css'
import '@/styles/index.scss' // global css
// import '@styles/bootstrap.min.css'
// import '@styles/bwizard.min.css'
// import "jquery/dist/jquery.min.js"
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import i18n from './lang'
import 'zui/dist/js/zui'
import './permission' // permission control
import '@/utils/initJq.js'
import * as filters from './filters' // global filters
Vue.config.productionTip = false
Vue.use(Element, {
  size: 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// window.BASEURL = "http://" +location.host 
Vue.prototype.DEEHOWBASEURL = "http://" +location.host 
// Vue.prototype.DEEHOWWEBSCOKETURL = 'ws://'+location.host +'/deehow-CMS-Web/websocket/anon/socketServer.do?sid=WS_TYPE_QRCODE'
Vue.prototype.DEEHOWWEBSCOKETURL = 'ws://39.105.43.10/deehow-CMS-Web/websocket/anon/socketServer.do?sid=WS_TYPE_QRCODE'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})

