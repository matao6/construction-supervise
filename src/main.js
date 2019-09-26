import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

import './assets/css/rest.css'
import './assets/css/bootstrap.min.css'
import './assets/css/index.css'
import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'

Vue.config.productionTip = false

const routes = [
  {
    path: '/index/list',
    component: (resolve) => require(['./components/list.vue'],resolve)
  },
  {
    path: '/index',
    component: (resolve) => require(['./components/index.vue'], resolve)
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

