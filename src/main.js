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
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
// 验证
Vue.use(SlideVerify);
// 全局函数
Vue.use(globalFun)

Vue.config.productionTip = false
// 让子组件也可以使用axios
Vue.prototype.$axios = axios
// 全局引用
Vue.prototype.GLOBAL = globalVariable

const routes = [
  // 企业列表
  {
    path: '/company/clist',
    component: (resolve) => require(['./components/company/company_list.vue'], resolve)
  },
  // 新闻公告
  {
    path: '/system/news',
    component: (resolve) => require(['./components/news/news_list.vue'], resolve)
  },
  // 事故信息
  {
    path: '/company/accident',
    component: (resolve) => require(['./components/company/accident_list.vue'], resolve)
  },
  // 意见反馈
  {
    path: '/clientserve/sopinion',
    component: (resolve) => require(['./components/clientserve/opinion_list.vue'], resolve)
  },
  // 印章管理
  {
    path: '/company/clist/csealManage',
    component: (resolve) => require(['./components/company/seal_list.vue'], resolve)
  },
  // 机构列表
  {
    path: '/organization/olist',
    component: (resolve) => require(['./components/organization/organization_list.vue'], resolve)
  },
  // 标段列表
  {
    path: '/project/sectionlist',
    component: (resolve) => require(['./components/project/section_list.vue'], resolve)
  },
  // 登录
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