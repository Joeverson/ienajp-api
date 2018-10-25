import Vue from 'vue'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router'

import './helpers/Http'
import notification from './helpers/Notification'

import './assets/styles/index.scss'
import './assets/scripts/index.js'

Vue.config.productionTip = false

const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  mode: 'history'
});

Vue.use(VueRouter)
Vue.use(notification)

export default new Vue({
  router,  
  render: h => h(App)
}).$mount('#app')
