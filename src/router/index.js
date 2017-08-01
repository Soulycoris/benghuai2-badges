import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import badges from '@/components/badges/badges'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'badges',
      component: badges
    }, {
      path: '',
      redirect: '/'
    }
  ]
})
