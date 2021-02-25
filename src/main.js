import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* 引入element-ui */
import ElementUI from 'element-ui'
/* 加载element-ui的样式 */
import 'element-ui/lib/theme-chalk/index.css'


// 加载全局样式文件
import './styles/index.css'

// 加载iconfont图标文件
// import './assets/icon/iconfont.css'



/* 注册全局element-ui组件 */
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')