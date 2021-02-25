import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index.vue'
import LayOut from '@/views/layout/index.vue'
import Home from '@/views/home/home.vue'
import Article from '@/views/article'
Vue.use(VueRouter)
    /* 路由表 */
const routes = [
    { path: '/login', name: 'login', component: Login },
    {
        path: '/',
        component: LayOut,
        name: 'layout',
        children: [{
                path: '/',
                component: Home,
                name: 'home'
            },
            {
                path: '/article',
                component: Article,
                name: 'article'
            }
        ]
    }
]

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

/* VueRouter导航守卫 */

router.beforeEach((to, from, next) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (to.path !== '/login') {

        if (user) {
            next()

        } else {
            next('/login')
        }

    } else {

        next()
    }


})
export default router