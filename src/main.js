import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import Echarts from 'echarts'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'

import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css

import '@/icons' // icon
import '@/permission' // 权限控制

import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs
// Echarts
Vue.use(Echarts)
// 设置ElementUI中文
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// 注册全局指令
import permission from '@/directive/permission/index.js' // 权限判断指令
Vue.directive('permission', permission)

import operation from '@/directive/operation/index.js' // 操作权限指令
Vue.directive('operation', operation)

new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})
