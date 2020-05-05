"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../router/index"));
require("reflect-metadata");
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            // console.log(Reflect.getMetadata('path', target.prototype, key))
            var path = Reflect.getMetadata('path', target.prototype, key);
            var method = Reflect.getMetadata('method', target.prototype, key);
            var handler = target.prototype[key];
            var middlewares = Reflect.getMetadata('middlewares', target.prototype, key);
            if (path && method && handler) {
                var fullPath = root === '/' ? path : "" + root + path;
                middlewares ? index_1.default[method](fullPath, middlewares, handler) : index_1.default[method](fullPath, handler);
            }
        }
    };
}
exports.controller = controller;
