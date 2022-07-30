import { createRouter, createMemoryHistory } from 'vue-router'
import store from './store/index'
const Index = () => import('./views/index.vue')
const About = () => import('./views/about.vue')
const Login = () => import('./views/login.vue')
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      auth: false, // 是否需要登录
      keepAlive: false, // 是否缓存组件
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false,
      keepAlive: false,
      hide: true,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      auth: false, // 是否需要登录
      keepAlive: false, // 是否缓存组件
    },
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
  let auth = to.meta.auth
  let token = store.state.token
  if (auth && !token) {
    // 需要登录
    next({
      path: '/login',
      query: {
        fullPath: to.fullPath,
      },
    })
  } else {
    next()
  }
})

export default router
