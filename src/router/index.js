import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegisterView from '../views/register/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'HomeView' }) : next()
    }
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
    // beforeEnter: (to, from, next) => {
    //   const { isLogin } = localStorage
    //   isLogin ? next({ name: 'HomeView' }) : next()
    // }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'LoginView' || name === 'RegisterView');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'LoginView' })
})

export default router
