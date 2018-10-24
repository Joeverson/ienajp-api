import Vue from 'vue'
import App from './App.vue'
import routes from './routes'
import VueRouter from 'vue-router'

import './assets/styles/index.scss'
import './assets/scripts/index.js'

Vue.config.productionTip = false

const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  mode: 'history'
});

Vue.use(VueRouter)

new Vue({
  router,  
  render: h => h(App)
}).$mount('#app')
