import {createRouter, createWebHashHistory} from "vue-router"
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../view/HomeView.vue')
    }, {
        path: '/children',
        name: 'children',
        component: () => import('../view/ChildrenView.vue')
    }, {
        path: '/cache',
        name: 'cache',
        component: () => import('../view/CacheView.vue')
    }, {
        path: '/window',
        name: 'window',
        component: () => import('../view/WindowView.vue')
    }, {
        path: '/db',
        name: 'db',
        component: () => import('../view/DbView.vue')
    }, {
        path: '/share',
        name: 'share',
        component: () => import('../view/ShareView.vue')
    }, {
        path: '/rsa',
        name: 'rsa',
        component: () => import('../view/RsaView.vue')
    }, {
        path: '/crypto',
        name: 'crypto',
        component: () => import('../view/CryptoView.vue')
    }, {
        path: '/launcher',
        name: 'launcher',
        component: () => import('../view/LauncherView.vue')
    }, {
        path: '/scan',
        name: 'scan',
        component: () => import('../view/ScanView.vue')
    }, {
        path: '/alert',
        name: 'alert',
        component: () => import('../view/AlertView.vue')
    }, {
        path: '/image',
        name: 'image',
        component: () => import('../view/ImageView.vue')
    }, {
        path: '/clipboard',
        name: 'clipboard',
        component: () => import('../view/ClipboardView.vue')
    }, {
        path: '/feedback',
        name: 'feedback',
        component: () => import('../view/FeedbackView.vue')
    }, {
        path: '/device',
        name: 'device',
        component: () => import('../view/DeviceView.vue')
    }, {
        path: '/about',
        name: 'about',
        component: () => import('../view/AboutView.vue')
    }, {
        path: '/navigator',
        name: 'navigator',
        component: () => import('../view/NavigatorView.vue')
    }, {
        path: '/chat',
        name: 'chat',
        component: () => import('../view/ChatView.vue')
    }, {
        path: '/chat_window',
        name: 'chat_window',
        component: () => import('../view/ChatWindowView.vue')
    }, {
        path: '/:catchAll(.*)',
        component: () => import('../view/NotFoundView.vue')
    }
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router