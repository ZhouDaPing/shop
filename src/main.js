import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'

Vue.config.productionTip = false
//全局配置默认URL地址
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
//配置请求拦截器
//为请求头添加token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //必须返回设置信息 否则无效
  return config
})
//Vue全局挂载axios,通过给原型添加属性
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
