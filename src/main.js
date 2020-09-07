import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'
import Axios from 'axios'
import messagePlugin from './utils/toastPlugin.js'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
} // что бы заголовки не слетали после перезагрузки страницы
Axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:3000/api' : ''

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(messagePlugin)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import 'bootstrap'
import './style/main.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})


