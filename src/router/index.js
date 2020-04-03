import Vue from 'vue'
import router from 'vue-router' 

import login from '@/components/login/login'
import home from '@/components/home/home'
import users from '@/components/users/users'
 

Vue.use(router)
 
export default new router({
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
      children:[
        {
            path: 'users',
            name: 'users',
            component: users,
        }
      ]
    },
   
  ]
})