import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/http.js'
import ElementUI  from 'element-ui'

import '@/assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(axios)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 用 vue-router 的 beforeEach 实现
// beforeEach 方法接收三个参数：

// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// router.beforeEach((to,from,next)=>{
//   if(to.path == '/login'){
//     sessionStorage.removeItem("user")
//   }
//   var user =sessionStorage.getItem('user')
//   if(!user && to.path !== '/login'){
//     next({ 
//         path:'/login' 
//     })
//   }else{
//     next();
//   }
// })