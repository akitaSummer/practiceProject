const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser') // 将文件源码转化为抽象语法树
const traverse = require('@babel/traverse').default // 默认是es6导出
const babel = require('@babel/core') // 转换代码

const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8')
    const ast = parser.parse(content, {
        sourceType: 'module' // es6引用时配置
    })
    const dependencies = {}
    traverse(ast, { // 接收抽象语法树并解析
        ImportDeclaration({ node }) { // 当节点为ImportDeclaration时
            const dirname = path.dirname(filename)
            const newFile = './' + path.join(dirname, node.source.value) // 处理文件路径
            dependencies[node.source.value] = newFile // 将import结点储存于对象中
        }
    })
    const { code } = babel.transformFromAst(ast, null, { // transformFromAst方法可将抽象语法树转化为代码
        presets: ['@babel/preset-env'] // es6 转 es5
    })
    return {
        filename,
        dependencies,
        code
    }
    // console.log(ast.program.body)
}

const makeDependenciesGraph = (entry) => { // 依赖图谱
    const entryModule = moduleAnalyser(entry) // 得到入口文件的详情
    const graphArray = [entryModule]
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i]
        const { dependencies } = item // 得到文件的依赖
        if (dependencies) {
            for (let j in dependencies) {
                graphArray.push(moduleAnalyser(dependencies[j])) // 将依赖分析后添加进graphArray里
            }
        }
    }
    const graph = {}
    graphArray.forEach(item => { // 转换数据结构
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })
    return graph
}

const generateCode = (entry) => {
    const graph = JSON.stringify(makeDependenciesGraph(entry)) // 放置模板字符串会将对象转化为[Object Object]
    return `
    ;(function(graph) { // 使用闭包，防止污染全局
        function require(module) { // 自己构造require函数
            function localRequire(relativePath) { // 将相对路径转换成真实路径后调用
                return require(graph[module].dependencies[relativePath])
            }
            var exports = {} // 内部需要exports对象
            ;(function (require, exports, code) {// 使用闭包，防止污染全局
                eval(code) // graph[module].code 中有require函数，会递归调用，不断引入
            })(localRequire, exports, graph[module].code)
            return exports
        }
        require('${entry}')
    })(
        ${graph}
    )
    `
}

const code = generateCode('./src/index.js')
console.log(code)