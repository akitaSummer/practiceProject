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
