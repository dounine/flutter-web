import {createRouter, createWebHashHistory} from "vue-router"
import HomeView from "../view/HomeView.vue"
import CacheView from "../view/CacheView.vue"
import WindowView from "../view/WindowView.vue"
import DbView from "../view/DbView.vue"
import ShareView from "../view/ShareView.vue"
import LauncherView from "../view/LauncherView.vue"
import RsaView from "../view/RsaView.vue"
import ScanView from "../view/ScanView.vue"
import AlertView from "../view/AlertView.vue"
import ImageView from "../view/ImageView.vue"
import FeedbackView from "../view/FeedbackView.vue"
import CryptoView from "../view/CryptoView.vue"
import ClipboardView from "../view/ClipboardView.vue"
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
        path: '/db',
        name: 'db',
        component: DbView
    }, {
        path: '/share',
        name: 'share',
        component: ShareView
    }, {
        path: '/rsa',
        name: 'rsa',
        component: RsaView
    }, {
        path: '/crypto',
        name: 'crypto',
        component: CryptoView
    }, {
        path: '/launcher',
        name: 'launcher',
        component: LauncherView
    }, {
        path: '/scan',
        name: 'scan',
        component: ScanView
    }, {
        path: '/alert',
        name: 'alert',
        component: AlertView
    }, {
        path: '/image',
        name: 'image',
        component: ImageView
    }, {
        path: '/clipboard',
        name: 'clipboard',
        component: ClipboardView
    }, {
        path: '/feedback',
        name: 'feedback',
        component: FeedbackView
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