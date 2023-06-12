const sleep = (time = 1000) => new Promise((resolve) => setTimeout(resolve, time))
const retry = async (promise, times = 3, delay = 3000) => {
    try {
        return await promise
    } catch (e) {
        if (times > 1) {
            console.log('重试')
            await sleep(delay)
            return await retry(promise, times - 1, delay)
        } else {
            throw e
        }
    }
}
const jsChannel = (data) => {
    return new Promise((resolve, reject) => {
        if (data.callback) {
            let randomTime = new Date().getTime()
            data.callback.name = `callback_${randomTime}`
            window[data.callback.name] = function (value) {
                resolve(value)
                delete window[data.callback.name]
            }
            window.app.postMessage(JSON.stringify(data))
        } else {
            window.app.postMessage(JSON.stringify(data))
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
        single: async ({url, title = ''}) => {
            return jsChannel({
                type: 'window', data: {
                    action: 'single', url, title,
                }, callback: {}
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
                    action: 'update', sql, args
                }, callback: {}
            })
        }, update: async ({sql, args = []}) => {
            return jsChannel({
                type: 'db', data: {
                    action: 'del', sql, args
                }, callback: {}
            })
        }, del: async ({sql, args = []}) => {
            return jsChannel({
                type: 'db', data: {
                    action: 'del', sql, args
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
                }
            })
        },
        decrypt: async ({content}) => {
            return jsChannel({
                type: 'rsa',
                data: {
                    action: 'decrypt',
                    content
                }
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
                }
            })
        },
    },
    scan: {
        qrcode: async () => {
            return jsChannel({
                type: 'scan',
                data: {
                    action: 'qrcode',
                }
            })
        },
        brcode: async () => {
            return jsChannel({
                type: 'scan',
                data: {
                    action: 'brcode',
                }
            })
        },
    },
    alert: {
        //type:info error warning confirm loading
        show: async ({
                         action = 'info',
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
                let funName = `callback_${randomTime}`
                onConfirmFunName = funName
                window[funName] = function (value) {
                    onConfirm(value)
                    delete window[funName]
                }
            }
            if (onCancel) {
                let randomTime = new Date().getTime()
                let funName = `callback_${randomTime}`
                onCancelFunName = funName
                window[funName] = function (value) {
                    onCancel(value)
                    delete window[funName]
                }
            }
            return jsChannel({
                type: 'alert',
                data: {
                    action,
                    title,
                    text,
                    cancelBtnText,
                    confirmBtnText,
                    onConfirm: onConfirmFunName,
                    onCancel: onCancelFunName,
                    autoClose
                }
            })
        },
    },
    image: {
        choose: async () => {
            return jsChannel({
                type: 'image',
                data: {
                    action: 'choose',
                }
            })
        },
        base64: async ({path}) => {
            return jsChannel({
                type: 'image',
                data: {
                    action: 'base64',
                    path
                }
            })
        },
    },
    crypto: {
        md5: async ({content}) => {
            return jsChannel({
                type: 'crypto',
                data: {
                    action: 'md5',
                    content
                }
            })
        },
        sha1: async ({content}) => {
            return jsChannel({
                type: 'crypto',
                data: {
                    action: 'sha1',
                    content
                }
            })
        },
        sha256: async ({content}) => {
            return jsChannel({
                type: 'crypto',
                data: {
                    action: 'sha256',
                    content
                }
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
                }
            })
        },
        paste: async () => {
            return jsChannel({
                type: 'clipboard',
                data: {
                    action: 'paste',
                }
            })
        }
    },
    feedback: {
        success: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'success',
                }
            })
        },
        error: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'error',
                }
            })
        },
        warning: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'warning',
                }
            })
        },
        selection: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'selection',
                }
            })
        },
        heavy: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'heavy',
                }
            })
        },
        medium: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'medium',
                }
            })
        },
        light: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'light',
                }
            })
        },
        impact: async () => {
            return jsChannel({
                type: 'feedback',
                data: {
                    action: 'impact',
                }
            })
        }
    },
    device: {
        info: async () => {
            return jsChannel({
                type: 'device',
                data: {
                    action: 'info',
                }
            })
        }
    }
}