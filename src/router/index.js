import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'
import home from '@/components/home/home'
import users from '@/components/users/users'
import purview from '@/components/purview/purview'
import role from '@/components/role/role'
import goodsList from '@/components/goods/goodsList'
import goodsAdd from '@/components/goods/goodsAdd'
import goodsCat from '@/components/goods/goodsCat'
import goodsPara from '@/components/goods/goodsPara'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: 'users',
          name: 'users',
          component: users,
        },
        {
          path: '/purview',
          name: 'purview',
          component: purview,
        },
        {
         path: '/role',
         name: 'role',
         component: role,
       },
       {
        path: '/goods',
        name: 'goods',
        component: goodsList,
      },
      {
        path: '/add',
        name: 'add',
        component: goodsAdd, 
      },
      {
        path: '/goodsCat',
        name: 'goodsCat',
        component: goodsCat,
      },
      {
        path: '/goodsPara',
        name: 'goodsPara',
        component: goodsPara,
      },
      ]
    },

  ]
})
export default router
// 在路由配置生效之前   统一判断token
// 路由/导航 守卫 判断

// router.beforeEnter((to, from, next) => {
//   // ...
//   console.log(to)
// })







