import Vue from 'vue'
import {
     Button, Form, FormItem, Input, Message, Container, Main, Header, Aside, Menu, MenuItem, Submenu
    } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

// Vue.component(Message)
//挂载诚组件就不需要use了
Vue.prototype.$message = Message