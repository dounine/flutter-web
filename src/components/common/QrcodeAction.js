import QrcodeAction from "./QrcodeAction.vue";
import {h, render} from "vue";

let createMount = (opts) => {
    const mountNode = document.createElement("div");
    document.querySelector('#app').appendChild(mountNode);
    const close = () => {
        setTimeout(() => {
            document.querySelector('#app').removeChild(mountNode);
        }, 500)
    }
    const vnode = h(QrcodeAction, {
        ...opts,
        close
    });
    vnode.appContext = Modal._context;
    render(vnode, mountNode);
    return {
        close
    }
};
const Modal = {
    install(app, options) {
        app.config.globalProperties.$qrcode = {
            show: ({
                       title,
                       text,
                       qrcode,
                       link,
                   }, options = {}) => {
                options.id = options.id || "myqrcode_" + 1; //唯一id 删除组件时用于定位
                createMount({
                    title,
                    text,
                    qrcode,
                    link,
                });
            },
        };
    },
    _context: null,
};
export default Modal;