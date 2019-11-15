import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import SlideVerify from 'vue-monoplasty-slide-verify';

// 引用全局变量
import globalVariable from './assets/js/global_variable.js'
// 引用全局函数
import globalFun from './assets/js/global_fun.js'

import './assets/css/rest.css'
import './assets/css/bootstrap.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'

import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'

import Login from './components/login.vue'

// all register
Vue.use(VueRouter)
Vue.use(VueAxios,axios)
Vue.use(ElementUI)
// 验证
Vue.use(SlideVerify);
// 全局函数
Vue.use(globalFun)

Vue.config.productionTip = false
// 让子组件也可以使用axios
Vue.prototype.$axios=axios
// 全局引用
Vue.prototype.GLOBAL = globalVariable

const routes = [
  {
    path: '/company/clist',
    component: (resolve) => require(['./components/company/company_list.vue'],resolve)
  },
  {
    path: '/system/news',
    component: (resolve) => require(['./components/news/news_list.vue'],resolve)
  },
  {
    path: '/company/accident',
    component: (resolve) => require(['./components/company/company_accident.vue'],resolve)
  },
  {
    path: '/statistics/sopinion',
    component: (resolve) => require(['./components/statistics/statistics_opinion.vue'],resolve)
  },
  {
    path: '/login',
    components: {
      login: Login
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
}).$mount('#app')
