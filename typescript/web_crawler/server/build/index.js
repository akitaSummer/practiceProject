"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
// import router from './router'
var index_1 = __importDefault(require("./router/index"));
require("./controller/LoginController");
require("./controller/CrowllerController");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['dell'],
    maxAge: 24 * 60 * 60 * 1000,
}));
// 问题2: 当我使用中间件时，对req/res做了修改之后，类型并不能改变
app.use(function (req, res, next) {
    req.teacherName = 'dell';
    next();
});
app.use(index_1.default);
app.listen(7000, function () {
    console.log('server is running, url is http://localhost:7000');
});
