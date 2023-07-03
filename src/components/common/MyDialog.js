import MyDialog from "./MyDialog.vue";
import {h, render} from "vue";

let createMount = (opts) => {
    const mountNode = document.createElement("div");
    document.querySelector('#app').appendChild(mountNode);
    const close = () => {
        setTimeout(() => {
            document.querySelector('#app').removeChild(mountNode);
        }, 500)
    }
    const vnode = h(MyDialog, {
        ...opts,
        close
    });
    vnode.appContext = Modal._context;
    render(vnode, mountNode);
};
const Modal = {
    install(app, options) {
        app.config.globalProperties.$dialog = {
            info: ({
                       title = '温馨提示',
                       text = '',
                       okText = '确定',
                       closeText = '',
                       onOk = (close) => {
                           close()
                       },
                       onClose = (close) => {
                           close()
                       },
                   }, options = {}) => {
                options.id = options.id || "mydialog_info_" + 1; //唯一id 删除组件时用于定位
                createMount({
                    title,
                    text,
                    okText,
                    closeText,
                    onOk,
                    onClose,
                    type: 'info'
                });
            },
            error: ({
                        title = '错误提示',
                        text = '',
                        okText = '确定',
                        closeText = '',
                        onOk = (close) => {
                            close()
                        },
                        onClose = (close) => {
                            close()
                        },
                    }, options = {}) => {
                options.id = options.id || "mydialog_error_" + 1; //唯一id 删除组件时用于定位
                createMount({
                    title,
                    text,
                    okText,
                    closeText,
                    onOk,
                    onClose,
                    type: 'error'
                });
            },
            warning: ({
                          title = '警告',
                          text = '',
                          okText = '确定',
                          closeText = '',
                          onOk = (close) => {
                              close()
                          },
                          onClose = (close) => {
                              close()
                          },
                      }, options = {}) => {
                options.id = options.id || "mydialog_warning_" + 1; //唯一id 删除组件时用于定位
                createMount({
                    title,
                    text,
                    okText,
                    closeText,
                    onOk,
                    onClose,
                    type: 'warning'
                });
            },
        };
    },
    _context: null,
};
export default Modal;