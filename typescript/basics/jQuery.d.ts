// 声明文件
// 必须以.d.ts结尾

// eclare var 声明全局变量
// declare function 声明全局方法
// declare class 声明全局类
// declare enum 声明全局枚举类型
// declare namespace 声明（含有子属性的）全局对象
// interface 和 type 声明全局类型
// export 导出变量
// export namespace 导出（含有子属性的）对象
// export default ES6 默认导出
// export = commonjs 导出模块
// export as namespace UMD 库声明全局变量
// declare global 扩展全局变量
// declare module 扩展模块
// /// <reference /> 三斜线指令

declare const jQuery: (selecter: string) => any

// npm install @types/jquery --save-dev

declare function jQueryFunc(callBack: () => any): any
declare function jQueryFunc(selector: string): any

declare class Animal {
    name: string
    constructor(name: string) 
    // declare class 只能用来定义类型
    // 错误
    // sayHi(): string {
    //     return 'hi'
    // }
}

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

// 可以使用jQuery2.ajax
declare namespace jQuery2 {
    function ajax(url: string, setting?: any): void
}

// 可以使用jQuery3.extend
declare namespace jQuery3 {
    function ajax(url: string, setting?: any): void
    namespace fn {
        function extend(object: any): void
    }
}

// 如果只有一个fn属性，没有ajax和其他方法，可以不用嵌套
declare namespace jQuery4.fn {
    function extend(object: any): void
}

interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any
}

declare namespace jQuery5 {
    interface AjaxSetting {
        method?: 'GET' | 'POST'
        data?: any
    }
}

let settings: jQuery5.AjaxSetting = {
    method: 'POST',
    data: {
        name: 'food'
    }
}