// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import 'hover.css/css/hover-min.css'
import 'zui/dist/css/zui.min.css'
import 'font-awesome/css/font-awesome.css'
import '@/styles/index.scss' // global css
// import '@styles/bootstrap.min.css'
// import '@styles/bwizard.min.css'
// import "jquery/dist/jquery.min.js"

import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import i18n from './lang'
import './permission' // permission control
// import jquery from "jquery"
import * as filters from './filters' // global filters
Vue.config.productionTip = false
// window.$=jquery

Vue.use(Element, {
  size: 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})

