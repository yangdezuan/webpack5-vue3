import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import obj from './test.ts'
import store from './store/index.js'
const app = createApp(App) // 创建vue实例
app.use(router) // 使用路由
app.use(store).mount('#app') // 挂载到id为app的div
