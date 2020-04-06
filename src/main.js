import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/http.js'
import ElementUI  from 'element-ui'
import moment from "moment"

import '@/assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

// 自定义的全局组件  MyBread 其实是组件选项所在的对象
import MyBread from "@/components/curscom/myBread"
Vue.component(MyBread.name,MyBread)

Vue.use(axios)
Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局过滤器
Vue.filter('formatDate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
});
import {Message} from 'element-ui';
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
router.beforeEach((to,from,next)=>{ 
  console.log(to)
  if(to.path == '/login'){
    localStorage.removeItem("token")
  }
  var token =localStorage.getItem('token')
  if(!token && to.path !== '/login'){
    Message.warning("请先登录")
    next({   path:'/login'  })
  }else{
    next();
  }
})