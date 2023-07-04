const jsChannel = (data) => {
    return new Promise((resolve, reject) => {
        if (!window.sdk) {
            return reject('sdk not ready')
        }
        if (data.callback) {
            data.callback.name = `callback_${data.type}_${Math.random()}`.replace('0.', '')
            window[data.callback.name] = function (value) {
                resolve(value)
                delete window[data.callback.name]
            }
            window.sdk.postMessage(JSON.stringify(data))
        } else {
            window.sdk.postMessage(JSON.stringify(data))
            resolve()
        }
    })
}
export default {
    cache: {
        get: async ({key}) => {
            return jsChannel({
                type: 'cache', data: {
                    action: 'get', key
                }, callback: {}
            })
        }, set: async ({key, value}) => {
            return jsChannel({
                type: 'cache', data: {
                    action: 'set', key, value
                }, callback: {}
            })
        }, del: async ({key}) => {
            return jsChannel({
                type: 'cache', data: {
                    action: 'del', key
                }, callback: {}
            })
        }, clear: async () => {
            return jsChannel({
                type: 'cache', data: {
                    action: 'clear',
                }, callback: {}
            })
        },
    },
    window: {
        single: async ({url, title = '', safeArea = false, bgColor = '61D7E2'}) => {
            return jsChannel({
                type: 'window', data: {
                    action: 'single', url, title, safeArea, bgColor
                }, callback: {}
            })
        }
    },
    chat: {
        create: async ({
                           title,
                           url,
                           emoji = true,
                           appBarColor = '#ECEDEC',
                           loadingColor = '#5370EA',
                           loadingAnimatedMillisecond = 300,
                           bgColor = '#FFFFFF',
                           menus = ['image', 'camera', 'file', 'favorite', 'location'],
                       }) => {
            return jsChannel({
                type: 'chat', data: {
                    action: 'create',
                    title,
                    url,
                    emoji,
                    appBarColor,
                    bgColor,
                    menus,
                    loadingColor,
                    loadingAnimatedMillisecond
                }, callback: {}
            })
        },
        listen: async ({
                           onMore = function (data) {
                               console.log('click onMore')
                           },
                           onBack = function (data) {
                               console.log('click onBack')
                           },
                           onMessage = function (message) {
                               console.log('onMessage', message)
                           }
                       }) => {
            let data = {
                action: 'listen'
            }
            if (onMore) {
                data['onMore'] = `callback_chat_onmore_${Math.random()}`.replace('0.', '')
                window[data['onMore']] = onMore
            }
            if (onBack) {
                data['onBack'] = `callback_chat_onback_${Math.random()}`.replace('0.', '')
                window[data['onBack']] = onBack
            }
            if (onMessage) {
                data['onMessage'] = `callback_chat_onmessage_${Math.random()}`.replace('0.', '')
                window[data['onMessage']] = onMessage
            }
            return jsChannel({
                type: 'chat', data, callback: {}
            })
        }
    },
    db: {
        execute: async ({sql}) => {
            return jsChannel({
                type: 'db', data: {
                    action: 'execute', sql,
                }, callback: {}
            })
        }, query: async ({sql, args = []}) => {
            return jsChannel({
                type: 'db', data: {
                    action: 'query', sql, args
                }, callback: {}
            })
        }, insert: async ({sql, args = []}) => {
            return jsChannel({
                type: 'db', data: {
                    action: 'insert', sql, args
                }, callback: {}
            })
        }, update: async ({sql, args = []}) => {
            return jsChannel({
                type: 'db', data: {
                    action: 'update', sql, args
                }, callback: {}
            })
        }, delete: async ({sql, args = []}) => {
            return jsChannel({
                type: 'db', data: {
                    action: 'delete', sql, args
                }, callback: {}
            })
        }
    },
    share: {
        url: async ({url, subject}) => {
            return jsChannel({
                type: 'share', data: {
                    action: 'url', url, subject
                }, callback: {}
            })
        }, file: async ({path, subject, text}) => {
            return jsChannel({
                type: 'share', data: {
                    action: 'file', path, subject, text
                }, callback: {}
            })
        },
    },
    rsa: {
        encrypt: async ({content}) => {
            return jsChannel({
                type: 'rsa',
                data: {
                    action: 'encrypt',
                    content
                }, callback: {}
            })
        },
        decrypt: async ({content}) => {
            return jsChannel({
                type: 'rsa',
                data: {
                    action: 'decrypt',
                    content
                }, callback: {}
            })
        },
    },
    launcher: {
        url: async ({url, tip = '找不到对应的应用'}) => {
            return jsChannel({
                type: 'launcher',
                data: {
                    action: 'url',
                    url,
                    tip
                }, callback: {}
            })
        },
    },
    scan: {
        qrcode: async () => {
            return jsChannel({
                type: 'scan',
                data: {
                    action: 'qrcode',
                }, callback: {}
            })
        },
        brcode: async () => {
            return jsChannel({
                type: 'scan',
                data: {
                    action: 'brcode',
                }, callback: {}
            })
        },
    },
    alert: {
        //type:info error warning confirm loading
        show: async ({
                         type = 'info',
                         title,
                         text,
                         cancelBtnText = '取消',
                         confirmBtnText = '确定',
                         onConfirm,
                         onCancel,
                         autoClose = true
                     }) => {
            let onConfirmFunName = '', onCancelFunName = ''
            if (onConfirm) {
                let randomTime = new Date().getTime()
                let funName = `callback_ok_${randomTime}`
                onConfirmFunName = funName
                window[funName] = function (value) {
                    onConfirm(value)
                    delete window[funName]
                }
            }
            if (onCancel) {
                let randomTime = new Date().getTime()
                let funName = `callback_cancel_${randomTime}`
                onCancelFunName = funName
                window[funName] = function (value) {
                    onCancel(value)
                    delete window[funName]
                }
            }
            return jsChannel({
                type: 'alert',
                data: {
                    action: 'show',
                    type,
                    title,
                    text,
                    cancelBtnText,
                    confirmBtnText,
                    onConfirm: onConfirmFunName,
                    onCancel: onCancelFunName,
                    autoClose
                }, callback: {}
            })
        },
        close: () => {
            return jsChannel({
                type: 'alert',
                data: {
                    action: 'close',
                }, callback: {}
            })
        }
    },
    image: {
        choose: () => {
            return jsChannel({
                type: 'image',
                data: {
                    action: 'choose',
                }, callback: {}
            })
        },
        base64: async ({path}) => {
            return jsChannel({
                type: 'image',
                data: {
                    action: 'base64',
                    path
                }, callback: {}
            })
        },
    },
    crypto: {
        md5: async ({content}) => {
            return jsChannel({
                type: 'crypto',
                data: {
                    action: 'secret',
                    type: 'md5',
                    content
                }, callback: {}
            })
        },
        sha1: async ({content}) => {
            return jsChannel({
                type: 'crypto',
                data: {
                    action: 'secret',
                    type: 'sha1',
                    content
                }, callback: {}
            })
        },
        sha256: async ({content}) => {
            return jsChannel({
                type: 'crypto',
                data: {
                    action: 'secret',
                    type: 'sha256',
                    content
                }, callback: {}
            })
        }
    },
    clipboard: {
        copy: async ({text}) => {
            return jsChannel({
                type: 'clipboard',
                data: {
                    action: 'copy',
                    text
                }, callback: {}
            })
        },
        paste: async () => {
            return jsChannel({
                type: 'clipboard',
                data: {
                    action: 'paste',
                }, callback: {}
            })
        }
    },
    feedback: {
        success: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'success',
                }, callback: {}
            })
        },
        error: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'error',
                }, callback: {}
            })
        },
        warning: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'warning',
                }, callback: {}
            })
        },
        selection: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'selection',
                }, callback: {}
            })
        },
        heavy: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'heavy',
                }, callback: {}
            })
        },
        medium: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'medium',
                }, callback: {}
            })
        },
        light: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'light',
                }, callback: {}
            })
        },
        impact: () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'impact',
                }, callback: {}
            })
        }
    },
    device: {
        info: () => {
            return jsChannel({
                type: 'device',
                data: {
                    action: 'info',
                }, callback: {}
            })
        }
    },
    navigator: {
        pop: () => {
            return jsChannel({
                type: 'navigator',
                data: {
                    action: 'pop',
                }, callback: {}
            })
        }
    },
    page: {
        loading: () => {
            return jsChannel({
                type: 'page',
                data: {
                    action: 'loading',
                }, callback: {}
            })
        },
        loaded: () => {
            return jsChannel({
                type: 'page',
                data: {
                    action: 'loaded',
                }, callback: {}
            })
        }
    },
    version: {
        info: () => {
            return jsChannel({
                type: 'sdk',
                data: {
                    action: 'info',
                }, callback: {}
            })
        }
    }
}