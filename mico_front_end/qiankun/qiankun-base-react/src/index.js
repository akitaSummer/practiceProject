import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  registerMicroApps, // 注册子应用
  runAfterFirstMounted, // 第一个子应用装载完毕
  setDefaultMountApp, // 设置默认装载子应用
  start // 启动
} from "qiankun";

const apps = [{
    name: 'vueApp',
    entry: '//localhost:10001', // 默认会加载这个html 解析内部js 动态执行 (但是需要子应用支持fetch)
    container: '#vue',
    activeRule: '/vue'
}, {
    name: 'reactApp',
    entry: '//localhost:10002',
    container: '#react',
    activeRule: '/react'
}]

const lifeCycles = {
    beforeLoad: [ 
        app => {
            console.log("before load", app);
        }
    ], // 挂载前回调
    beforeMount: [
        app => {
            console.log("before mount", app);
        }
    ], // 挂载后回调
    afterUnmount: [
        app => {
            console.log("after unload", app);
        }
    ] // 卸载后回调
}

registerMicroApps(apps, lifeCycles)

 // 设置默认子应用,参数与注册子应用时genActiveRule("/vue")函数内的参数一致
 setDefaultMountApp("/vue");
    
 // 第一个子应用加载完毕回调
 runAfterFirstMounted(()=>{});

start({
    prefetch: false, // 取消预加载
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
