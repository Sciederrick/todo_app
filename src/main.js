import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import store from './store'
import './assets/css/tailwind.css'
import '../icons.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$axios = axios

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

export const bus = new Vue()

new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app')
