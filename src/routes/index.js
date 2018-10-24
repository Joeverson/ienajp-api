// components
import SignIn from '../components/pages/access/SignIn.vue'
import Dashboard from '../components/pages/dashboard'
import NotFoundView from '../components/template/404.vue'

export default [
  {
    path: '/',
    name: 'login',
    component: SignIn
  },
  {
    path: '/admin',
    name: 'admim',
    // auth: true,
    component: Dashboard
  },
  {
    path: '*',
    component: NotFoundView
  }
];