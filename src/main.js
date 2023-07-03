import './style.scss'
import {createApp} from 'vue'
import 'virtual:vite-svg-2-webfont.css'
import App from './App.vue'
import router from './router/index.js'
import MyAxios from './myaxios'
import MyDialog from "@/components/common/MyDialog.js";
import MyAlert from "@/components/common/MyAlert.js";
import QrcodeAction from "@/components/common/QrcodeAction.js";
// import '@nutui/nutui/dist/packages/dialog/style';
// import '@nutui/nutui/dist/packages/toast/style';
// new VConsole();
const app = createApp(App)
MyDialog._context = app._context
MyAlert._context = app._context
QrcodeAction._context = app._context
app.use(MyDialog)
app.use(MyAlert)
app.use(QrcodeAction)
app.use(router)
app.config.globalProperties.axios = MyAxios;
app.mount('#app')