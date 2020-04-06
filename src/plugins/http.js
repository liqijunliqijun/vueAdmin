//插件扩展
import axios from "axios"
const MyHttpServer = {}
MyHttpServer.install = function (Vue) {

  axios.defaults.baseURL = "https://localhost:888";

  // 添加请求拦截器    在请求之前会先来到下面的函数；
  axios.interceptors.request.use(function (config) {
    //  设置请求头，获取token
    const AUTH_TOKEN = localStorage.getItem("token");
    config.headers["Authorization"] = AUTH_TOKEN;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  //. 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer
