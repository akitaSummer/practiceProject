"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../decorator/index");
var util_1 = require("../utils/util");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController_1 = LoginController;
    LoginController.isLogin = function (req) {
        return !!(req.session ? req.session.login : false);
    };
    LoginController.prototype.isLogin = function (req, res) {
        var isLogin = LoginController_1.isLogin(req);
        var result = util_1.getResponseData(isLogin);
        res.json(result);
    };
    LoginController.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        var result = util_1.getResponseData(true);
        res.json(result);
    };
    LoginController.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = LoginController_1.isLogin(req);
        if (isLogin) {
            res.json(util_1.getResponseData(true, '已经登陆过'));
        }
        else {
            if (password === '1234' && req.session) {
                req.session.login = true;
                var result = util_1.getResponseData(true);
                res.json(result);
            }
            else {
                var result = util_1.getResponseData(false, '登录失败');
                res.json(result);
            }
        }
    };
    var LoginController_1;
    __decorate([
        index_1.get('/isLogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "isLogin", null);
    __decorate([
        index_1.get('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    __decorate([
        index_1.post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    LoginController = LoginController_1 = __decorate([
        index_1.controller('/api')
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
