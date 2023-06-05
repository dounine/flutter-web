import gulp from 'gulp'
import fs from 'fs'
import path from 'path'
// import del from 'del'
import replace from 'gulp-replace'
import {fetch, refresh, upload} from 'qiniu-tool-v2'

const jsonText = fs.readFileSync('./.qiniu.json', 'utf8')
const qiniuData = JSON.parse(jsonText)

const key = qiniuData.key
const token = qiniuData.token
const config = {
    ak: key,
    sk: token,
    scope: 'ipadump-sign',
    zone: 'qiniu.zone.Zone_z2', // 七牛空间（默认Zone_z1）
}

// 文件读取方法
const readFileList = (dir, filesList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        let fullPath = path.join(dir, item);
        let name = item;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList); //递归读取文件
        } else {
            filesList.push({dir, fullPath, name});
        }
    });
    return filesList;
}

// 清空build文件夹
// gulp.task('clean', cb => { del.sync(['dist/*'], {dot: true});
//     cb();
// });

async function ossUpload(p) {
    let uploadPath = p.substring(5).replaceAll('\\', '/')
    let accessPath = 'https://sign.ipadump.com/' + uploadPath
    await upload(config, p, uploadPath)
    console.log('upload success ', p, accessPath)
    await refresh(config, [accessPath])
    console.log('refresh success ', accessPath)
}

// 替换SDK内的变量
gulp.task('replacePath', async () => {
    return gulp.src('./dist/index.html')
        .pipe(replace("/assets", `/assets`))
        // .pipe(replace("favicon.ico", `${pathPre}/favicon.ico`))
        .pipe(gulp.dest('./dist', {overwrite: true}))
})

// 上传资源文件
gulp.task('uploadResource', async cb => {
    let filesList = [];
    readFileList('./dist', filesList);
    await Promise.all(filesList.map(info => {
        return ossUpload(info.fullPath);
    }));
    return await refresh(config, [`https://sign.ipadump.com`])
});
gulp.task('uploadStaticResource', async cb => {
    let filesList = [];
    readFileList('./src/assets/static/', filesList);
    return Promise.all(filesList.map(async info => {
        await upload(config, info.fullPath, `static/${info.fullPath.replaceAll('\\', '/').substring("src/assets/static/".length)}`)
    }));
})
// 上传
gulp.task('upload', gulp.series(['replacePath', 'uploadStaticResource', 'uploadResource']));

