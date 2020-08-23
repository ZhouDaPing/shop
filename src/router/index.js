import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/user/User.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[
        {path:'/welcome', component:Welcome},
        {path:'/users', component:User}
      ]
    }
]
//路由重复点击报错修复
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})
//给router挂载路由导航守卫
//根据判断sessionStorge中是否有服务器返回的token，强制路由跳转至登录页面
router.beforeEach((to, from, next) => {//beformEach(cb)
  //to将要访问的路径
	//from 代表从哪个路径跳转而来
	//next 是一个函数表示放行
  //next()放行 next('/xxxx')强制跳转
  if(to.path === '/login') return next();
  const token = window.sessionStorage.getItem('token');
  if(!token) return next('/login');
  next()
})
export default router
