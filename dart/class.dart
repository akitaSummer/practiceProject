/**
 * OOP三个基本特征
 *  封装： 把客观事物封装成类，并把属性和方法暴露
 *  继承： 实现父类功能，并有自己的功能
 *  多态： 允许子类类型指针赋值给父类类型的指针，同一个函数调用会有不同的执行效果
 * 
 * Dart所有的东西都是对象，所有的对象都继承Object类
 */

class Person {
  String name;

  // 使用_开头设定为私有属性，但是必须在单独文件中才有用
  int _age = 23;

  String sex;

  // 静态方法不能访问非静态成员，非静态方法可以访问静态成员
  static String info = 'info';

  static void show() {
    print('Person');
  }

  // Person(this.name);
  // 实例化列表，调用构造函数前实例化变量
  Person(String name) : sex = 'male' {
    this.name = name;
  }

  Person.setAge(int age) : sex = 'male' {
    this._age = age;
  }

  Person.setInfo(this.name, this._age) : sex = 'male';

  void getInfo() {
    print('${this.name} --- ${this._age}');
  }

  void setInfo(age) {
    this._age = age;
  }

  // 私有方法
  void _run() {
    print('run....');
  }

  void execRun() {
    this._run();
  }

  String get getName {
    return this.name;
  }

  void set setAge(age) {
    this._age = age;
  }
}

void main() {
  Person p1 = new Person('name');
  print(p1.name);
  p1.getInfo();
  Person p2 = new Person.setInfo('p2', 25);
  p2.getInfo();
}
