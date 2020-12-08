/**
 * mixins(混入)
 * 
 * Dart中没有多继承，mixins可以实现类似多继承的效果
 * 
 * 作为mixins的类只能继承自Object，不能继承其他类
 * 
 * 作为mixins的类不能有构造函数
 * 
 * 一个类可以mixins多个mixins类
 * 
 * mixins不是继承，也不是接口，而是一种全新的特性
 */

class A {
  void printA() {
    print('A');
  }

  void run() {
    print('A running...');
  }
}

class B {
  void printB() {
    print('B');
  }

  void run() {
    // 如果有相同的方法，则后面的mixins会覆盖前面的，包括继承
    print('B running...');
  }
}

class C with A, B {}

void main() {
  C c = new C();
  c.printA();
  c.printB();
  c.run();
  print(c is A); // true
  print(c is B); // true
}
