import {showToast} from "@nutui/nutui";

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
const copy = (value) => {
    const input = document.createElement("input");
    input.readOnly = "readonly";
    input.value = value
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand("Copy");
    document.body.removeChild(input);
    showToast.success('复制链接成功')
}

export default {
    debounce: (fn, delay) => {
        let debounceTimeout
        return (...args) => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout)
            }
            debounceTimeout = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    },
    sleep,
    retry,
    copy
}