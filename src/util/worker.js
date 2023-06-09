//来自字节跳动cdn库 http://cdn.bytedance.com
self.importScripts('https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/spark-md5/3.0.2/spark-md5.min.js')

/**
 * 正因为每个文件的md5是一样的，那么，我们在做文件上传的时候，
 * 就只要在前端先获取要上传的文件md5值，
 * 并把文件md5传到服务器进行校验，对比之前文件的md5，如果存在相同的md5，
 * 我们只要把文件的名字传到服务器关联之前的文件即可，并不需要再次去上传相同的文件。
 * @Author   Author
 * @DateTime 2021-12-31T15:23:48+0800
 * @param    {[type]}                 e [description]
 * @return   {[type]}                   [description]
 */
self.onmessage = e => {
    const {fileChunkList} = e.data
    const spark = new self.SparkMD5.ArrayBuffer()
    let percentage = 0
    let count = 0
    const loadNext = index => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(fileChunkList[index])
        reader.onload = e => {
            count++
            spark.append(e.target.result)
            if (count === fileChunkList.length) {
                self.postMessage({
                    percentage: 100,
                    hash: spark.end()
                })
                self.close()
            } else {
                percentage += 100 / fileChunkList.length
                self.postMessage({
                    percentage
                })
                loadNext(count)
            }
        }
    }
    loadNext(count)
}