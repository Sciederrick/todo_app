import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/css/tailwind.css'
import '../icons.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// export const bus = new Vue()

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
