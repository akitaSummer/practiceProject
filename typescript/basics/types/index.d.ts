// 在配置文件tsconfig.json中修改paths和baseUrl
// {
//     "compilerOptions": {
//         "module": "commonjs",
//         "baseUrl": "./",
//         "paths": {
//             "*": ["types/*"]
//         }
//     }
// }
// 之后通过import导入时候会去types文件夹下寻找相应的声明模块

export const name: string
export function getName(): string
export class Animal {
    constructor(name: string)
    sayHi(): string
}

// import { name, getName, Animal } from 'xxx'

// 只有function、class和interface可以直接默认导出
// export default function foo(): string
// 错误
// export default enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }

declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

export default Directions

// commonjs规范
// module.exports = foo
// exports.bar = bar

// ts中导入
// import foo = require('foo')
// import bar = foo.bar

// ts声明文件
// declare function foo(): string
// export = foo