import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'
import home from '@/components/home/home'
import echarts from '@/components/echarts/echarts'
import users from '@/views/users/users'
import purview from '@/views/purview/purview'
import role from '@/views/role/role'
import goodsList from '@/views/goods/goodsList'
import goodsAdd from '@/views/goods/goodsAdd'
import goodsCat from '@/views/goods/goodsCat'
import goodsPara from '@/views/goods/goodsPara'
import order from '@/views/order/order'
import orderData from '@/views/order/orderData'
import text from '@/views/text/text'
import record from '@/views/record/record'
import report from '@/views/report/report'
import reportTwo from '@/views/report/reportTwo'
import reportThree from '@/views/report/reportThree'


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
      redirect: to =>{
        // if(store.state.user.roles && store.state.user.roles.includes('admin'))return '/a';
        // if(store.state.user.roles && store.state.user.roles.includes('manager'))return '/b';
        // if(store.state.user.roles && store.state.user.roles.includes('check'))return '/c';
        return '/users'
    },
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
        {
          path: '/text',
          name: 'text',
          component: text,
        },
        {
          path: '/order',
          name: 'order',
          component: order,
        },
        {
          path: '/orderData',
          name: 'orderData',
          component: orderData,
        },
        {
          path: '/record',
          name: 'record',
          component: record,
        },
        {
          path: '/report',
          name: 'report',
          component: report,
        }, 
        {
          path: '/reportTwo',
          name: 'reportTwo',
          component: reportTwo,
        },
        {
          path: '/reportThree',
          name: 'reportThree',
          component: reportThree,
        },
        {
          path: '/echarts',
          name: 'echarts',
          component: echarts,
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







