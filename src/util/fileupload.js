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
const FILE_BATCH_SIZE = 1024 * 1024//1m
const createFileChunk = (file, size = FILE_BATCH_SIZE) => {
    const fileChunkList = []
    let seekIndex = 0
    while (seekIndex < file.size) {
        fileChunkList.push(file.slice(seekIndex, seekIndex + size))
        seekIndex += size
    }
    return fileChunkList
}
let hashHref = ''
if (import.meta.env.VITE_ENV === 'dev') {
    hashHref = new URL('../util/worker.js', import.meta.url).href
} else {
    hashHref = '/js/worker.js'
}
const createChunkListHash = (fileChunkList, onProcess, index) => {
    return new Promise((resolve) => {
        let worker = new Worker(hashHref)
        worker.postMessage({fileChunkList})
        worker.onmessage = ({data}) => {
            let process = parseInt(data.percentage.toFixed(0))
            if (onProcess) {
                onProcess({process, index})
            }
            if (data.hash) {
                resolve(data.hash)
            }
        }
    })
}
const checkFile = async ({axios, fileName}) => {
    return await retry(new Promise(async (resolve, reject) => {
        let res = await axios.post('/sign/bigfile/check', {
            fileName
        })
        if (res.data.code === 0) {
            resolve(res.data.data) //{uploaded:true,uploadedChunks:[]}
        } else {
            reject(new Error(`检测失败:${res.data.msg}`))
        }
    }))
}
const request = async ({
                           url,
                           method = 'post',
                           formData,
                           headers = {},
                           timeout = 1000 * 60,
                           onProgress = (e) => e,
                       }) => {
    return await retry(new Promise((resolve, reject) => {
        try {
            const xhr = new XMLHttpRequest()
            xhr.timeout = timeout
            xhr.upload.onprogress = onProgress
            xhr.open(method, url)
            Object.keys(headers).forEach((key) =>
                xhr.setRequestHeader(key, headers[key])
            )
            xhr.ontimeout = (e) => {
                reject(new Error('请求超时'))
            }
            xhr.send(formData)
            // XMLHttpRequest请求成功完成时触发；
            xhr.onload = (e) => {
                // 将请求成功的 xhr 从列表中删除
                resolve({
                    data: e.target.response,
                })
            }
            // 当请求结束时触发, 无论请求成功(load)还是失败(abort 或 error)。也可以使用 onloadend 属性。
            xhr.onloadend = (e) => e
        } catch (e) {
            console.log(e)
            reject(e)
        }
    }))
}
let defaultApi = import.meta.env.VITE_API_HOST
export default {
    upload: ({axios, files, md5Process = (p) => p, uploadProcess = (d) => d, successProcess = (s) => s}) => {
        return new Promise(async (resolve, reject) => {
            try {
                let uploadFiles = []
                if (files.length === 0) {
                    reject(new Error('文件不能为空'))
                    return
                }
                for (let uploadFileIndex = 0; uploadFileIndex < files.length; uploadFileIndex++) {
                    let uploadFile = files[uploadFileIndex]
                    console.log(`正在上传:${uploadFile.name}`)
                    const fileChunkList = createFileChunk(uploadFile)
                    let fileHash = await createChunkListHash(fileChunkList, md5Process, uploadFileIndex)
                    let fileName = `${fileHash}.${uploadFile.name.split('.').pop()}`
                    const checkData = await checkFile({axios, fileName})//检测文件是否已经上传过
                    if (checkData.uploaded) {
                        console.log('服务器已有上传文件，秒传成功', checkData)
                        uploadFiles.push({
                            index: uploadFileIndex,
                            fileName
                        })
                        if (successProcess) {
                            successProcess({
                                index: uploadFileIndex,
                                fileName
                            })
                        }
                    } else {
                        let needUploadFiles = fileChunkList.map((file, index) => ({
                            fileHash,
                            fileName,
                            index,
                            file,
                            size: file.size,
                            percentage: checkData.uploadedFiles.includes(`${index}`) ? 100 : 0,
                        }))
                        //过滤已经上传的切片
                        const requestList = needUploadFiles
                            .filter(({percentage}) => percentage === 0)
                            .map(({file, fileName, index}) => {
                                const formData = new FormData()
                                // 切片文件
                                formData.append('file', file)
                                // 切片文件hash
                                formData.append('index', `${index}`)
                                // 大文件的文件名
                                formData.append('fileName', fileName)
                                // 大文件hash
                                formData.append('fileHash', `${fileHash}`)
                                return {formData, index}
                            })

                        console.log('文件上传中...');
                        //最大并发6个请求
                        for (let i = 0; i < requestList.length; i += 6) {
                            const requests = requestList.slice(i, i + 6)
                                .map(({formData, index}) => {
                                    return request({
                                        url: `${defaultApi}/sign/bigfile/upload`,
                                        formData,
                                        onProgress: (e) => {
                                            if (uploadProcess) {
                                                //单个分片上传进度
                                                needUploadFiles[index].percentage = parseInt(String((e.loaded / e.total) * 100))

                                                //总体上传进度
                                                let fileSize = uploadFile.size
                                                const uploadSize = needUploadFiles
                                                    .map((item) => {
                                                        return item.size * item.percentage
                                                    })
                                                    .reduce((acc, cur) => {
                                                        return acc + cur
                                                    })
                                                let uploadFileProcess = parseInt((uploadSize / fileSize).toFixed(2))
                                                uploadProcess({
                                                    index: uploadFileIndex,
                                                    process: uploadFileProcess
                                                })
                                            }
                                        }
                                    })
                                })
                            await Promise.all(requests)
                        }
                        if (checkData.uploadedFiles.length + requestList.length === needUploadFiles.length) {
                            console.log('文件合并中...', fileName)
                            let mergeRes = await retry(axios.post('/sign/bigfile/merge', {
                                fileName,
                                size: FILE_BATCH_SIZE
                            }))
                            if (mergeRes.data.code !== 0) {
                                reject(new Error(`合并失败:${mergeRes.data.msg}`))
                            } else {
                                uploadFiles.push({
                                    index: uploadFileIndex,
                                    fileName
                                })
                                if (successProcess) {
                                    successProcess({
                                        index: uploadFileIndex,
                                        fileName
                                    })
                                }
                            }
                        } else {
                            reject(new Error(`上传分片不相同，请检查`))
                        }
                    }
                }
                resolve(uploadFiles)
            } catch (e) {
                reject(e)
            }
        })
    }
}