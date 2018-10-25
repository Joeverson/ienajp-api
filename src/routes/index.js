// components
import SignIn from '../components/pages/access/SignIn.vue'
import Dashboard from '../components/pages/dashboard'
import NotFoundView from '../components/template/404.vue'

// user
import User from '../components/pages/user'
import UserProfile from '../components/pages/user/Profile.vue'

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
    component: Dashboard,
    children: [
      {
        path: 'user',
        name: 'user',
        component: User,
        redirect: '/admin/user/profile',
        children: [
          {
            path: 'profile',
            name: 'user.profile',
            component: UserProfile
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: NotFoundView
  }
];