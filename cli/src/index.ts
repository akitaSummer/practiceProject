#!/usr/bin/env node

// node开发命令行工具执行的JavaScript脚本必须在顶部加入 #!/usr/bin/env node 声明

// 可用process.argv获取用户输入命令
// 项目开发使用commander
import program from 'commander'
// inquirer获取用户输入的值
import inquirer from "inquirer"
// 使用handlebars解析模板字符串
import handlebars from 'handlebars'
// 使用ora美化下载加载loading
import ora from 'ora'
// 使用chalk为打印的信息加上样式
import chalk from 'chalk'
// log-symbols：日志符号
import logSymbols from 'log-symbols'
import fs from 'fs'
import JSONFormat from './utils/JSONFormat'
// 使用download-git-repo模板下载
const download = require('download-git-repo')

type initType = 'react' | 'vue'

const templates = {
    'react' : {
        url: 'https://github.com:akitaSummer/akita_summer_component_library#master',
        description: '',
        color: chalk.blue
    },
    'vue' : {
        url: 'https://github.com:akitaSummer/card-app#master',
        description: '',
        color: chalk.green
    }
}

program.version('0.1.0', '-v, --version')

// 下载命令
program.command('init <type> <name> [ts]') // command 设置命令，使用<>的参数为必须，使用[]的参数为非必须
.action((type: initType, name: string, ts: string | undefined) => {
    if (type === 'react' || 'vue') {
        const { url } = templates[type]
        const spinner = ora('download...')
        spinner.start()
        download(url, name, { clone: true }, async (err: any) => {
            if (err) {
                console.log(err)
                spinner.fail()
                console.log(logSymbols.error,chalk.red('download error'))
                return 
            }
            spinner.succeed()
            // 询问细节
            const answers = await inquirer.prompt([{
                type: 'input',
                name: 'author',
                message: 'Please enter author'
            }])
            const packagePath = `${name}/package.json`
            // 获取package.json内容
            const packageContent = fs.readFileSync(packagePath, 'utf-8')
            let packageResult = handlebars.compile(packageContent)(answers)
            if (answers.author) {
                const packageResultObj : { [PropsName: string] : { [PropsName: string] : string } } = JSON.parse(handlebars.compile(packageContent)(answers))
                packageResultObj.dependencies.typescript = '4.0.0'
                packageResult = JSONFormat(JSON.stringify(packageResultObj))
            }
            fs.writeFileSync(packagePath, packageResult)
            console.log(logSymbols.success, templates[type].color('enjoy your app'))
        })
    } else {
        console.log('The frameworks are only Vue and react')
    }
}).on('--help', () => {
    console.log('use "cli init <type> <name>" to creata a app, <type> only Vue and react, <name> is your app name.')
})

program.parse(process.argv)