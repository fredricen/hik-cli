const {promisify} = require('util')
module.exports.clone = async (repo,destination) => {
    const download = promisify(require('download-git-repo'))
    const ora = require('ora')//显示进度条
    const process = ora(`下载.....${repo}`)//进度条显示提示
    process.start()//开启进度条
    try {
        await download(repo, destination, {clone:true})
    } catch (error) {
        console.log(error)
    }
    process.succeed()//结束进度条
}