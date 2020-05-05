import { RequestHandler } from 'express'
import 'reflect-metadata'
import router from "./router";

enum Methods {
  get= 'get',
  post = 'post'
}

export function controller(target: any) {
  for (let key in target.prototype) {
    // console.log(Reflect.getMetadata('path', target.prototype, key))
    const path = Reflect.getMetadata('path', target.prototype, key)
    const method: Methods = Reflect.getMetadata('method', target.prototype, key)
    const handler = target.prototype[key]
    const middleware = Reflect.getMetadata('middleware', target.prototype, key)
    if (path && method && handler) {
      middleware ? router[method](path, middleware, handler) : router[method](path, handler)
    }
  }
}

export function use(middleware: RequestHandler) {
  return function(target: any, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}

function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function(target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)
