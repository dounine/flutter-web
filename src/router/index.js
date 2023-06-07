import {createRouter, createWebHashHistory} from "vue-router"
import HomeView from "../view/HomeView.vue"
import CacheView from "../view/CacheView.vue"
import WindowView from "../view/WindowView.vue"
import AboutView from "../view/AboutView.vue"

const routes = [
    {
        path: '/',
        redirect: localStorage.getItem('path') || '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    }, {
        path: '/cache',
        name: 'cache',
        component: CacheView
    }, {
        path: '/window',
        name: 'window',
        component: WindowView
    }, {
        path: '/about',
        name: 'about',
        component: AboutView
    }
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router