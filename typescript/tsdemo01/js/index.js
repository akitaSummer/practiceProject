"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('hello');
var str = 'hello';
function getData() { }
// vscode自动编译
// 第一步: cmd --> tsc --init 生成tsconfig.json文件, 将文件中的"outer": "./js"生效
// 第二部: Terminal 下的 Run Task 选择 tsc.watch
// typescript中的数据类型
// boolean
// string
// number
// array
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
// symbol
// null
// undefined
// let num: number
// console.log(num) // 报错
var num;
console.log(num);
// 元组类型 tuple
var arr3 = ['1', 2];
// 枚举类型 enum 只能用string和number且且定义一个类型后，剩余类型均为相同类型
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 0] = "success";
    Flag[Flag["err"] = 3] = "err";
})(Flag || (Flag = {}));
var enum1 = Flag.err;
// 任意类型 any 
var any = 1234;
any = 'str';
var oBox = document.getElementById('box');
oBox.style.color = 'red';
// void
function run() {
    console.log('run');
}
// never
var a;
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 函数
// 1. 函数的定义
function run1() {
    return '123';
}
var fun2 = function () {
    return 123;
};
function getInfo1(name, age) {
    return name + age;
}
// 2. 可选参数
// es5中形参和实参可以不一样，在ts中必须一样，否则需要配置可选参数
function getInfo2(name, age) {
    if (age) {
        return name + age;
    }
    else {
        return name;
    }
}
getInfo2('tom'); // age没有?会报错
// 注意：可选参数必须配置到参数的最后
// 3. 默认参数
function getInfo3(name, age) {
    if (age === void 0) { age = 20; }
    return name + age;
}
// 4. 剩余参数
function sum(a) {
    var result = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        result[_i - 1] = arguments[_i];
    }
    result.push(a);
    return result.reduce(function (pre, i) {
        return pre + i;
    }, 0);
}
function getInfo4(str) {
    if (typeof str === 'string') {
        return str;
    }
    else {
        return str;
    }
}
console.log(getInfo4('tom'));
console.log(getInfo4(24));
function getInfo5(name, age) {
    if (age) {
        return name + age;
    }
    else {
        return name;
    }
}
// 6. 箭头函数
// 1. 类的创建
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.run = function () {
        console.log(this.name);
    };
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    return Person;
}());
// 2. 类的继承
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name) {
        return _super.call(this, name) || this;
    }
    Student.prototype.work = function () {
        console.log('work');
    };
    return Student;
}(Person));
// 3. 修饰符
// public 公有: 类，子类和外部都可以访问，不加修饰符为公有
// private 私有：类可以访问，子类和外部不可以访问
// protected 保护: 类和子类都可以访问，外部不可以访问
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher(name, sex) {
        var _this = _super.call(this, name) || this;
        _this.age = 25;
        _this.sex = sex;
        return _this;
    }
    Teacher.prototype.work = function () {
        console.log('work');
    };
    return Teacher;
}(Person));
var Person1 = /** @class */ (function () {
    function Person1() {
    }
    Person1.print = function () {
        console.log(Person1.sex);
    };
    Person1.sex = 'man';
    return Person1;
}());
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.eat = function () {
        console.log('wang');
    };
    return Dog;
}());
// abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包括具体实现并且不许在派生类中实现
var Animal1 = /** @class */ (function () {
    function Animal1() {
    }
    return Animal1;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 抽象类的子类必须实现抽象方法
        _this.eat = function () {
            console.log('miao');
        };
        return _this;
    }
    return Cat;
}(Animal1));
function printName(name) {
    console.log(name.firstName + name.secondName);
}
// printName({
//     age: 20, // 报错
//     firstName: '张',
//     sencondName: '三'
// })
var obj = {
    age: 20,
    firstName: '张',
    secondName: '三'
};
printName(obj);
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {
            console.log('success');
            if (config.dataType === 'json') {
                JSON.parse(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
}
var md5 = function (key, value) {
    return key + value;
};
var arr = ['aaa', 'bbb'];
var obj4 = { name: '20' };
var Dog1 = /** @class */ (function () {
    function Dog1(name) {
        this.name = name;
    }
    Dog1.prototype.eat = function () {
        console.log('eat');
    };
    return Dog1;
}());
var Web1 = /** @class */ (function () {
    function Web1(name) {
        this.name = name;
    }
    Web1.prototype.eat = function () {
        console.log('eat');
    };
    Web1.prototype.work = function () {
        console.log('code');
    };
    return Web1;
}());
// 泛型：解决类，方法，接口的复用性，以及对不特定数据类型的支持
function getData2(value) {
    return value;
}
getData2(1234);
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = [];
    }
    MinClass.prototype.add = function (number) {
        this.list.push(number);
    };
    return MinClass;
}());
var m1 = new MinClass();
var getDate3 = function (value1, value2) {
    return value1 + value2;
};
var MysqlDB = /** @class */ (function () {
    function MysqlDB() {
    }
    MysqlDB.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MysqlDB.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDB.prototype.delate = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MysqlDB;
}());
var MsSqlDB = /** @class */ (function () {
    function MsSqlDB() {
    }
    MsSqlDB.prototype.add = function (info) {
        throw new Error("Method not implemented.");
    };
    MsSqlDB.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MsSqlDB.prototype.delate = function (id) {
        throw new Error("Method not implemented.");
    };
    MsSqlDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MsSqlDB;
}());
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var u = new User();
u.username = '张三';
u.password = '1234';
var oMysql = new MysqlDB();
oMysql.add(u);
var db_1 = __importDefault(require("./modules/db"));
db_1.default();
var A;
(function (A) {
    A.dog = 'wang';
})(A || (A = {}));
console.log(A.dog);
// 装饰器：一种特殊类型的声明，能附加到类声明，方法，属性或参数上，可以使修改类的行为
// 1. 类装饰器
// 普通装饰器
function logClass(params) {
    console.log(params);
    // params 当前类
    params.prototype.apiUrl = 'xxx';
    params.prototype.run = function () { };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient = __decorate([
        logClass
    ], HttpClient);
    return HttpClient;
}());
// 装饰器工厂（可传参）
function logClass2(params) {
    return function (target) {
        console.log(target);
    };
}
var HttpClient2 = /** @class */ (function () {
    function HttpClient2() {
    }
    HttpClient2 = __decorate([
        logClass2('hello')
    ], HttpClient2);
    return HttpClient2;
}());
// 重构构造函数
function logClass3(target) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.apiUrl = 'hello';
            return _this;
        }
        return class_1;
    }(target));
}
var HttpClient3 = /** @class */ (function () {
    function HttpClient3() {
    }
    HttpClient3 = __decorate([
        logClass3
    ], HttpClient3);
    return HttpClient3;
}());
// 2. 属性装饰器
function logClass4(params) {
    return function (target, attr) {
        // target: 对象
        // attr: 属性名称
        target[attr] = params;
    };
}
var HttpClient4 = /** @class */ (function () {
    function HttpClient4() {
    }
    __decorate([
        logClass4('hello')
    ], HttpClient4.prototype, "url", void 0);
    return HttpClient4;
}());
// 3. 方法装饰器
function logMethod(params) {
    return function (target, methodName, desc) {
        // target: 类的构造函数
        // methodName: 成员的名字
        // desc：成员属性描述
        target.run = function () { };
        // 修改装饰器的方法
        // 1. 保存当前方法
        var oMethod = desc.value;
        desc.value = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            arg = arg.map(function (value) {
                return String(value);
            });
            oMethod.apply(this, arg);
        };
    };
}
var HttpClient5 = /** @class */ (function () {
    function HttpClient5() {
    }
    HttpClient5.prototype.getData = function () { };
    __decorate([
        logMethod('hello')
    ], HttpClient5.prototype, "getData", null);
    return HttpClient5;
}());
// 4. 方法参数装饰器
// 参数装饰器表达式会在运行时当做函数被调用，可以使用参数装饰器为类的原型添加一些元素数据
function logParams(params) {
    return function (target, methodName, paramsIndex) {
        // target: 当前原型对象
        // methodName: 函数名称
        // paramsIndex: 参数下标
    };
}
var HttpClient6 = /** @class */ (function () {
    function HttpClient6() {
    }
    HttpClient6.prototype.getData = function (uuid) { };
    __decorate([
        __param(0, logParams('uuid'))
    ], HttpClient6.prototype, "getData", null);
    return HttpClient6;
}());
// 执行顺序：属性装饰器，方法装饰器，方法参数装饰器，类装饰器
