"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function use(middleware) {
    return function (target, key) {
        var middlewares = Reflect.getMetadata('middlewares', target, key);
        middlewares ? Reflect.defineMetadata('middlewares', __spreadArrays(middlewares, [middleware]), target, key) : Reflect.defineMetadata('middlewares', [middleware], target, key);
    };
}
exports.use = use;
