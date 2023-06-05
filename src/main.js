import './style.scss'
import {createApp} from 'vue'
import 'virtual:vite-svg-2-webfont.css'
import App from './App.vue'
import router from './router/index.js'
import MyAxios from './myaxios'
import '@nutui/nutui/dist/packages/dialog/style';
import '@nutui/nutui/dist/packages/toast/style';
new VConsole();
const app = createApp(App)
app.use(router)
app.config.globalProperties.axios = MyAxios;
app.mount('#app')