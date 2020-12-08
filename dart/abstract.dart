/**
 * 抽象类用于定义标准，子类可以继承，也可以实现抽象类接口
 * 
 * 通过abstract定义
 * 没有方法体的方法称为抽象方法
 * 子类继承则必须实现抽象方法
 * 作为接口实现的话必须实现抽象类中定义的属性及方法
 * 抽象类不能被实例化，只有他的子类可以
 * 
 * extends和implements区别
 * 如果要复用抽象类里的方法，并且要用抽象方法约束子类的话使用extends
 * 如果只是把抽象类当做标准，使用implements 
 */

abstract class Animal {
  void eat(); // 抽象方法
  void printInfo() {
    print('Animal printInfo');
  }
}

class Dog extends Animal {
  @override
  void eat() {
    print('dog eating...');
  }
}

class Cat extends Animal {
  @override
  void eat() {
    // 多态
    print('cat eating...');
  }

  void run() {
    print('cat running...');
  }
}

void main() {
  Dog d = new Dog();
  d.eat();
  d.printInfo();

  Cat c = new Cat();
  c.eat();
  c.printInfo();

  Animal c2 = new Cat();
  c2.eat();
  // c2.run(); // 错误，因为是Animal类，不存在run
}
