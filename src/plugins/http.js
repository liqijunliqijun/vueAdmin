//插件扩展
import axios from "axios"
const MyHttpServer = {}
MyHttpServer.install = function (Vue) {
   axios.defaults.baseURL = "https://localhost:888"
 //. 添加实例方法
    Vue.prototype.$http =  axios
  }

  export default MyHttpServer
