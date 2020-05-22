// import '@babel/polyfill' // 引入babel/polyfill，用于兼容低版本浏览器
import { fun, fun2 } from './content';
import data from '../json/data.json';
import { add } from './math' // Tree shaking, 只支持ES Module，即静态引用
import _ from 'lodash'

import '../css/test.css';
import '../css/index.scss'

document.write("entry.js is work");
document.write('<br />' + fun(3))
document.write('<br />' + fun2(3))
document.write('<br />' + JSON.stringify(data));
add(1, 2)
// 此处省略10W行代码
// 单独打包文件会很大，加载时间会很长
// 单独重新打包，时间长
// 将代码分割，只更新业务代码，Code Splitting
console.log(_.join(['a', 'b', 'c'], '***'))

if (module.hot) {
  module.hot.accept('./content', () => {
    // ./content.js 文件改变后，进行一些事情，例如更新 HMR热更新引入后才有用
  })
}

// import React , { Component } from 'react'
// import ReactDom from 'react-dom'
//
// class App extends Component {
//   return () {
//     return (<div>
//         Hello World
//       </div>)
//   }
// }
//
// ReactDom.render(<App/>, document.getElementById('root'))
