import MyAlert from "./MyAlert.vue";
import {h, render} from "vue";

let createMount = (opts) => {
    const mountNode = document.createElement("div");
    document.querySelector('#app').appendChild(mountNode);
    const close = () => {
        document.querySelector('#app').removeChild(mountNode);
    }
    if (opts.duration) {
        setTimeout(() => {
            close()
        }, opts.duration)
    }
    const vnode = h(MyAlert, {
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
        app.config.globalProperties.$alert = {
            info: ({
                       title = '',
                       text = '',
                       okText = '',
                       closeText = '',
                       closeIcon = false,
                       onOk = (close) => {
                           close()
                       },
                       onClose = (close) => {
                           close()
                       },
                       duration = 3000
                   }, options = {}) => {
                options.id = options.id || "myalert_info_" + 1; //唯一id 删除组件时用于定位
                createMount({
                    title,
                    text,
                    okText,
                    closeText,
                    closeIcon,
                    onOk,
                    onClose,
                    duration,
                    type: 'info'
                });
            },
            success: ({
                          title = '',
                          text = '',
                          okText = '',
                          closeText = '',
                          closeIcon = false,
                          onOk = (close) => {
                              close()
                          },
                          onClose = (close) => {
                              close()
                          },
                          duration = 3000
                      }, options = {}) => {
                options.id = options.id || "myalert_success_" + 1; //唯一id 删除组件时用于定位
                createMount({
                    title,
                    text,
                    okText,
                    closeText,
                    closeIcon,
                    onOk,
                    onClose,
                    duration,
                    type: 'success'
                });
            },
            warning: ({
                          title = '',
                          text = '',
                          okText = '',
                          closeText = '',
                          closeIcon = false,
                          onOk = (close) => {
                              close()
                          },
                          onClose = (close) => {
                              close()
                          },
                          duration = 3000
                      }, options = {}) => {
                options.id = options.id || "myalert_warning_" + 1; //唯一id 删除组件时用于定位
                createMount({
                    title,
                    text,
                    okText,
                    closeText,
                    closeIcon,
                    onOk,
                    onClose,
                    duration,
                    type: 'warning'
                });
            },
            error: ({
                        title = '',
                        text = '',
                        okText = '',
                        closeText = '',
                        closeIcon = false,
                        onOk = (close) => {
                            close()
                        },
                        onClose = (close) => {
                            close()
                        },
                        duration = 3000
                    }, options = {}) => {
                options.id = options.id || "myalert_error_" + 1; //唯一id 删除组件时用于定位
                createMount({
                    title,
                    text,
                    okText,
                    closeText,
                    closeIcon,
                    onOk,
                    onClose,
                    duration,
                    type: 'error'
                });
            },
            loading: ({
                          title = '',
                          text = '处理中...',
                          closeText = '',
                          onClose = (close) => {
                              close()
                          }
                          , duration = 0
                      }, options = {}) => {
                options.id = options.id || "myalert_loading_" + 1; //唯一id 删除组件时用于定位
                return createMount({
                    title,
                    text,
                    closeText,
                    onClose,
                    close,
                    duration,
                    type: 'loading'
                });
            },
        };
    },
    _context: null,
};
export default Modal;