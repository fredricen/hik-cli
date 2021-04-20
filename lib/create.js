const { promisify } = require('util')//用于将回调方法转换为promise方法，可以进行链式处理，解决回调地狱
const figlet = promisify(require('figlet'))//用于显示炫酷的文字效果
const clear = require('clear')//用于清屏
const chalk = require('chalk')//用于给文字增加颜色
const { clone } = require('./download')
const open = require('open')
//封装一个自己的spawn函数，在原生nodejs子进程spawn函数基础上进行封装
const spawn = async (...args) => {
    const { spawn } = require('child_process')
    const options = args[args.length - 1]
    if(process.platform === 'win32'){
        // 设置 shell 选项为 true 以隐式地调用 cmd 
        options.shell = true
    }else {
        // nothing
    }

    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)//子进程对接主进程
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        },error=>{
            console.log(error)
        })
    })
}
const log = content => console.log(chalk.green(content))
module.exports = async name => {
    // 打印欢迎画面
    clear()
    const data = await figlet('CETHIK CLI')
    log(data)
    // 创建项目
    log(`🚀创建项目:` + name)
    // 克隆代码
    try {
        //await clone('direct:https://github.com/fredricen/admin-front-template.git#main', name)
        await clone('direct:https://git.d.com/super-nurse/front-admin-template.git#master', name)
    } catch (error) {
        console.log(error)
    }
    log('🔨安装依赖')
    const ora = require('ora')//显示进度条
    const process = ora(`下载.....${repo}`)//进度条显示提示
    process.start()//开启进度条
    await spawn('npm', ['install'], { cwd: `./${name}` })
    process.succeed()//结束进度条
    log(`
👌安装完成：
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
            `)
    //自动启动项目
    open('http://localhost:8080')
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
    
}