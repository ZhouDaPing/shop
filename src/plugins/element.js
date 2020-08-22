import Vue from 'vue'
import {
     Button, Form, FormItem, Input, Message
    } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// Vue.component(Message)
//挂载诚组件就不需要use了
Vue.prototype.$message = Message