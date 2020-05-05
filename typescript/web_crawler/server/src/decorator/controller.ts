import { RequestHandler } from 'express'
import router from "../router/index";
import 'reflect-metadata'

enum Methods {
  get= 'get',
  post = 'post'
}

export function controller(root: string) {
  return function (target: new (...args: any []) => {}) {
    for (let key in target.prototype) {
      // console.log(Reflect.getMetadata('path', target.prototype, key))
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata('method', target.prototype, key)
      const handler = target.prototype[key]
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key)
      if (path && method && handler) {
        const fullPath = root === '/' ? path : `${root}${path}`
        middlewares ? router[method](fullPath, middlewares, handler) : router[method](fullPath, handler)
      }
    }
  }
}
