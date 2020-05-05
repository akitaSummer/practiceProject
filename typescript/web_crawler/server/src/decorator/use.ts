import { RequestHandler } from "express";
import 'reflect-metadata'

export function use(middleware: RequestHandler) {
  return function(target: any, key: string) {
    const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target, key)
    middlewares ? Reflect.defineMetadata('middlewares', [...middlewares, middleware], target, key) : Reflect.defineMetadata('middlewares', [middleware], target, key)
  }
}
