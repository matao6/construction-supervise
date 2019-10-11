import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/css/rest.css'
import './assets/css/bootstrap.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'

import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'

// all register
Vue.use(VueRouter)
Vue.use(VueAxios,axios)
Vue.use(ElementUI)

Vue.config.productionTip = false

const routes = [
  {
    path: '/index/list',
    component: (resolve) => require(['./components/list.vue'],resolve)
  },
  {
    path: '/index',
    component: (resolve) => require(['./components/index.vue'], resolve)
  },
  {
    path: '/index/check',
    component: (resolve) => require(['./components/check.vue'],resolve)
  },
  {
    path: '/index/edit',
    component: (resolve) => require(['./components/check.vue'],resolve)
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
