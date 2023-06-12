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
    cache_get: async ({key}) => {
        return jsChannel({
            type: 'cache', data: {
                action: 'get', key
            }, callback: {}
        })
    }, cache_set: async ({key, value}) => {
        return jsChannel({
            type: 'cache', data: {
                action: 'set', key, value
            }, callback: {}
        })
    }, cache_del: async ({key}) => {
        return jsChannel({
            type: 'cache', data: {
                action: 'del', key
            }, callback: {}
        })
    }, cache_clear: async () => {
        return jsChannel({
            type: 'cache', data: {
                action: 'clear',
            }, callback: {}
        })
    }, window_single: async ({url, title = ''}) => {
        return jsChannel({
            type: 'window', data: {
                action: 'single', url, title,
            }, callback: {}
        })
    }, db_execute: async ({sql}) => {
        return jsChannel({
            type: 'db', data: {
                action: 'execute', sql,
            }, callback: {}
        })
    }, db_query: async ({sql, args = []}) => {
        return jsChannel({
            type: 'db', data: {
                action: 'query', sql, args
            }, callback: {}
        })
    }, db_insert: async ({sql, args = []}) => {
        return jsChannel({
            type: 'db', data: {
                action: 'update', sql, args
            }, callback: {}
        })
    }, db_update: async ({sql, args = []}) => {
        return jsChannel({
            type: 'db', data: {
                action: 'del', sql, args
            }, callback: {}
        })
    }, db_del: async ({sql, args = []}) => {
        return jsChannel({
            type: 'db', data: {
                action: 'del', sql, args
            }, callback: {}
        })
    }, share_url: async ({url, subject}) => {
        return jsChannel({
            type: 'share', data: {
                action: 'url', url, subject
            }, callback: {}
        })
    }, share_file: async ({path, subject, text}) => {
        return jsChannel({
            type: 'share', data: {
                action: 'file', path, subject, text
            }, callback: {}
        })
    },
    rsa_encrypt: async ({content}) => {
        return jsChannel({
            type: 'rsa',
            data: {
                action: 'encrypt',
                content
            }
        })
    },
    rsa_decrypt: async ({content}) => {
        return jsChannel({
            type: 'rsa',
            data: {
                action: 'decrypt',
                content
            }
        })
    },
    launcher_url: async ({url, tip = '找不到对应的应用'}) => {
        return jsChannel({
            type: 'launcher',
            data: {
                action: 'url',
                url,
                tip
            }
        })
    },
    scan_qrcode: async ({}) => {
        return jsChannel({
            type: 'scan',
            data: {
                action: 'qrcode',
            }
        })
    },
    scan_brcode: async ({}) => {
        return jsChannel({
            type: 'scan',
            data: {
                action: 'brcode',
            }
        })
    }
}