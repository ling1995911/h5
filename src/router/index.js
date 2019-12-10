// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
import Vue from 'vue'
import Router from 'vue-router'
// import { checkAuth } from '../utils/auth'
// import { MOBILE } from '../config/app'
import Home from '../views/Home'
import About from '../views/About'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/index',
  //   name: '首页',
  //   icon: 'bank',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import(/* webpackChunkName: "index" */ '@/views/Home'),
  //       authority: true,
  //     }
  //   ]
  // },
]

const vueRouter = new Router({
  mode: 'history',
  routes: constantRouterMap,
})
// vueRouter.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   next()
//   /* 必须调用 `next` */
// })

export default vueRouter
// export default new Router({
//   // mode: 'history', // 后端支持可开
//   // scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

// export const asyncRouterMap = (pageData, authData) => {
//   if (MOBILE) {
//     return []
//   } else {
//    return []
//   }
// }
