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
            type: 'cache',
            data: {
                action: 'get',
                key
            },
            callback: {}
        })
    },
    cache_set: async ({key, value}) => {
        return jsChannel({
            type: 'cache',
            data: {
                action: 'set',
                key,
                value
            },
            callback: {}
        })
    },
    cache_del: async ({key, value}) => {
        return jsChannel({
            type: 'cache',
            data: {
                action: 'del',
                key
            },
            callback: {}
        })
    },
    cache_clear: async () => {
        return jsChannel({
            type: 'cache',
            data: {
                action: 'clear',
            },
            callback: {}
        })
    },
    window_single: async ({url, title = ''}) => {
        return jsChannel({
            type: 'window',
            data: {
                action: 'single',
                url,
                title,
            },
            callback: {}
        })
    }
}