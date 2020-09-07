import Vue from 'vue'
import VueRouter from "vue-router";
import store from './store.js'
import Login from './views/pages/Login.vue'
import Registration from './views/pages/Registration.vue'
import Dashboard from './views/pages/Dashboard.vue'
import Marathons from './views/pages/Marahtons.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { layout: 'main', auth: true },
    },
    {
      path: '/marathons',
      name: 'marathons',
      component: Marathons,
      meta: { layout: 'main', auth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { layout: 'auth' },
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
      meta: { layout: 'auth' },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router