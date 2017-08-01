// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: '/static/badges/error.png',
  loading: '/static/badges/loading.gif',
  attempt: 3
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  // listenEvents: [ 'scroll' ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
